/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import dbConnect from "@/database/mongodb"
import ImageGalleryModel from "@/database/models/ImageGallery"
import type { ImageGallery } from "@/types"
import { uploadBase64Image } from "./file-actions"

function transformGalleryDoc(doc: any): ImageGallery {
  return {
    id: doc.id || doc._id?.toString() || "",
    name: doc.name,
    description: doc.description,
    imageURL: doc.imageURL,
    releaseDate: typeof doc.releaseDate === "string" ? doc.releaseDate : doc.releaseDate?.toISOString() || "",
    createdAt: typeof doc.createdAt === "string" ? doc.createdAt : doc.createdAt?.toISOString() || "",
    updatedAt: typeof doc.updatedAt === "string" ? doc.updatedAt : doc.updatedAt?.toISOString() || "",
  }
}

export async function getAllGalleries(): Promise<ImageGallery[]> {
  try {
    await dbConnect()
    const galleries = await ImageGalleryModel.find({}).sort({ createdAt: -1 }).lean()
    return galleries.map(transformGalleryDoc)
  } catch (error) {
    console.error("[v0] Error fetching all galleries:", error)
    return []
  }
}

export async function searchGalleries(query: string): Promise<ImageGallery[]> {
  try {
    await dbConnect()
    const searchQuery = {
      $or: [{ name: { $regex: query, $options: "i" } }, { description: { $regex: query, $options: "i" } }],
    }
    const galleries = await ImageGalleryModel.find(searchQuery).sort({ createdAt: -1 }).lean()
    return galleries.map(transformGalleryDoc)
  } catch (error) {
    console.error("[v0] Error searching galleries:", error)
    return []
  }
}

export async function getGalleries(): Promise<ImageGallery[]> {
  return getAllGalleries()
}

export async function createGallery(data: Omit<ImageGallery, "id" | "createdAt" | "updatedAt">) {
  try {
    await dbConnect()
    let imageURL = data.imageURL

    // Handle image upload if it's base64
    if (imageURL && imageURL.startsWith("data:")) {
      imageURL = await uploadBase64Image(imageURL, `gallery_${Date.now()}.jpg`)
    }

    const gallery = new ImageGalleryModel({
      ...data,
      imageURL,
      id: `gal_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    const saved = await gallery.save()
    return transformGalleryDoc(saved.toObject())
  } catch (error) {
    console.error("[v0] Error creating gallery:", error)
    throw new Error("Failed to create gallery")
  }
}

export async function updateGallery(id: string, data: Omit<ImageGallery, "id" | "createdAt" | "updatedAt">) {
  try {
    await dbConnect()
    let imageURL = data.imageURL

    // Handle image upload if it's base64
    if (imageURL && imageURL.startsWith("data:")) {
      imageURL = await uploadBase64Image(imageURL, `gallery_${Date.now()}.jpg`)
    }

    const updated = await ImageGalleryModel.findOneAndUpdate(
      { id },
      { ...data, imageURL, updatedAt: new Date().toISOString() },
      { new: true },
    )
    return updated ? transformGalleryDoc(updated.toObject()) : null
  } catch (error) {
    console.error("[v0] Error updating gallery:", error)
    throw new Error("Failed to update gallery")
  }
}

export async function deleteGallery(id: string) {
  try {
    await dbConnect()
    await ImageGalleryModel.deleteOne({ id })
    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting gallery:", error)
    throw new Error("Failed to delete gallery")
  }
}
