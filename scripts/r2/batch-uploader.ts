/**
 * Batch upload orchestrator
 * Manages parallel file uploads with concurrency control
 */

import { S3Client } from '@aws-sdk/client-s3';
import pLimit from 'p-limit';
import { FileAsset, MigrationRecord, MigrationConfig } from './types.js';
import { uploadFileWithRetry, checkSkipFile } from './uploader.js';
import { ProgressTracker } from './progress.js';
import { MigrationLogger } from './logger.js';

/**
 * Upload multiple files in parallel with concurrency limit
 * @param client S3 client
 * @param config Migration configuration
 * @param assets File assets to upload
 * @param logger Migration logger
 * @param progressTracker Progress tracker
 * @returns Array of migration records
 */
export async function batchUpload(
  client: S3Client,
  config: MigrationConfig,
  assets: FileAsset[],
  logger: MigrationLogger,
  progressTracker: ProgressTracker
): Promise<MigrationRecord[]> {
  // Create concurrency limiter
  const limit = pLimit(config.concurrency);
  
  // Upload all files in parallel (with concurrency limit)
  const uploadPromises = assets.map((asset) =>
    limit(async () => {
      // Check if file should be skipped
      if (config.skipExisting) {
        const skippedRecord = await checkSkipFile(
          client,
          config.bucketName,
          asset,
          config.skipExisting
        );
        
        if (skippedRecord) {
          await logger.logUploadSkipped(
            asset.r2Key,
            'File already exists in R2 with matching checksum'
          );
          progressTracker.update(asset.r2Key, asset.sizeBytes);
          return skippedRecord;
        }
      }
      
      // Upload file with retry logic
      const uploadStart = Date.now();
      
      const record = await uploadFileWithRetry(
        client,
        config.bucketName,
        asset,
        config.maxRetries,
        config.dryRun,
        (attempt, error) => {
          if (error) {
            logger.logUploadFailed(asset.r2Key, attempt, error.message);
          } else {
            logger.logUploadStarted(asset.r2Key, attempt);
          }
        }
      );
      
      const uploadDuration = Date.now() - uploadStart;
      
      // Log result
      if (record.status === 'success') {
        await logger.logUploadSuccess(asset.r2Key, asset.sizeBytes, uploadDuration);
      } else if (record.status === 'failed') {
        await logger.logUploadFailed(
          asset.r2Key,
          record.attempts,
          record.errorMessage || 'Unknown error'
        );
      }
      
      // Update progress
      if (record.status === 'success' || record.status === 'failed') {
        progressTracker.update(asset.r2Key, asset.sizeBytes);
      }
      
      return record;
    })
  );
  
  // Wait for all uploads to complete
  const records = await Promise.all(uploadPromises);
  
  return records;
}

/**
 * Upload files in batches
 * @param client S3 client
 * @param config Migration configuration
 * @param assets File assets to upload
 * @param logger Migration logger
 * @param progressTracker Progress tracker
 * @param batchSize Number of files per batch
 * @returns Array of migration records
 */
export async function batchUploadWithBatching(
  client: S3Client,
  config: MigrationConfig,
  assets: FileAsset[],
  logger: MigrationLogger,
  progressTracker: ProgressTracker,
  batchSize: number = 100
): Promise<MigrationRecord[]> {
  const allRecords: MigrationRecord[] = [];
  
  // Process in batches
  for (let i = 0; i < assets.length; i += batchSize) {
    const batch = assets.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    
    console.log(`\nProcessing batch ${batchNumber} (${batch.length} files)...`);
    
    const records = await batchUpload(
      client,
      config,
      batch,
      logger,
      progressTracker
    );
    
    allRecords.push(...records);
    
    await logger.logBatchCompleted(batchNumber, batch.length);
  }
  
  return allRecords;
}
