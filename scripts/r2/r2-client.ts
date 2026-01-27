/**
 * R2 client wrapper using AWS S3 SDK
 * Provides S3Client configured for Cloudflare R2
 */

import { S3Client, HeadBucketCommand } from '@aws-sdk/client-s3';
import { R2ClientConfig } from './types.js';

/**
 * Create and configure S3Client for R2
 * @param config R2 client configuration
 * @returns Configured S3Client
 */
export function createR2Client(config: R2ClientConfig): S3Client {
  // Construct R2 endpoint
  const endpoint = config.endpointOverride || 
    `https://${config.accountId}.r2.cloudflarestorage.com`;
  
  const client = new S3Client({
    region: 'auto', // R2 uses 'auto' region
    endpoint,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    // Increase timeouts for large files
    requestHandler: {
      requestTimeout: 300000, // 5 minutes
    } as any,
  });
  
  return client;
}

/**
 * Test R2 connection and bucket access
 * @param client S3Client instance
 * @param bucketName Bucket name to test
 * @returns true if connection successful, throws Error otherwise
 */
export async function testR2Connection(
  client: S3Client, 
  bucketName: string
): Promise<boolean> {
  try {
    await client.send(new HeadBucketCommand({ Bucket: bucketName }));
    return true;
  } catch (error: any) {
    if (error.name === 'NotFound') {
      throw new Error(
        `R2 bucket '${bucketName}' not found. ` +
        `Please create the bucket in Cloudflare dashboard first.`
      );
    } else if (error.name === 'Forbidden' || error.$metadata?.httpStatusCode === 403) {
      throw new Error(
        `Access denied to R2 bucket '${bucketName}'. ` +
        `Please check your R2 API credentials have read/write permissions.`
      );
    } else if (error.name === 'NetworkingError') {
      throw new Error(
        `Network error connecting to R2. ` +
        `Please check your internet connection and R2 account ID.`
      );
    } else {
      throw new Error(
        `Failed to connect to R2: ${error.message || 'Unknown error'}`
      );
    }
  }
}

/**
 * Initialize R2 client with connection test
 * @param config R2 client configuration
 * @returns Configured and tested S3Client
 * @throws {Error} If connection test fails
 */
export async function initializeR2Client(config: R2ClientConfig): Promise<S3Client> {
  const client = createR2Client(config);
  
  console.log('🔌 Testing R2 connection...');
  await testR2Connection(client, config.bucketName);
  console.log('✅ R2 connection successful\n');
  
  return client;
}
