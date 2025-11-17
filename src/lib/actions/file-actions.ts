"use server"

import { saveBase64File } from "@/lib/file-upload"

export async function uploadBase64Image(base64Data: string, filename: string): Promise<string> {
  try {
    return await saveBase64File(base64Data, filename)
  } catch (error) {
    console.error("[v0] Error uploading base64 image:", error)
    throw new Error("Failed to upload image")
  }
}

export async function uploadBase64Images(images: Array<{ data: string; name: string }>): Promise<string[]> {
  try {
    const urls = await Promise.all(images.map((img) => saveBase64File(img.data, img.name)))
    return urls
  } catch (error) {
    console.error("[v0] Error uploading base64 images:", error)
    throw new Error("Failed to upload images")
  }
}
