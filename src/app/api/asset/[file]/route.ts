import { readFile, readdir } from "fs/promises"
import path from "path"
import sharp from "sharp"

export const runtime = "nodejs"

export async function GET(
  req: Request,
  context: { params: Promise<{ file: string }> }
) {
  const { file } = await context.params

  const baseDir = path.join(process.cwd(), "asset", "products")

  const allFiles = await readdir(baseDir)

  const match = allFiles.find((f) =>
    f.startsWith(file + ".") &&
    /\.(png|jpg|jpeg|webp)$/i.test(f)
  )

  if (!match) {
    return new Response("Not Found", { status: 404 })
  }

  const filePath = path.join(baseDir, match)

  try {
    const buffer = await readFile(filePath)

    const webpBuffer = await sharp(buffer).webp().toBuffer()

    return new Response(new Uint8Array(webpBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    return new Response("Not Found", { status: 404 })
  }
}
