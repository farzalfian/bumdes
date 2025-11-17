import { promises as fs } from "fs"
import path from "path"

// Initialize uploads directory structure
export async function initializeUploadsDirectory() {
  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    await fs.mkdir(uploadsDir, { recursive: true })
    console.log("[v0] Uploads directory initialized at:", uploadsDir)
  } catch (error) {
    console.error("[v0] Error initializing uploads directory:", error)
  }
}
