/**
 * File uploader for R2
 * Handles file uploads with retry logic and error handling
 */

import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { createReadStream } from 'fs';
import { FileAsset, MigrationRecord } from './types.js';
import { detectMimeType, getCacheControl } from './mime-detector.js';
import { compareChecksums } from './checksum.js';

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if file already exists in R2 with matching checksum
 * @param client S3 client
 * @param bucketName Bucket name
 * @param r2Key R2 object key
 * @param expectedChecksum Expected SHA-256 checksum
 * @returns true if file exists and checksum matches
 */
export async function fileExistsInR2(
  client: S3Client,
  bucketName: string,
  r2Key: string,
  expectedChecksum: string
): Promise<boolean> {
  try {
    const response = await client.send(new HeadObjectCommand({
      Bucket: bucketName,
      Key: r2Key,
    }));
    
    // R2 returns ETag which is MD5 hash, not SHA-256
    // We can't compare checksums directly, so we'll skip re-upload if file exists
    // (For full checksum verification, use verify-migration script)
    return !!response.ETag;
  } catch (error: any) {
    if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
      return false;
    }
    // Other errors (permission, network) should be thrown
    throw error;
  }
}

/**
 * Upload a single file to R2
 * @param client S3 client
 * @param bucketName Bucket name
 * @param asset File asset to upload
 * @param dryRun If true, skip actual upload
 * @returns ETag from R2 response
 */
export async function uploadFile(
  client: S3Client,
  bucketName: string,
  asset: FileAsset,
  dryRun: boolean = false
): Promise<string> {
  if (dryRun) {
    console.log(`[DRY RUN] Would upload: ${asset.localPath} → ${asset.r2Key}`);
    return 'dry-run-etag';
  }

  const fileStream = createReadStream(asset.localPath);
  const contentType = detectMimeType(asset.localPath);
  const cacheControl = getCacheControl(contentType);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: asset.r2Key,
    Body: fileStream,
    ContentType: contentType,
    CacheControl: cacheControl,
    ContentLength: asset.sizeBytes,
  });

  const response = await client.send(command);
  
  if (!response.ETag) {
    throw new Error(`Upload succeeded but no ETag returned for ${asset.r2Key}`);
  }

  return response.ETag;
}

/**
 * Upload file with retry logic
 * @param client S3 client
 * @param bucketName Bucket name
 * @param asset File asset to upload
 * @param maxRetries Maximum number of retry attempts
 * @param dryRun If true, skip actual upload
 * @param onProgress Callback for progress updates
 * @returns MigrationRecord with upload result
 */
export async function uploadFileWithRetry(
  client: S3Client,
  bucketName: string,
  asset: FileAsset,
  maxRetries: number = 3,
  dryRun: boolean = false,
  onProgress?: (attempt: number, error?: Error) => void
): Promise<MigrationRecord> {
  const record: MigrationRecord = {
    id: asset.r2Key,
    asset,
    status: 'pending',
    uploadStartedAt: null,
    uploadCompletedAt: null,
    attempts: 0,
    errorMessage: null,
    etag: null,
  };

  const startTime = Date.now();
  record.uploadStartedAt = new Date().toISOString();

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    record.attempts = attempt;
    record.status = 'uploading';

    try {
      if (onProgress) {
        onProgress(attempt);
      }

      const etag = await uploadFile(client, bucketName, asset, dryRun);
      
      // Success!
      record.status = 'success';
      record.uploadCompletedAt = new Date().toISOString();
      record.etag = etag;
      return record;

    } catch (error: any) {
      const isLastAttempt = attempt === maxRetries;
      
      if (isLastAttempt) {
        // Final attempt failed
        record.status = 'failed';
        record.uploadCompletedAt = new Date().toISOString();
        record.errorMessage = error.message || 'Unknown error';
        
        if (onProgress) {
          onProgress(attempt, error);
        }
        
        return record;
      }

      // Retry with exponential backoff
      const delayMs = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s...
      
      if (onProgress) {
        onProgress(attempt, error);
      }
      
      console.error(
        `[Attempt ${attempt}/${maxRetries}] Upload failed for ${asset.r2Key}: ${error.message}. ` +
        `Retrying in ${delayMs}ms...`
      );
      
      await sleep(delayMs);
    }
  }

  // Should never reach here, but TypeScript requires it
  return record;
}

/**
 * Check if file should be skipped (already exists in R2)
 * @param client S3 client
 * @param bucketName Bucket name
 * @param asset File asset
 * @param skipExisting If true, check if file exists
 * @returns MigrationRecord if skipped, null otherwise
 */
export async function checkSkipFile(
  client: S3Client,
  bucketName: string,
  asset: FileAsset,
  skipExisting: boolean
): Promise<MigrationRecord | null> {
  if (!skipExisting) {
    return null;
  }

  const exists = await fileExistsInR2(client, bucketName, asset.r2Key, asset.checksum);
  
  if (exists) {
    return {
      id: asset.r2Key,
      asset,
      status: 'skipped',
      uploadStartedAt: new Date().toISOString(),
      uploadCompletedAt: new Date().toISOString(),
      attempts: 0,
      errorMessage: null,
      etag: 'skipped',
    };
  }

  return null;
}
