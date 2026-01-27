/**
 * R2 configuration loader
 * Loads and validates R2 credentials from .env.local
 */

import { R2ClientConfig } from './types.js';

/**
 * Load R2 configuration from environment variables
 * @throws {Error} If required environment variables are missing
 */
export function loadR2Config(): R2ClientConfig {
  const accountId = process.env.R2_ACCOUNT_ID || process.env.NEXT_PUBLIC_R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME;
  const endpointOverride = process.env.R2_ENDPOINT_OVERRIDE;

  // Validate required variables
  const missing: string[] = [];

  if (!accountId) missing.push('R2_ACCOUNT_ID');
  if (!accessKeyId) missing.push('R2_ACCESS_KEY_ID');
  if (!secretAccessKey) missing.push('R2_SECRET_ACCESS_KEY');
  if (!bucketName) missing.push('R2_BUCKET_NAME');

  if (missing.length > 0) {
    throw new Error(
      `Missing required R2 configuration variables: ${missing.join(', ')}\n` +
      `Please ensure these are set in your .env.local file.`
    );
  }

  return {
    accountId: accountId!,
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!,
    bucketName: bucketName!,
    endpointOverride,
  };
}

/**
 * Get CDN URL from environment
 * @throws {Error} If NEXT_PUBLIC_R2_CDN_URL is not set
 */
export function getCDNBaseUrl(): string {
  const cdnUrl = process.env.NEXT_PUBLIC_R2_CDN_URL;

  if (!cdnUrl) {
    throw new Error(
      'NEXT_PUBLIC_R2_CDN_URL is not configured.\n' +
      'Add it to .env.local for CDN support.'
    );
  }

  return cdnUrl;
}

/**
 * Validate R2 configuration
 * @param config R2 client configuration
 * @returns true if valid, throws Error otherwise
 */
export function validateR2Config(config: R2ClientConfig): boolean {
  // Check account ID format (should be hex string)
  if (!/^[a-f0-9]{32}$/.test(config.accountId)) {
    console.warn('R2 account ID format looks unusual (expected 32-char hex string)');
  }

  // Check access key format (should be hex string)
  if (!/^[a-f0-9]{32}$/.test(config.accessKeyId)) {
    console.warn('R2 access key ID format looks unusual (expected 32-char hex string)');
  }

  // Check secret access key format (should be hex string)
  if (!/^[a-f0-9]{64}$/.test(config.secretAccessKey)) {
    console.warn('R2 secret access key format looks unusual (expected 64-char hex string)');
  }

  // Check bucket name (should be lowercase alphanumeric with hyphens)
  if (!/^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/.test(config.bucketName)) {
    console.warn('R2 bucket name format looks unusual (should be 3-63 chars, lowercase alphanumeric with hyphens)');
  }

  return true;
}

/**
 * Display R2 configuration (with secrets masked)
 * @param config R2 client configuration
 */
export function displayConfig(config: R2ClientConfig): void {
  console.log('\n📋 R2 Configuration:');
  console.log(`  Account ID: ${config.accountId.substring(0, 8)}...`);
  console.log(`  Access Key: ${config.accessKeyId.substring(0, 8)}...`);
  console.log(`  Secret Key: ${'*'.repeat(16)}...`);
  console.log(`  Bucket: ${config.bucketName}`);
  if (config.endpointOverride) {
    console.log(`  Endpoint Override: ${config.endpointOverride}`);
  }
  console.log('');
}
