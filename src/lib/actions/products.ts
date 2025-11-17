/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import dbConnect from "@/database/mongodb"
import ProductModel from "@/database/models/Product"
import type { Product } from "@/types"
import { uploadBase64Image, uploadBase64Images } from "./file-actions"

function transformProductDoc(doc: any): Product {
  return {
    id: doc.id || doc._id?.toString() || "",
    name: doc.name,
    description: doc.description,
    category: doc.category,
    thumbnailURL: doc.thumbnailURL,
    imageURL: doc.imageURL || [],
    stockStatus: doc.stockStatus,
    stockAmount: doc.stockAmount,
    createdAt: typeof doc.createdAt === "string" ? doc.createdAt : doc.createdAt?.toISOString() || "",
    updatedAt: typeof doc.updatedAt === "string" ? doc.updatedAt : doc.updatedAt?.toISOString() || "",
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    await dbConnect()
    const products = await ProductModel.find({}).sort({ createdAt: -1 }).lean()
    return products.map(transformProductDoc)
  } catch (error) {
    console.error("Error fetching all products:", error)
    return []
  }
}

export async function searchProducts(options: {
  search?: string;
  category?: string;
  page?: number;
  max?: number;
}): Promise<{ data: Product[]; total: number; page: number; max: number }> {
  try {
    await dbConnect()

    const { search = "", category = "", page = 1, max = 10 } = options

    const query: any = {}

    if (search.trim() !== "") {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ]
    }

    if (category.trim() !== "") {
      query.category = { $regex: category, $options: "i" }
    }

    const skip = (page - 1) * max

    const [products, total] = await Promise.all([
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(max)
        .lean(),

      ProductModel.countDocuments(query),
    ])

    return {
      data: products.map(transformProductDoc),
      total,
      page,
      max,
    }
  } catch (error) {
    console.error("Error searching products:", error)
    return { data: [], total: 0, page: 1, max: 10 }
  }
}

export async function createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">) {
  try {
    await dbConnect()
    let thumbnailURL = data.thumbnailURL
    let imageURLs = data.imageURL

    if (thumbnailURL && thumbnailURL.startsWith("data:")) {
      thumbnailURL = await uploadBase64Image(thumbnailURL, `thumbnail_${Date.now()}.jpg`)
    }

    if (imageURLs && imageURLs.length > 0) {
      const base64Images = imageURLs.filter((url) => url.startsWith("data:"))
      if (base64Images.length > 0) {
        const uploadedUrls = await uploadBase64Images(
          base64Images.map((img, idx) => ({ data: img, name: `product_${Date.now()}_${idx}.jpg` })),
        )
        imageURLs = imageURLs.map((url) => (url.startsWith("data:") ? uploadedUrls.shift() || url : url))
      }
    }

    const product = new ProductModel({
      ...data,
      thumbnailURL,
      imageURL: imageURLs,
      id: `prod_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    const saved = await product.save()
    return transformProductDoc(saved.toObject())
  } catch (error) {
    console.error("Error creating product:", error)
    throw new Error("Failed to create product")
  }
}

export async function updateProduct(id: string, data: Omit<Product, "id" | "createdAt" | "updatedAt">) {
  try {
    await dbConnect()
    let thumbnailURL = data.thumbnailURL
    let imageURLs = data.imageURL

    if (thumbnailURL && thumbnailURL.startsWith("data:")) {
      thumbnailURL = await uploadBase64Image(thumbnailURL, `thumbnail_${Date.now()}.jpg`)
    }

    if (imageURLs && imageURLs.length > 0) {
      const base64Images = imageURLs.filter((url) => url.startsWith("data:"))
      if (base64Images.length > 0) {
        const uploadedUrls = await uploadBase64Images(
          base64Images.map((img, idx) => ({ data: img, name: `product_${Date.now()}_${idx}.jpg` })),
        )
        imageURLs = imageURLs.map((url) => (url.startsWith("data:") ? uploadedUrls.shift() || url : url))
      }
    }

    const updated = await ProductModel.findOneAndUpdate(
      { id },
      {
        ...data,
        thumbnailURL,
        imageURL: imageURLs,
        updatedAt: new Date().toISOString(),
      },
      { new: true },
    )
    return updated ? transformProductDoc(updated.toObject()) : null
  } catch (error) {
    console.error("Error updating product:", error)
    throw new Error("Failed to update product")
  }
}

export async function deleteProduct(id: string) {
  try {
    await dbConnect()
    await ProductModel.deleteOne({ id })
    return { success: true }
  } catch (error) {
    console.error("Error deleting product:", error)
    throw new Error("Failed to delete product")
  }
}
