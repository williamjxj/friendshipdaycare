/**
 * Checksum utility
 * Computes SHA-256 checksums for files
 */

import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { Readable } from 'stream';

/**
 * Compute SHA-256 checksum for a file
 * @param filePath Path to file
 * @returns Hex-encoded SHA-256 checksum
 */
export async function computeChecksum(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    const stream = createReadStream(filePath);
    
    stream.on('data', (chunk) => {
      hash.update(chunk);
    });
    
    stream.on('end', () => {
      resolve(hash.digest('hex'));
    });
    
    stream.on('error', (error) => {
      reject(new Error(`Failed to compute checksum for ${filePath}: ${error.message}`));
    });
  });
}

/**
 * Compute SHA-256 checksum for a stream
 * @param stream Readable stream
 * @returns Hex-encoded SHA-256 checksum
 */
export async function computeChecksumFromStream(stream: Readable): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    
    stream.on('data', (chunk) => {
      hash.update(chunk);
    });
    
    stream.on('end', () => {
      resolve(hash.digest('hex'));
    });
    
    stream.on('error', (error) => {
      reject(new Error(`Failed to compute checksum from stream: ${error.message}`));
    });
  });
}

/**
 * Compare two checksums
 * @param checksum1 First checksum
 * @param checksum2 Second checksum
 * @returns true if checksums match
 */
export function compareChecksums(checksum1: string, checksum2: string): boolean {
  return checksum1.toLowerCase() === checksum2.toLowerCase();
}
