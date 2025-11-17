// Allowed MIME types for images
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"])

// Allowed file extensions
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"])

// Maximum file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024

// Minimum file size: 100 bytes
const MIN_FILE_SIZE = 100

export interface FileValidationResult {
  valid: boolean
  error?: string
}

export function validateFile(file: File): FileValidationResult {
  // Check file size
  if (file.size < MIN_FILE_SIZE) {
    return { valid: false, error: "File is too small" }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File exceeds maximum size of 50MB` }
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return { valid: false, error: `File type ${file.type} is not allowed` }
  }

  // Check file extension
  const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase()
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return { valid: false, error: `File extension ${ext} is not allowed` }
  }

  // Check for suspicious filename patterns
  if (containsSuspiciousPatterns(file.name)) {
    return { valid: false, error: "Filename contains suspicious characters" }
  }

  return { valid: true }
}

function containsSuspiciousPatterns(filename: string): boolean {
  // Check for path traversal attempts
  if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return true
  }

  // Check for suspicious characters
  const suspiciousChars = /[<>:"|?*\x00-\x1f]/g
  if (suspiciousChars.test(filename)) {
    return true
  }

  return false
}

// Validate file buffer magic bytes (file signature)
export async function validateFileMagicBytes(buffer: Buffer): Promise<FileValidationResult> {
  if (buffer.length < 4) {
    return { valid: false, error: "File is too small to validate" }
  }

  const magicBytes = buffer.slice(0, 4)
  const hexSignature = magicBytes.toString("hex")

  // JPEG signature
  if (hexSignature.startsWith("ffd8ff")) {
    return { valid: true }
  }

  // PNG signature
  if (hexSignature === "89504e47") {
    return { valid: true }
  }

  // GIF signature
  if (hexSignature.startsWith("47494638")) {
    return { valid: true }
  }

  // WebP signature
  if (buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP") {
    return { valid: true }
  }

  return { valid: false, error: "File signature does not match allowed image formats" }
}
