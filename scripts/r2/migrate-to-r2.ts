#!/usr/bin/env node
/**
 * R2 Migration Script
 * Uploads images and videos from local public/ directory to Cloudflare R2 bucket
 */

import { join } from 'path';
import { existsSync } from 'fs';
import { loadEnvConfig } from '@next/env';

// Load environment variables from .env, .env.local, etc.
loadEnvConfig(process.cwd());

import { loadR2Config, validateR2Config, displayConfig } from './config.js';
import { initializeR2Client } from './r2-client.js';
import { discoverAllFiles } from './file-discovery.js';
import { batchUpload } from './batch-uploader.js';
import { ProgressTracker, formatDuration, formatBytes } from './progress.js';
import { MigrationLogger } from './logger.js';
import {
  createManifest,
  updateManifestRecord,
  finalizeManifest,
  saveManifest,
  getFailedRecords
} from './manifest.js';
import { MigrationConfig, DEFAULT_CONFIG } from './types.js';

/**
 * Parse command-line arguments
 */
function parseArgs(): {
  dryRun: boolean;
  source: string[];
  concurrency: number;
  skipExisting: boolean;
  maxRetries: number;
  format: 'human' | 'json';
  help: boolean;
  version: boolean;
} {
  const args = process.argv.slice(2);

  const config = {
    dryRun: false,
    source: ['public/imgs', 'public/videos'],
    concurrency: DEFAULT_CONFIG.concurrency || 10,
    skipExisting: DEFAULT_CONFIG.skipExisting !== false,
    maxRetries: DEFAULT_CONFIG.maxRetries || 3,
    format: 'human' as 'human' | 'json',
    help: false,
    version: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--dry-run':
        config.dryRun = true;
        break;
      case '--source':
        if (i + 1 < args.length) {
          config.source = args[++i].split(',').map(s => s.trim());
        }
        break;
      case '--concurrency':
        if (i + 1 < args.length) {
          config.concurrency = parseInt(args[++i], 10);
          if (isNaN(config.concurrency) || config.concurrency < 1 || config.concurrency > 50) {
            console.error('Error: --concurrency must be between 1 and 50');
            process.exit(2);
          }
        }
        break;
      case '--no-skip-existing':
        config.skipExisting = false;
        break;
      case '--max-retries':
        if (i + 1 < args.length) {
          config.maxRetries = parseInt(args[++i], 10);
          if (isNaN(config.maxRetries) || config.maxRetries < 0 || config.maxRetries > 10) {
            console.error('Error: --max-retries must be between 0 and 10');
            process.exit(2);
          }
        }
        break;
      case '--format':
        if (i + 1 < args.length) {
          const fmt = args[++i];
          if (fmt !== 'human' && fmt !== 'json') {
            console.error('Error: --format must be "human" or "json"');
            process.exit(2);
          }
          config.format = fmt;
        }
        break;
      case '--help':
      case '-h':
        config.help = true;
        break;
      case '--version':
      case '-v':
        config.version = true;
        break;
      default:
        console.error(`Unknown argument: ${arg}`);
        config.help = true;
    }
  }

  return config;
}

/**
 * Display help message
 */
function displayHelp(): void {
  console.log(`
R2 Migration Script - Upload images and videos to Cloudflare R2

Usage: npm run migrate:r2 [options]

Options:
  --dry-run                 Preview migration without uploading
  --source <paths>          Source directories (comma-separated)
                           Default: public/imgs,public/videos
  --concurrency <n>         Max concurrent uploads (1-50)
                           Default: 10
  --no-skip-existing       Force re-upload all files (even if they exist)
  --max-retries <n>        Max retry attempts per file (0-10)
                           Default: 3
  --format <human|json>    Output format
                           Default: human
  --help, -h              Display this help message
  --version, -v           Display version

Examples:
  npm run migrate:r2                          # Migrate both imgs and videos
  npm run migrate:r2 -- --dry-run            # Preview migration
  npm run migrate:r2 -- --source public/imgs # Migrate only images
  npm run migrate:r2 -- --concurrency 20     # Use 20 concurrent uploads
  npm run migrate:r2 -- --format json        # Output JSON

Environment Variables (required):
  R2_ACCOUNT_ID          Cloudflare R2 account ID
  R2_ACCESS_KEY_ID       R2 API access key
  R2_SECRET_ACCESS_KEY   R2 API secret key
  R2_BUCKET_NAME         R2 bucket name
  NEXT_PUBLIC_R2_CDN_URL Public CDN URL

Exit Codes:
  0  Success (all files uploaded)
  1  Partial failure (some files failed)
  2  Configuration error
  3  Fatal error
`);
}

/**
 * Display summary table
 */
function displaySummary(manifest: any, startTime: number): void {
  const { summary } = manifest;
  const duration = formatDuration(Date.now() - startTime);
  const avgSpeed = formatBytes(summary.averageSpeedBytesPerSec) + '/s';
  const totalSize = formatBytes(summary.totalBytesUploaded);

  console.log('\n╭─────────────────────────┬────────╮');
  console.log('│ Metric                  │ Value  │');
  console.log('├─────────────────────────┼────────┤');
  console.log(`│ Total files             │ ${summary.totalFiles.toString().padStart(6)} │`);
  console.log(`│ Successful uploads      │ ${summary.successCount.toString().padStart(6)} │`);
  console.log(`│ Failed uploads          │ ${summary.failedCount.toString().padStart(6)} │`);
  console.log(`│ Skipped (existing)      │ ${summary.skippedCount.toString().padStart(6)} │`);
  console.log(`│ Total size              │ ${totalSize.padStart(6)} │`);
  console.log(`│ Duration                │ ${duration.padStart(6)} │`);
  console.log(`│ Average speed           │ ${avgSpeed.padStart(6)} │`);
  console.log('╰─────────────────────────┴────────╯\n');
}

/**
 * Main migration function
 */
async function migrate(): Promise<void> {
  const cliArgs = parseArgs();

  // Handle --help
  if (cliArgs.help) {
    displayHelp();
    process.exit(0);
  }

  // Handle --version
  if (cliArgs.version) {
    console.log('v1.0.0');
    process.exit(0);
  }

  const startTime = Date.now();

  try {
    // Load R2 configuration
    console.log('🔧 Loading R2 configuration...');
    const r2Config = loadR2Config();
    validateR2Config(r2Config);

    if (cliArgs.format === 'human') {
      displayConfig(r2Config);
    }

    // Create migration configuration
    const migrationConfig: MigrationConfig = {
      accountId: r2Config.accountId,
      bucketName: r2Config.bucketName,
      publicUrl: process.env.NEXT_PUBLIC_R2_CDN_URL || '',
      concurrency: cliArgs.concurrency,
      maxRetries: cliArgs.maxRetries,
      dryRun: cliArgs.dryRun,
      skipExisting: cliArgs.skipExisting,
      createdAt: new Date().toISOString(),
    };

    if (cliArgs.dryRun) {
      console.log('⚠️  DRY RUN MODE - No files will be uploaded\n');
    }

    // Resolve source paths
    const sourcePaths = cliArgs.source.map(p => join(process.cwd(), p));

    // Check if source directories exist
    for (const sourcePath of sourcePaths) {
      if (!existsSync(sourcePath)) {
        console.error(`Error: Source directory not found: ${sourcePath}`);
        console.error('Have the images/videos been deleted? You may need to restore them from git.');
        process.exit(2);
      }
    }

    console.log(`📂 Source directories: ${sourcePaths.join(', ')}\n`);

    // Initialize R2 client
    const client = await initializeR2Client(r2Config);

    // Discover files
    console.log('🔍 Discovering files...');
    const publicDir = join(process.cwd(), 'public');
    const assets = await discoverAllFiles(sourcePaths, publicDir);

    if (assets.length === 0) {
      console.log('No files found to migrate.');
      process.exit(0);
    }

    const totalBytes = assets.reduce((sum, asset) => sum + asset.sizeBytes, 0);
    console.log(`Found ${assets.length} files (${formatBytes(totalBytes)} total)\n`);

    // Create manifest
    const manifest = createManifest(migrationConfig, sourcePaths, assets);
    const manifestPath = join(process.cwd(), 'scripts/r2/.migration-manifest.json');
    const logPath = join(process.cwd(), 'scripts/r2/.migration-log.jsonl');

    // Initialize logger and progress tracker
    const logger = new MigrationLogger(logPath, manifest.migrationId);
    await logger.logMigrationStarted(assets.length, totalBytes);

    const progressTracker = new ProgressTracker(
      assets.length,
      totalBytes,
      cliArgs.format === 'human'
    );

    // Upload files
    console.log('📤 Uploading files...\n');
    const records = await batchUpload(
      client,
      migrationConfig,
      assets,
      logger,
      progressTracker
    );

    // Update manifest with results
    for (const record of records) {
      updateManifestRecord(manifest, record);
    }

    // Finalize manifest
    finalizeManifest(manifest, startTime);
    progressTracker.complete();

    // Save manifest
    await saveManifest(manifest, manifestPath);
    await logger.logMigrationCompleted(manifest.summary);

    console.log(`📊 Log saved: ${logPath}\n`);

    // Display results
    if (cliArgs.format === 'json') {
      console.log(JSON.stringify(manifest, null, 2));
    } else {
      console.log('✅ Migration complete!\n');
      displaySummary(manifest, startTime);

      // Display failed files
      const failedRecords = getFailedRecords(manifest);
      if (failedRecords.length > 0) {
        console.log(`⚠️  ${failedRecords.length} file(s) failed to upload:\n`);
        for (const record of failedRecords.slice(0, 10)) {
          console.log(`  - ${record.asset.r2Key}: ${record.errorMessage}`);
        }
        if (failedRecords.length > 10) {
          console.log(`  ... and ${failedRecords.length - 10} more (see log file)\n`);
        }
        console.log('\nRun verification: npm run verify:r2\n');
      } else {
        console.log('🎉 All files uploaded successfully!\n');
        console.log('Run verification: npm run verify:r2\n');
      }
    }

    // Exit with appropriate code
    const { successCount, failedCount, totalFiles } = manifest.summary;
    if (failedCount > 0) {
      process.exit(1); // Partial failure
    } else if (successCount === totalFiles) {
      process.exit(0); // Success
    } else {
      process.exit(1); // Partial failure
    }

  } catch (error: any) {
    console.error(`\n❌ Fatal error: ${error.message}\n`);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(3); // Fatal error
  }
}

// Run migration
migrate();
