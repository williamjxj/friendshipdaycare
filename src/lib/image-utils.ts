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
 * - /imgs/home/1.jpeg → imgs/home/1.jpeg
 * - /videos/intro.mp4 → videos/intro.mp4
 * 
 * @param localPath - Local path starting with /images/, /static/, /collects/, /imgs/, or /videos/
 * @returns R2 bucket URL (CDN, public, or direct R2 URL)
 * @throws Error if path doesn't match expected format or R2 config is missing
 */
export function getR2ImageUrl(localPath: string): string {
  // Remove leading slash if present
  const normalizedPath = localPath.startsWith('/') ? localPath.slice(1) : localPath;
  
  // Validate that path starts with recognized prefixes
  if (!normalizedPath.startsWith('images/') && 
      !normalizedPath.startsWith('static/') && 
      !normalizedPath.startsWith('collects/') &&
      !normalizedPath.startsWith('imgs/') &&
      !normalizedPath.startsWith('videos/')) {
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
         path.startsWith('/collects/') ||
         path.startsWith('/imgs/') ||
         path.startsWith('/videos/');
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

/**
 * Gets placeholder asset URL
 * Handles placeholder images/videos from public/imgs/ directory
 * 
 * @param path - Placeholder path (e.g., 'about/about_hero_1.gif' or 'imgs/about/about_hero_1.gif')
 * @returns Full path to placeholder asset
 */
export function getPlaceholderUrl(path: string): string {
  // Remove leading slash if present
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  
  // If it already includes imgs/, return as-is
  if (normalizedPath.startsWith('imgs/')) {
    return `/${normalizedPath}`;
  }
  
  // Otherwise, prepend imgs/
  return `/imgs/${normalizedPath}`;
}

/**
 * Checks if a path is a placeholder asset
 * 
 * @param path - Path to check
 * @returns true if path is a placeholder asset
 */
export function isPlaceholder(path: string): boolean {
  return path.includes('/imgs/') || path.startsWith('imgs/') || 
         path.includes('/placeholders/') || path.startsWith('placeholders/');
}

