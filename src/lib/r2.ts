import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Creates and returns a configured S3 client for Cloudflare R2
 * @returns Configured S3Client instance
 * @throws Error if R2 configuration is missing
 */
export function createR2Client() {
  if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    throw new Error(
      "Missing R2 configuration. Please set R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY environment variables."
    );
  }

  if (!process.env.NEXT_PUBLIC_R2_ACCOUNT_ID) {
    throw new Error(
      "Missing R2 configuration. Please set NEXT_PUBLIC_R2_ACCOUNT_ID environment variable."
    );
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.NEXT_PUBLIC_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

/**
 * Allowed image MIME types
 */
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
];

/**
 * Maximum file size in bytes (10MB)
 */
const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * Validates CDN URL format
 *
 * Validation rules:
 * - Must be valid HTTPS URL
 * - Must not end with trailing slash
 * - Must be full domain (e.g., https://cdn.example.com)
 *
 * @param url - CDN URL to validate
 * @returns true if URL is valid, false otherwise
 */
function validateCDNUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && !url.endsWith("/");
  } catch {
    return false;
  }
}

/**
 * Generates cache control header based on image type
 *
 * Cache header values:
 * - Public images: `public, max-age=31536000, immutable` (1 year cache, immutable content)
 * - Signed URLs: `private, max-age=3600` (1 hour cache, private content)
 *
 * These headers propagate through CDN for optimal caching behavior.
 *
 * @param signed - Whether the image is signed (private)
 * @returns Cache-Control header value
 */
function getCacheControlHeader(signed: boolean = false): string {
  if (signed) {
    // Signed URLs should not be cached by CDN
    return "private, max-age=3600";
  }
  // Public images: cache for 1 year, immutable
  return "public, max-age=31536000, immutable";
}

/**
 * Generates image URL with priority logic: CDN URL → Public URL → Direct R2 URL
 *
 * URL Priority:
 * 1. CDN URL (if NEXT_PUBLIC_R2_CDN_URL is set and valid) → Enables CDN delivery
 * 2. Public URL (if NEXT_PUBLIC_R2_PUBLIC_URL is set) → Custom domain without CDN
 * 3. Direct R2 URL (fallback) → Default R2.dev URL
 *
 * Fallback behavior:
 * - If CDN URL is misconfigured (invalid format), system warns and falls back to public/direct URL
 * - System gracefully handles missing environment variables
 *
 * CDN purging: Manual cache invalidation available via Cloudflare dashboard if needed.
 *
 * @param key - R2 object key
 * @returns Generated image URL
 * @throws Error if CDN URL is misconfigured (invalid format) but continues with fallback
 */
export function generateImageUrl(key: string): string {
  const cdnUrl = process.env.NEXT_PUBLIC_R2_CDN_URL;
  const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
  const accountId = process.env.NEXT_PUBLIC_R2_ACCOUNT_ID;
  const bucketName = process.env.R2_BUCKET_NAME;

  // Normalize key: remove leading slash if present to avoid double slashes
  const normalizedKey = key.startsWith("/") ? key.slice(1) : key;

  // Priority 1: CDN URL (if configured and valid)
  if (cdnUrl) {
    if (validateCDNUrl(cdnUrl)) {
      return `${cdnUrl}/${normalizedKey}`;
    } else {
      // CDN URL is misconfigured, warn but continue with fallback
      console.warn(
        `Warning: NEXT_PUBLIC_R2_CDN_URL is invalid. Expected HTTPS URL without trailing slash. Falling back to public/direct URL.`
      );
    }
  }

  // Priority 2: Public URL (if configured)
  if (publicUrl) {
    return `${publicUrl}/${normalizedKey}`;
  }

  // Priority 3: Direct R2 URL (fallback)
  if (!accountId || !bucketName) {
    throw new Error(
      "Missing R2 configuration. Please set NEXT_PUBLIC_R2_ACCOUNT_ID and R2_BUCKET_NAME environment variables."
    );
  }

  return `https://${accountId}.r2.dev/${bucketName}/${normalizedKey}`;
}

/**
 * Uploads an image file to Cloudflare R2
 *
 * URL Generation:
 * - Returns CDN URL if NEXT_PUBLIC_R2_CDN_URL is configured (enables CDN delivery)
 * - Falls back to public URL if NEXT_PUBLIC_R2_PUBLIC_URL is set
 * - Falls back to direct R2 URL if neither is configured
 *
 * Cache Headers:
 * - Sets Cache-Control header for optimal CDN caching (public, max-age=31536000, immutable)
 * - Headers propagate through CDN for improved performance
 *
 * @param file - Image file or buffer to upload
 * @param category - Category for organization (e.g., "images", "avatars")
 * @returns Object containing CDN/public/direct URL and R2 key
 * @throws Error if file validation fails or upload fails
 */
export async function uploadImageToR2(
  file: File | Buffer,
  category: string = "images"
): Promise<{ url: string; key: string }> {
  // Validate category
  if (!/^[a-z0-9_-]+$/.test(category)) {
    throw new Error(
      "Invalid category. Category must be alphanumeric with hyphens or underscores only."
    );
  }

  // Get file info
  const isFile = file instanceof File;
  const fileName = isFile ? file.name : "image";
  const fileSize = isFile ? file.size : (file as Buffer).length;
  const fileType = isFile ? file.type : "image/jpeg";

  // Validate file type
  if (!ALLOWED_IMAGE_TYPES.includes(fileType)) {
    throw new Error(
      `Unsupported file type: ${fileType}. Allowed types: ${ALLOWED_IMAGE_TYPES.join(", ")}`
    );
  }

  // Validate file size
  if (fileSize > MAX_FILE_SIZE) {
    throw new Error(
      `File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB`
    );
  }

  // Generate unique key
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  const extension = fileName.split(".").pop() || "jpg";
  const key = `${category}/${year}/${month}/${uniqueId}.${extension}`;

  // Convert file to buffer if needed
  const buffer = isFile
    ? Buffer.from(await file.arrayBuffer())
    : (file as Buffer);

  // Upload to R2
  const client = createR2Client();
  const bucketName = process.env.R2_BUCKET_NAME;

  if (!bucketName) {
    throw new Error(
      "Missing R2 configuration. Please set R2_BUCKET_NAME environment variable."
    );
  }

  try {
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: fileType,
        CacheControl: getCacheControlHeader(false), // Public images
      })
    );

    // Generate image URL using priority logic (CDN → Public → Direct)
    // URL generation succeeds even if CDN is misconfigured (falls back gracefully)
    let imageUrl: string;
    try {
      imageUrl = generateImageUrl(key);
    } catch (error) {
      // Fallback to direct R2 URL if URL generation fails
      const accountId = process.env.NEXT_PUBLIC_R2_ACCOUNT_ID;
      if (accountId && bucketName) {
        console.warn(
          `Warning: Failed to generate CDN/public URL, falling back to direct R2 URL. Error: ${error instanceof Error ? error.message : "Unknown error"}`
        );
        imageUrl = `https://${accountId}.r2.dev/${bucketName}/${key}`;
      } else {
        throw error;
      }
    }

    return { url: imageUrl, key };
  } catch (error) {
    throw new Error(
      `Failed to upload image: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Retrieves an image URL from R2 (public or signed)
 *
 * URL Generation (for public URLs):
 * - Returns CDN URL if NEXT_PUBLIC_R2_CDN_URL is configured (enables CDN delivery)
 * - Falls back to public URL if NEXT_PUBLIC_R2_PUBLIC_URL is set
 * - Falls back to direct R2 URL if neither is configured
 *
 * Signed URLs:
 * - Signed URLs point to R2 endpoint (not CDN) for security
 * - Maintain expiration times regardless of CDN configuration
 *
 * Fallback Behavior:
 * - If CDN URL generation fails, system gracefully falls back to direct R2 URL
 * - Upload operations succeed regardless of CDN status
 *
 * @param key - R2 object key
 * @param signed - Whether to generate a signed URL (for private buckets)
 * @returns CDN/public/direct URL or signed URL
 * @throws Error if key not found or access denied
 */
export async function getImageUrl(
  key: string,
  signed: boolean = false
): Promise<string> {
  const client = createR2Client();
  const bucketName = process.env.R2_BUCKET_NAME;

  if (!bucketName) {
    throw new Error(
      "Missing R2 configuration. Please set R2_BUCKET_NAME environment variable."
    );
  }

  try {
    if (signed) {
      // Generate signed URL (points to R2 endpoint, not CDN)
      // Signed URLs maintain security regardless of CDN configuration
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
      });
      const url = await getSignedUrl(client, command, { expiresIn: 3600 }); // 1 hour expiry
      return url;
    } else {
      // Return public URL using priority logic (CDN → Public → Direct)
      try {
        return generateImageUrl(key);
      } catch (error) {
        // If URL generation fails, try fallback to direct R2 URL
        const accountId = process.env.NEXT_PUBLIC_R2_ACCOUNT_ID;
        if (accountId && bucketName) {
          console.warn(
            `Warning: Failed to generate CDN/public URL, falling back to direct R2 URL. Error: ${error instanceof Error ? error.message : "Unknown error"}`
          );
          return `https://${accountId}.r2.dev/${bucketName}/${key}`;
        }
        throw error;
      }
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("NoSuchKey")) {
      throw new Error("Image not found");
    }
    throw new Error(
      `Failed to retrieve image: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Deletes an image from R2
 * @param key - R2 object key to delete
 * @throws Error if key not found or delete fails
 */
export async function deleteImageFromR2(key: string): Promise<void> {
  const client = createR2Client();
  const bucketName = process.env.R2_BUCKET_NAME;

  if (!bucketName) {
    throw new Error(
      "Missing R2 configuration. Please set R2_BUCKET_NAME environment variable."
    );
  }

  try {
    await client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      })
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes("NoSuchKey")) {
      throw new Error("Image not found");
    }
    throw new Error(
      `Failed to delete image: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Lists images from R2 bucket
 * @param prefix - Optional prefix to filter objects (e.g., "images/gallery/")
 * @returns Array of image keys and metadata
 */
export async function listR2Images(prefix?: string): Promise<
  Array<{
    key: string;
    url: string;
    size: number;
    lastModified: Date;
  }>
> {
  const client = createR2Client();
  const bucketName = process.env.R2_BUCKET_NAME;

  if (!bucketName) {
    throw new Error(
      "Missing R2 configuration. Please set R2_BUCKET_NAME environment variable."
    );
  }

  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix || "images/",
      MaxKeys: 1000, // Adjust as needed
    });

    const response = await client.send(command);

    if (!response.Contents) {
      return [];
    }

    // Filter for image files only
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];
    const images = response.Contents.filter((obj) => {
      if (!obj.Key) return false;
      const ext = obj.Key.toLowerCase().substring(obj.Key.lastIndexOf("."));
      return imageExtensions.includes(ext);
    });

    return images.map((obj) => ({
      key: obj.Key!,
      url: generateImageUrl(obj.Key!),
      size: obj.Size || 0,
      lastModified: obj.LastModified || new Date(),
    }));
  } catch (error) {
    console.error("Error listing R2 images:", error);
    throw new Error(
      `Failed to list images: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
