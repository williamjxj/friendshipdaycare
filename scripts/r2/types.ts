/**
 * TypeScript interfaces for R2 CDN migration
 * Based on data-model.md
 */

/**
 * Represents a single file to be migrated to R2
 */
export interface FileAsset {
  /** Absolute path to file on local filesystem */
  localPath: string;

  /** Relative path from public/ directory (becomes R2 object key) */
  r2Key: string;

  /** File size in bytes */
  sizeBytes: number;

  /** MIME type for Content-Type header */
  mimeType: string;

  /** SHA-256 checksum of file content */
  checksum: string;

  /** File type category for reporting */
  category: 'image' | 'video';
}

/**
 * Tracks the status and result of uploading a single file to R2
 */
export interface MigrationRecord {
  /** Unique identifier (same as r2Key) */
  id: string;

  /** Reference to source file */
  asset: FileAsset;

  /** Upload status */
  status: 'pending' | 'uploading' | 'success' | 'failed' | 'skipped';

  /** ISO 8601 timestamp when upload started */
  uploadStartedAt: string | null;

  /** ISO 8601 timestamp when upload completed */
  uploadCompletedAt: string | null;

  /** Number of upload attempts made */
  attempts: number;

  /** Error message if status is 'failed' */
  errorMessage: string | null;

  /** R2 ETag returned after successful upload */
  etag: string | null;
}

/**
 * Aggregated statistics for reporting and verification
 */
export interface MigrationSummary {
  /** Total number of files discovered */
  totalFiles: number;

  /** Number of files successfully uploaded */
  successCount: number;

  /** Number of files failed after all retries */
  failedCount: number;

  /** Number of files skipped (already exist with matching checksum) */
  skippedCount: number;

  /** Total bytes uploaded */
  totalBytesUploaded: number;

  /** Duration in milliseconds */
  durationMs: number;

  /** Upload rate in bytes per second */
  averageSpeedBytesPerSec: number;
}

/**
 * Configuration snapshot for reproducibility and debugging
 */
export interface MigrationConfig {
  /** R2 account ID */
  accountId: string;

  /** R2 bucket name */
  bucketName: string;

  /** R2 public URL (CDN endpoint) */
  publicUrl: string;

  /** Max concurrent uploads */
  concurrency: number;

  /** Max retry attempts per file */
  maxRetries: number;

  /** Whether this is a dry-run (no actual uploads) */
  dryRun: boolean;

  /** Whether to skip files that already exist in R2 */
  skipExisting: boolean;

  /** ISO 8601 timestamp of config creation */
  createdAt: string;
}

/**
 * Complete record of migration execution
 */
export interface MigrationManifest {
  /** Unique ID for this migration run (UUID) */
  migrationId: string;

  /** ISO 8601 timestamp when migration started */
  startedAt: string;

  /** ISO 8601 timestamp when migration completed */
  completedAt: string | null;

  /** R2 bucket target */
  targetBucket: string;

  /** Source directories migrated */
  sourcePaths: string[];

  /** Summary statistics */
  summary: MigrationSummary;

  /** Individual file records, keyed by r2Key */
  records: Record<string, MigrationRecord>;

  /** Configuration snapshot */
  config: MigrationConfig;
}

/**
 * Detailed record of a verification failure
 */
export interface VerificationDiscrepancy {
  /** R2 key that failed verification */
  r2Key: string;

  /** Type of discrepancy */
  type: 'checksum_mismatch' | 'missing_from_r2' | 'missing_locally';

  /** Expected checksum (from manifest or local file) */
  expectedChecksum: string | null;

  /** Actual checksum (from R2 or null if missing) */
  actualChecksum: string | null;

  /** Human-readable description */
  description: string;
}

/**
 * Result of comparing local files with R2 objects
 */
export interface VerificationResult {
  /** Unique ID linking to migration manifest */
  migrationId: string;

  /** ISO 8601 timestamp of verification */
  verifiedAt: string;

  /** Overall verification status */
  status: 'pass' | 'fail' | 'partial';

  /** Files verified successfully */
  verifiedCount: number;

  /** Files with mismatched checksums */
  mismatchCount: number;

  /** Files missing from R2 */
  missingCount: number;

  /** Detailed discrepancies */
  discrepancies: VerificationDiscrepancy[];
}

/**
 * Real-time progress tracking for console output
 */
export interface UploadProgress {
  /** Current file being uploaded */
  currentFile: string | null;

  /** Number of files completed */
  completed: number;

  /** Total files to upload */
  total: number;

  /** Percentage complete (0-100) */
  percentComplete: number;

  /** Bytes uploaded so far */
  bytesUploaded: number;

  /** Total bytes to upload */
  totalBytes: number;

  /** Current upload speed in bytes/sec */
  currentSpeedBytesPerSec: number;

  /** Estimated time remaining in seconds */
  estimatedSecondsRemaining: number;
}

/**
 * Configuration for AWS SDK S3 client
 */
export interface R2ClientConfig {
  /** R2 account ID (used to construct endpoint) */
  accountId: string;

  /** R2 access key ID */
  accessKeyId: string;

  /** R2 secret access key */
  secretAccessKey: string;

  /** Target bucket name */
  bucketName: string;

  /** Optional endpoint override (for testing with LocalStack) */
  endpointOverride?: string;
}

/**
 * Structured log event for JSON log file
 */
export type MigrationEvent =
  | { type: 'migration_started'; filesCount: number; totalBytes: number }
  | { type: 'upload_started'; r2Key: string; attempt: number }
  | { type: 'upload_success'; r2Key: string; sizeBytes: number; durationMs: number }
  | { type: 'upload_failed'; r2Key: string; attempt: number; error: string }
  | { type: 'upload_skipped'; r2Key: string; reason: string }
  | { type: 'batch_completed'; batchNumber: number; filesInBatch: number }
  | { type: 'migration_completed'; summary: MigrationSummary }
  | { type: 'migration_error'; error: string; stack?: string };

/**
 * Log entry with timestamp and migration ID
 */
export type LogEntry = MigrationEvent & {
  /** ISO 8601 timestamp */
  timestamp: string;

  /** Migration ID for correlation */
  migrationId: string;
};

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: Partial<MigrationConfig> = {
  concurrency: 10,
  maxRetries: 3,
  dryRun: false,
  skipExisting: true,
};
