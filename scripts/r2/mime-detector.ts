/**
 * MIME type detection utility
 * Uses mime-types package for accurate Content-Type headers
 */

import mime from 'mime-types';

/**
 * Detect MIME type for a file
 * @param filename File name or path
 * @returns MIME type string
 */
export function detectMimeType(filename: string): string {
  const mimeType = mime.lookup(filename);
  
  if (!mimeType) {
    // Fallback to application/octet-stream for unknown types
    console.warn(`Unknown MIME type for ${filename}, using application/octet-stream`);
    return 'application/octet-stream';
  }
  
  return mimeType;
}

/**
 * Get appropriate cache control header for file type
 * @param mimeType MIME type of file
 * @returns Cache-Control header value
 */
export function getCacheControl(mimeType: string): string {
  // Images and videos are immutable after upload (content-based URLs)
  // Set long cache duration (1 year)
  return 'public, max-age=31536000, immutable';
}

/**
 * Get content type with charset if applicable
 * @param filename File name or path
 * @returns Content-Type with charset if text-based
 */
export function getContentTypeWithCharset(filename: string): string {
  const mimeType = detectMimeType(filename);
  const charset = mime.charset(mimeType);
  
  if (charset) {
    return `${mimeType}; charset=${charset}`;
  }
  
  return mimeType;
}
