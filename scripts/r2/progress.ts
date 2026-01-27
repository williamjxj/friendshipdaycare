/**
 * Progress tracker
 * Provides real-time progress updates during migration
 */

import cliProgress from 'cli-progress';
import { UploadProgress } from './types.js';

/**
 * Progress tracker for file uploads
 */
export class ProgressTracker {
  private bar: cliProgress.SingleBar | null = null;
  private progress: UploadProgress;
  private startTime: number;
  private enabled: boolean;

  constructor(totalFiles: number, totalBytes: number, enabled: boolean = true) {
    this.enabled = enabled;
    this.startTime = Date.now();
    this.progress = {
      currentFile: null,
      completed: 0,
      total: totalFiles,
      percentComplete: 0,
      bytesUploaded: 0,
      totalBytes,
      currentSpeedBytesPerSec: 0,
      estimatedSecondsRemaining: 0,
    };

    if (this.enabled) {
      this.bar = new cliProgress.SingleBar({
        format: 'Uploading |{bar}| {percentage}% | {value}/{total} | ETA: {eta}s | {speed}',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true,
      });
      
      this.bar.start(totalFiles, 0, {
        speed: '0 KB/s',
        eta: '?',
      });
    }
  }

  /**
   * Update progress with new file
   * @param filename Current file being processed
   * @param sizeBytes Size of file in bytes
   */
  update(filename: string, sizeBytes: number): void {
    this.progress.currentFile = filename;
    this.progress.completed++;
    this.progress.bytesUploaded += sizeBytes;
    this.progress.percentComplete = Math.round(
      (this.progress.completed / this.progress.total) * 100
    );

    // Calculate speed
    const elapsedMs = Date.now() - this.startTime;
    const elapsedSec = elapsedMs / 1000;
    this.progress.currentSpeedBytesPerSec = this.progress.bytesUploaded / elapsedSec;

    // Calculate ETA
    const remainingBytes = this.progress.totalBytes - this.progress.bytesUploaded;
    this.progress.estimatedSecondsRemaining = Math.round(
      remainingBytes / this.progress.currentSpeedBytesPerSec
    );

    if (this.bar) {
      this.bar.update(this.progress.completed, {
        speed: this.formatSpeed(this.progress.currentSpeedBytesPerSec),
        eta: this.progress.estimatedSecondsRemaining,
      });
    }
  }

  /**
   * Mark progress as complete
   */
  complete(): void {
    if (this.bar) {
      this.bar.stop();
    }
  }

  /**
   * Get current progress
   */
  getProgress(): UploadProgress {
    return { ...this.progress };
  }

  /**
   * Format speed for display
   */
  private formatSpeed(bytesPerSec: number): string {
    if (bytesPerSec === 0) return '0 KB/s';
    
    const kbps = bytesPerSec / 1024;
    if (kbps < 1024) {
      return `${Math.round(kbps)} KB/s`;
    }
    
    const mbps = kbps / 1024;
    return `${mbps.toFixed(1)} MB/s`;
  }
}

/**
 * Format duration in milliseconds to human-readable string
 * @param ms Duration in milliseconds
 * @returns Formatted duration (e.g., "2m 30s")
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Format bytes to human-readable size
 * @param bytes Number of bytes
 * @returns Formatted size (e.g., "1.5 MB")
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}
