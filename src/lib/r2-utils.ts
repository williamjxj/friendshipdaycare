/**
 * R2 CDN URL utilities
 * Centralized CDN URL generation for consistent image/video references
 */

/**
 * Get Cloudflare R2 CDN URL for an image or video path.
 * 
 * @param path - Local path to asset (e.g., '/imgs/home/1.jpeg')
 * @returns Full CDN URL
 * @throws {Error} If NEXT_PUBLIC_R2_CDN_URL is not configured
 * 
 * @example
 * ```typescript
 * getCDNUrl('/imgs/home/1.jpeg')
 * // → 'https://pub-fafb0f1d538f40ebb6fdd21bb5041a1c.r2.dev/imgs/home/1.jpeg'
 * ```
 */
export function getCDNUrl(path: string): string {
  const cdnBase = process.env.NEXT_PUBLIC_R2_CDN_URL;
  
  if (!cdnBase) {
    throw new Error(
      'NEXT_PUBLIC_R2_CDN_URL is not configured. ' +
      'Add it to .env.local for CDN support.'
    );
  }
  
  // Normalize path: remove leading slash, remove 'public/' prefix
  const normalizedPath = path
    .replace(/^\/+/, '')                    // Remove leading slashes
    .replace(/^public\//, '')               // Remove 'public/' prefix
    .replace(/\\/g, '/');                   // Normalize Windows paths
  
  // Remove trailing slash from CDN base if present
  const normalizedBase = cdnBase.replace(/\/+$/, '');
  
  return `${normalizedBase}/${normalizedPath}`;
}

/**
 * Convert CDN URL back to local path (for rollback scenarios).
 * 
 * @param cdnUrl - Full CDN URL
 * @returns Local path relative to public/ directory
 * @throws {Error} If URL doesn't match configured CDN base
 */
export function getLocalPath(cdnUrl: string): string {
  const cdnBase = process.env.NEXT_PUBLIC_R2_CDN_URL;
  
  if (!cdnBase) {
    throw new Error('NEXT_PUBLIC_R2_CDN_URL is not configured');
  }
  
  const normalizedBase = cdnBase.replace(/\/+$/, '');
  
  if (!cdnUrl.startsWith(normalizedBase)) {
    throw new Error(
      `URL does not match configured CDN base. ` +
      `Expected: ${normalizedBase}, Got: ${cdnUrl}`
    );
  }
  
  return cdnUrl
    .substring(normalizedBase.length)
    .replace(/^\/+/, '');
}

/**
 * Check if a URL is a CDN URL.
 * 
 * @param url - URL to check
 * @returns true if URL matches CDN base, false otherwise
 */
export function isCDNUrl(url: string): boolean {
  const cdnBase = process.env.NEXT_PUBLIC_R2_CDN_URL;
  
  if (!cdnBase) {
    return false;
  }
  
  const normalizedBase = cdnBase.replace(/\/+$/, '');
  return url.startsWith(normalizedBase);
}
