/**
 * Utility functions for handling image URLs from R2 bucket
 */

import { generateImageUrl } from './r2';

/**
 * Converts a local image path to an R2 bucket URL
 * 
 * Maps local paths to R2 keys:
 * - /images/logo.svg → images/logo.svg
 * - /static/new-logo.svg → static/new-logo.svg
 * - /collects/notebooklm-slides.pdf → collects/notebooklm-slides.pdf
 * 
 * @param localPath - Local path starting with /images/, /static/, or /collects/
 * @returns R2 bucket URL (CDN, public, or direct R2 URL)
 * @throws Error if path doesn't match expected format or R2 config is missing
 */
export function getR2ImageUrl(localPath: string): string {
  // Remove leading slash if present
  const normalizedPath = localPath.startsWith('/') ? localPath.slice(1) : localPath;
  
  // Validate that path starts with images/, static/, or collects/
  if (!normalizedPath.startsWith('images/') && 
      !normalizedPath.startsWith('static/') && 
      !normalizedPath.startsWith('collects/')) {
    // If it's not a recognized path, try to use it as-is (might be external URL)
    if (normalizedPath.startsWith('http://') || normalizedPath.startsWith('https://')) {
      return normalizedPath;
    }
    // For unrecognized paths, assume it's in images/ folder
    return generateImageUrl(`images/${normalizedPath}`);
  }
  
  // Use the path as the R2 key directly
  return generateImageUrl(normalizedPath);
}

/**
 * Checks if a path should be converted to R2 URL
 * 
 * @param path - Path to check
 * @returns true if path should be converted to R2 URL
 */
export function shouldUseR2(path: string): boolean {
  return path.startsWith('/images/') || 
         path.startsWith('/static/') || 
         path.startsWith('/collects/');
}

/**
 * Gets image URL - either R2 URL or returns original if external
 * 
 * @param path - Image path (local or external)
 * @returns R2 URL for local paths, original URL for external paths
 */
export function getImageUrl(path: string): string {
  // If it's already an external URL, return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // If it's a local path that should use R2, convert it
  if (shouldUseR2(path)) {
    return getR2ImageUrl(path);
  }
  
  // For other local paths, return as-is (fallback)
  return path;
}

