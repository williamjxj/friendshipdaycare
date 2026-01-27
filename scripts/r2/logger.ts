/**
 * Structured logger
 * Logs migration events to JSON Lines file
 */

import { appendFile, mkdir } from 'fs/promises';
import { dirname } from 'path';
import { LogEntry, MigrationEvent } from './types.js';

/**
 * Logger for migration events
 */
export class MigrationLogger {
  private logFile: string;
  private migrationId: string;

  constructor(logFile: string, migrationId: string) {
    this.logFile = logFile;
    this.migrationId = migrationId;
  }

  /**
   * Log a migration event
   * @param event Migration event to log
   */
  async log(event: MigrationEvent): Promise<void> {
    const logEntry: LogEntry = {
      ...event,
      timestamp: new Date().toISOString(),
      migrationId: this.migrationId,
    };

    const logLine = JSON.stringify(logEntry) + '\n';

    try {
      // Ensure directory exists
      await mkdir(dirname(this.logFile), { recursive: true });
      
      // Append to log file
      await appendFile(this.logFile, logLine, 'utf-8');
    } catch (error: any) {
      // Log errors to console but don't throw (logging shouldn't break migration)
      console.error(`Failed to write to log file: ${error.message}`);
    }
  }

  /**
   * Log migration started
   */
  async logMigrationStarted(filesCount: number, totalBytes: number): Promise<void> {
    await this.log({
      type: 'migration_started',
      filesCount,
      totalBytes,
    });
  }

  /**
   * Log upload started
   */
  async logUploadStarted(r2Key: string, attempt: number): Promise<void> {
    await this.log({
      type: 'upload_started',
      r2Key,
      attempt,
    });
  }

  /**
   * Log upload success
   */
  async logUploadSuccess(r2Key: string, sizeBytes: number, durationMs: number): Promise<void> {
    await this.log({
      type: 'upload_success',
      r2Key,
      sizeBytes,
      durationMs,
    });
  }

  /**
   * Log upload failed
   */
  async logUploadFailed(r2Key: string, attempt: number, error: string): Promise<void> {
    await this.log({
      type: 'upload_failed',
      r2Key,
      attempt,
      error,
    });
  }

  /**
   * Log upload skipped
   */
  async logUploadSkipped(r2Key: string, reason: string): Promise<void> {
    await this.log({
      type: 'upload_skipped',
      r2Key,
      reason,
    });
  }

  /**
   * Log batch completed
   */
  async logBatchCompleted(batchNumber: number, filesInBatch: number): Promise<void> {
    await this.log({
      type: 'batch_completed',
      batchNumber,
      filesInBatch,
    });
  }

  /**
   * Log migration completed
   */
  async logMigrationCompleted(summary: any): Promise<void> {
    await this.log({
      type: 'migration_completed',
      summary,
    });
  }

  /**
   * Log migration error
   */
  async logMigrationError(error: Error): Promise<void> {
    await this.log({
      type: 'migration_error',
      error: error.message,
      stack: error.stack,
    });
  }
}
