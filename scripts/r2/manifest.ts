/**
 * Manifest manager
 * Handles creation, updating, and saving of migration manifests
 */

import { writeFile, mkdir } from 'fs/promises';
import { dirname } from 'path';
import { randomUUID } from 'crypto';
import { 
  MigrationManifest, 
  MigrationRecord, 
  MigrationConfig, 
  MigrationSummary,
  FileAsset 
} from './types.js';

/**
 * Initialize a new migration record
 * @param asset File asset
 * @returns Initial migration record
 */
export function initMigrationRecord(asset: FileAsset): MigrationRecord {
  return {
    id: asset.r2Key,
    asset,
    status: 'pending',
    uploadStartedAt: null,
    uploadCompletedAt: null,
    attempts: 0,
    errorMessage: null,
    etag: null,
  };
}

/**
 * Create a new migration manifest
 * @param config Migration configuration
 * @param sourcePaths Source directories
 * @param assets File assets to migrate
 * @returns New migration manifest
 */
export function createManifest(
  config: MigrationConfig,
  sourcePaths: string[],
  assets: FileAsset[]
): MigrationManifest {
  const migrationId = randomUUID();
  const records: Record<string, MigrationRecord> = {};
  
  // Initialize records for all assets
  for (const asset of assets) {
    records[asset.r2Key] = initMigrationRecord(asset);
  }
  
  const summary: MigrationSummary = {
    totalFiles: assets.length,
    successCount: 0,
    failedCount: 0,
    skippedCount: 0,
    totalBytesUploaded: 0,
    durationMs: 0,
    averageSpeedBytesPerSec: 0,
  };
  
  return {
    migrationId,
    startedAt: new Date().toISOString(),
    completedAt: null,
    targetBucket: config.bucketName,
    sourcePaths,
    summary,
    records,
    config,
  };
}

/**
 * Update manifest with upload result
 * @param manifest Migration manifest
 * @param record Migration record
 */
export function updateManifestRecord(
  manifest: MigrationManifest,
  record: MigrationRecord
): void {
  manifest.records[record.id] = record;
  
  // Update summary counts
  const summary = manifest.summary;
  summary.successCount = 0;
  summary.failedCount = 0;
  summary.skippedCount = 0;
  summary.totalBytesUploaded = 0;
  
  for (const rec of Object.values(manifest.records)) {
    if (rec.status === 'success') {
      summary.successCount++;
      summary.totalBytesUploaded += rec.asset.sizeBytes;
    } else if (rec.status === 'failed') {
      summary.failedCount++;
    } else if (rec.status === 'skipped') {
      summary.skippedCount++;
    }
  }
}

/**
 * Finalize manifest (mark as complete, calculate final summary)
 * @param manifest Migration manifest
 * @param startTime Start time in milliseconds
 */
export function finalizeManifest(manifest: MigrationManifest, startTime: number): void {
  manifest.completedAt = new Date().toISOString();
  
  const durationMs = Date.now() - startTime;
  manifest.summary.durationMs = durationMs;
  
  // Calculate average speed
  const durationSec = durationMs / 1000;
  if (durationSec > 0) {
    manifest.summary.averageSpeedBytesPerSec = 
      manifest.summary.totalBytesUploaded / durationSec;
  }
}

/**
 * Save manifest to JSON file
 * @param manifest Migration manifest
 * @param filePath Path to save manifest
 */
export async function saveManifest(
  manifest: MigrationManifest,
  filePath: string
): Promise<void> {
  try {
    // Ensure directory exists
    await mkdir(dirname(filePath), { recursive: true });
    
    // Write manifest as pretty-printed JSON
    const json = JSON.stringify(manifest, null, 2);
    await writeFile(filePath, json, 'utf-8');
    
    console.log(`\n📄 Manifest saved: ${filePath}`);
  } catch (error: any) {
    console.error(`Failed to save manifest: ${error.message}`);
    throw error;
  }
}

/**
 * Get failed records from manifest
 * @param manifest Migration manifest
 * @returns Array of failed migration records
 */
export function getFailedRecords(manifest: MigrationManifest): MigrationRecord[] {
  return Object.values(manifest.records).filter(rec => rec.status === 'failed');
}

/**
 * Get successful records from manifest
 * @param manifest Migration manifest
 * @returns Array of successful migration records
 */
export function getSuccessfulRecords(manifest: MigrationManifest): MigrationRecord[] {
  return Object.values(manifest.records).filter(rec => rec.status === 'success');
}

/**
 * Get skipped records from manifest
 * @param manifest Migration manifest
 * @returns Array of skipped migration records
 */
export function getSkippedRecords(manifest: MigrationManifest): MigrationRecord[] {
  return Object.values(manifest.records).filter(rec => rec.status === 'skipped');
}
