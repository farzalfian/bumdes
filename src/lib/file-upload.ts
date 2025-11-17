import { promises as fs } from "fs"
import path from "path"
import sharp from "sharp"

// Generate year/month folder structure
function getUploadPath(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  return path.join(process.cwd(), "public", "uploads", String(year), month)
}

// Generate unique filename
function generateFilename(originalName: string, format: "webp" | string = "webp"): string {
  const timestamp = Date.now()
  const ext = `.${format}`
  const name = path.basename(originalName, path.extname(originalName))
  return `${name}_${timestamp}${ext}`
}

// Save file to local storage
export async function saveUploadedFile(buffer: Buffer, originalName: string): Promise<string> {
  try {
    const uploadDir = getUploadPath()

    // Create directory if it doesn't exist
    await fs.mkdir(uploadDir, { recursive: true })

    // Generate unique filename
    const filename = generateFilename(originalName)
    const filepath = path.join(uploadDir, filename)

    // Save file
    await fs.writeFile(filepath, buffer)

    // Return relative URL path for serving
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    return `/uploads/${year}/${month}/${filename}`
  } catch (error) {
    console.error("[v0] Error saving file:", error)
    throw new Error("Failed to save uploaded file")
  }
}

// Handle FormData file upload
export async function handleFileUpload(formData: FormData, fieldName: string): Promise<string> {
  const file = formData.get(fieldName) as File
  if (!file) {
    throw new Error(`No file provided for field: ${fieldName}`)
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  return saveUploadedFile(buffer, file.name)
}

// Handle multiple files upload
export async function handleMultipleFileUpload(formData: FormData, fieldName: string): Promise<string[]> {
  const files = formData.getAll(fieldName) as File[]
  if (files.length === 0) {
    throw new Error(`No files provided for field: ${fieldName}`)
  }

  const urls: string[] = []
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const url = await saveUploadedFile(buffer, file.name)
    urls.push(url)
  }

  return urls
}

// Convert base64 to file and save
export async function saveBase64File(base64Data: string, originalName: string): Promise<string> {
  try {
    // Remove data URL prefix if present
    const base64String = base64Data.replace(/^data:image\/\w+;base64,/, "")
    const buffer = Buffer.from(base64String, "base64")
    return saveUploadedFile(buffer, originalName)
  } catch (error) {
    console.error("[v0] Error saving base64 file:", error)
    throw new Error("Failed to save file from base64")
  }
}

// Convert and save image to WebP
export async function saveImageAsWebP(buffer: Buffer, originalName: string): Promise<string> {
  try {
    const uploadDir = getUploadPath()

    // Create directory if it doesn't exist
    await fs.mkdir(uploadDir, { recursive: true })

    // Generate filename with webp extension
    const filename = generateFilename(originalName, "webp")
    const filepath = path.join(uploadDir, filename)

    // Convert to WebP using sharp
    await sharp(buffer).webp({ quality: 80 }).toFile(filepath)

    // Return relative URL path for serving
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    return `/uploads/${year}/${month}/${filename}`
  } catch (error) {
    console.error("[v0] Error saving image as WebP:", error)
    throw new Error("Failed to save image as WebP")
  }
}

// Handle multiple image uploads and convert to WebP
export async function saveMultipleImagesAsWebP(files: File[]): Promise<string[]> {
  const urls: string[] = []

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const url = await saveImageAsWebP(buffer, file.name)
    urls.push(url)
  }

  return urls
}
