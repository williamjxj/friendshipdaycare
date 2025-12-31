/**
 * Validates required environment variables for R2 configuration
 * @throws Error if any required environment variables are missing
 */
export function validateR2Env() {
  const requiredVars = {
    NEXT_PUBLIC_R2_ACCOUNT_ID: process.env.NEXT_PUBLIC_R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
  };

  const missing: string[] = [];

  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}\n` +
        `Please set these variables in your .env.local file or environment.`
    );
  }

  // Optional: Validate CDN URL format if provided
  const cdnUrl = process.env.NEXT_PUBLIC_R2_CDN_URL;
  if (cdnUrl) {
    try {
      const parsed = new URL(cdnUrl);
      if (parsed.protocol !== "https:") {
        console.warn(
          `Warning: NEXT_PUBLIC_R2_CDN_URL should use HTTPS protocol. Current value: ${cdnUrl}`
        );
      }
      if (cdnUrl.endsWith("/")) {
        console.warn(
          `Warning: NEXT_PUBLIC_R2_CDN_URL should not end with trailing slash. Current value: ${cdnUrl}`
        );
      }
    } catch {
      console.warn(
        `Warning: NEXT_PUBLIC_R2_CDN_URL appears to be invalid URL format. Current value: ${cdnUrl}`
      );
    }
  }
}
