import { type NextRequest, NextResponse } from "next/server"
import { verifyAdminAuth } from "@/security/auth-middleware"
import { validateFile, validateFileMagicBytes } from "@/security/file-validator"
import { isRateLimited, getAdminIdentifier } from "@/security/rate-limiter"
import { saveImageAsWebP, saveMultipleImagesAsWebP } from "@/lib/file-upload"

export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdminAuth()
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized. Please login first." }, { status: 401 })
    }

    const adminIdentifier = getAdminIdentifier(admin.id)
    if (isRateLimited(adminIdentifier)) {
      return NextResponse.json(
        { success: false, error: "Too many upload requests. Please try again later." },
        { status: 429 },
      )
    }

    let formData: FormData
    try {
      formData = await request.formData()
    } catch (error) {
      return NextResponse.json({ success: false, error: "Invalid form data" }, { status: 400 })
    }

    const multiple = formData.get("multiple") === "true"

    if (multiple) {
      const files = formData.getAll("files") as File[]

      if (files.length === 0) {
        return NextResponse.json({ success: false, error: "No files provided" }, { status: 400 })
      }

      if (files.length > 10) {
        return NextResponse.json({ success: false, error: "Maximum 10 files per upload" }, { status: 400 })
      }

      const validatedFiles: File[] = []
      const errors: string[] = []

      // Validate each file
      for (const file of files) {
        const validation = validateFile(file)
        if (!validation.valid) {
          errors.push(`${file.name}: ${validation.error}`)
          continue
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const magicBytesValidation = await validateFileMagicBytes(buffer)
        if (!magicBytesValidation.valid) {
          errors.push(`${file.name}: ${magicBytesValidation.error}`)
          continue
        }

        validatedFiles.push(file)
      }

      if (validatedFiles.length === 0) {
        return NextResponse.json(
          { success: false, error: `All files failed validation: ${errors.join(", ")}` },
          { status: 400 },
        )
      }

      const urls = await saveMultipleImagesAsWebP(validatedFiles)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = { success: true, urls }

      if (errors.length > 0) {
        response.warnings = errors
      }

      return NextResponse.json(response)
    } else {
      const file = formData.get("file") as File

      if (!file) {
        return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
      }

      const validation = validateFile(file)
      if (!validation.valid) {
        return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
      }

      const buffer = Buffer.from(await file.arrayBuffer())
      const magicBytesValidation = await validateFileMagicBytes(buffer)
      if (!magicBytesValidation.valid) {
        return NextResponse.json({ success: false, error: magicBytesValidation.error }, { status: 400 })
      }

      const url = await saveImageAsWebP(buffer, file.name)
      return NextResponse.json({ success: true, url })
    }
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred during upload",
      },
      { status: 500 },
    )
  }
}
