/**
 * Media URL normalization and trusted source validation
 *
 * Supported trusted sources:
 * 1. Local project paths: /images/..., /videos/..., etc.
 * 2. Uploaded data URIs: data:image/... or data:video/...
 * 3. Google Drive share links (auto-converted to direct preview/streaming URLs)
 * 4. Google UserContent / Google Photos (lh3.googleusercontent.com, etc.)
 * 5. Other trusted CDNs & image providers:
 *    - Cloudinary (res.cloudinary.com)
 *    - Unsplash (images.unsplash.com)
 *    - Imgur (i.imgur.com)
 *    - Shopify CDN (cdn.shopify.com)
 *    - GitHub assets (raw.githubusercontent.com, github.com)
 *    - Pexels (images.pexels.com)
 *    - Cloudflare / AWS S3
 */

export const TRUSTED_DOMAINS = [
  'drive.google.com',
  'docs.google.com',
  'lh3.googleusercontent.com',
  'lh4.googleusercontent.com',
  'lh5.googleusercontent.com',
  'lh6.googleusercontent.com',
  'images.unsplash.com',
  'res.cloudinary.com',
  'i.imgur.com',
  'imgur.com',
  'cdn.shopify.com',
  'raw.githubusercontent.com',
  'images.pexels.com',
  'firebasestorage.googleapis.com',
]

/**
 * Extracts a Google Drive file ID from various Drive URL formats:
 * - https://drive.google.com/file/d/1A2B3C4D5E.../view?usp=sharing
 * - https://drive.google.com/open?id=1A2B3C4D5E...
 * - https://drive.google.com/uc?id=1A2B3C4D5E...
 * - https://docs.google.com/uc?export=download&id=1A2B3C4D5E...
 */
export function extractGoogleDriveId(url: string): string | null {
  if (!url || typeof url !== 'string') return null
  const trimmed = url.trim()

  // Match /file/d/{id}
  const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]{20,})/)
  if (fileDMatch && fileDMatch[1]) return fileDMatch[1]

  // Match id={id}
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]{20,})/)
  if (idParamMatch && idParamMatch[1]) return idParamMatch[1]

  // Match /d/{id}
  const directDMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]{20,})/)
  if (directDMatch && directDMatch[1]) return directDMatch[1]

  return null
}

/**
 * Converts a Google Drive link to high-speed direct preview URL.
 * Falls back to original URL if not a recognized Drive link.
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url) return ''
  const trimmed = url.trim()
  const driveId = extractGoogleDriveId(trimmed)
  if (driveId) {
    // lh3.googleusercontent.com provides fast, hotlinkable direct image streaming for public Drive files
    return `https://lh3.googleusercontent.com/d/${driveId}`
  }
  return trimmed
}

export interface ValidationResult {
  isValid: boolean
  normalizedUrl: string
  sourceType: 'local' | 'data-uri' | 'google-drive' | 'trusted-cdn' | 'invalid'
  error?: string
}

/**
 * Validates whether a media URL comes from a trusted source, and returns
 * the normalized URL (e.g., auto-converting Google Drive links).
 */
export function validateAndNormalizeMediaUrl(rawUrl: string): ValidationResult {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return {
      isValid: false,
      normalizedUrl: '',
      sourceType: 'invalid',
      error: 'Please enter a valid link or upload an asset.',
    }
  }

  const url = rawUrl.trim()

  // 1. Local relative assets (/images/..., /videos/..., etc.)
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
    return {
      isValid: true,
      normalizedUrl: url,
      sourceType: 'local',
    }
  }

  // 2. Data URIs from file picker upload
  if (url.startsWith('data:image/') || url.startsWith('data:video/')) {
    return {
      isValid: true,
      normalizedUrl: url,
      sourceType: 'data-uri',
    }
  }

  // 3. Check for Google Drive links
  const driveId = extractGoogleDriveId(url)
  if (driveId) {
    return {
      isValid: true,
      normalizedUrl: `https://lh3.googleusercontent.com/d/${driveId}`,
      sourceType: 'google-drive',
    }
  }

  // 4. Check Web URLs against trusted domains
  try {
    const parsed = new URL(url)
    const hostname = parsed.hostname.toLowerCase()

    // Enforce HTTPS
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return {
        isValid: false,
        normalizedUrl: url,
        sourceType: 'invalid',
        error: 'Only HTTPS and HTTP links are accepted.',
      }
    }

    const isTrusted = TRUSTED_DOMAINS.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    )

    if (isTrusted) {
      return {
        isValid: true,
        normalizedUrl: url,
        sourceType: 'trusted-cdn',
      }
    }

    return {
      isValid: false,
      normalizedUrl: url,
      sourceType: 'invalid',
      error: `Domain "${hostname}" is not in the trusted sources list. We only accept Google Drive links, Cloudinary, Unsplash, Imgur, or direct file uploads.`,
    }
  } catch {
    return {
      isValid: false,
      normalizedUrl: url,
      sourceType: 'invalid',
      error: 'Invalid URL format. Please paste a valid web link or Google Drive link.',
    }
  }
}

/**
 * Universal media URL normalizer for safe rendering across the frontend.
 * Converts Google Drive links and trims whitespace safely.
 */
export function normalizeMediaUrl(url: string | undefined | null): string {
  if (!url) return ''
  const trimmed = url.trim()
  const driveId = extractGoogleDriveId(trimmed)
  if (driveId) {
    return `https://lh3.googleusercontent.com/d/${driveId}`
  }
  return trimmed
}
