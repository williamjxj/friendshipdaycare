/**
 * File discovery utility
 * Recursively discovers files in directories
 */

import { readdir, stat } from 'fs/promises';
import { join, relative } from 'path';
import { FileAsset } from './types.js';
import { computeChecksum } from './checksum.js';
import mime from 'mime-types';

/**
 * Supported image and video file extensions
 */
const SUPPORTED_EXTENSIONS = [
  // Images
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg',
  // Videos
  '.mp4', '.webm',
];

/**
 * Check if file extension is supported
 */
function isSupportedFile(filename: string): boolean {
  const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
  return SUPPORTED_EXTENSIONS.includes(ext);
}

/**
 * Determine file category (image or video)
 */
function getFileCategory(filename: string): 'image' | 'video' {
  const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
  return ['.mp4', '.webm'].includes(ext) ? 'video' : 'image';
}

/**
 * Discover all supported files in a directory recursively
 * @param sourceDir Directory to scan
 * @param publicDir Base public directory (for computing r2Key)
 * @returns Array of file paths
 */
export async function discoverFiles(
  sourceDir: string,
  publicDir: string
): Promise<string[]> {
  const files: string[] = [];
  
  async function traverse(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await traverse(fullPath);
      } else if (entry.isFile() && isSupportedFile(entry.name)) {
        files.push(fullPath);
      }
    }
  }
  
  await traverse(sourceDir);
  return files;
}

/**
 * Create FileAsset from local file path
 * @param localPath Absolute path to file
 * @param publicDir Base public directory
 * @returns FileAsset object
 */
export async function createFileAsset(
  localPath: string,
  publicDir: string
): Promise<FileAsset> {
  const stats = await stat(localPath);
  const r2Key = relative(publicDir, localPath).replace(/\\/g, '/');
  const mimeType = mime.lookup(localPath) || 'application/octet-stream';
  const checksum = await computeChecksum(localPath);
  const category = getFileCategory(localPath);
  
  return {
    localPath,
    r2Key,
    sizeBytes: stats.size,
    mimeType,
    checksum,
    category,
  };
}

/**
 * Discover and create FileAsset objects for all files in directories
 * @param sourceDirs Array of source directories to scan
 * @param publicDir Base public directory
 * @returns Array of FileAsset objects
 */
export async function discoverAllFiles(
  sourceDirs: string[],
  publicDir: string
): Promise<FileAsset[]> {
  const allFiles: string[] = [];
  
  // Discover files from all source directories
  for (const sourceDir of sourceDirs) {
    const files = await discoverFiles(sourceDir, publicDir);
    allFiles.push(...files);
  }
  
  // Create FileAsset objects
  const assets: FileAsset[] = [];
  for (const filePath of allFiles) {
    const asset = await createFileAsset(filePath, publicDir);
    assets.push(asset);
  }
  
  return assets;
}
