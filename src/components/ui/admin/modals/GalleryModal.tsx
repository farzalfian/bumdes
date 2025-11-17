"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, AlertCircle, Loader } from "lucide-react"
import type { ImageGallery } from "@/types"

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<ImageGallery, "id" | "createdAt" | "updatedAt">) => void
  image?: ImageGallery | null
  isEditing?: boolean
}

export default function GalleryModal({ isOpen, onClose, onSubmit, image, isEditing = false }: GalleryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    releaseDate: new Date().toISOString().split("T")[0],
    imageURL: "",
  })

  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [previewImage, setPreviewImage] = useState<string>("")

  useEffect(() => {
    if (image) {
      setFormData({
        name: image.name,
        description: image.description,
        releaseDate: image.releaseDate.split("T")[0],
        imageURL: image.imageURL || "",
      })
      setPreviewImage(image.imageURL)
    } else {
      setFormData({
        name: "",
        description: "",
        releaseDate: new Date().toISOString().split("T")[0],
        imageURL: "",
      })
      setPreviewImage("")
    }
    setError("")
  }, [image, isOpen])

  const uploadFile = async (file: File): Promise<string> => {
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("multiple", "false")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const data = await response.json()
      return data.url
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Upload failed")
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError("")

    try {
      const url = await uploadFile(file)
      setFormData({ ...formData, imageURL: url })
      setPreviewImage(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) {
      setError("Please fill in all required fields")
      return
    }
    onSubmit({
      name: formData.name,
      description: formData.description,
      releaseDate: formData.releaseDate,
      imageURL: formData.imageURL,
    })
  }

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            variants={contentVariants}
            className="bg-card rounded-lg border border-border w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
              <h2 className="text-xl font-bold text-foreground">{isEditing ? "Edit Image" : "Add Image"}</h2>
              <motion.button
                onClick={onClose}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-muted rounded-lg transition"
              >
                <X className="w-5 h-5 text-foreground" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Image Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter image name"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter image description"
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Release Date</label>
                <input
                  type="date"
                  value={formData.releaseDate}
                  onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Gallery Image</label>
                {previewImage ? (
                  <motion.div className="relative w-full h-40 rounded-lg overflow-hidden border border-border">
                    <img
                      src={previewImage || "/placeholder.svg"}
                      alt="Gallery"
                      className="w-full h-full object-cover"
                    />
                    <motion.button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, imageURL: "" })
                        setPreviewImage("")
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-2 right-2 p-1 bg-destructive text-white rounded"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <label
                    className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ pointerEvents: uploading ? "none" : "auto" }}
                  >
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {uploading ? <Loader className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                      <span className="text-sm">{uploading ? "Uploading..." : "Click to upload image"}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition font-medium"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium disabled:opacity-50"
                  disabled={uploading}
                >
                  {isEditing ? "Update" : "Create"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
