"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, ImageIcon } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  category: string
  stockStatus: boolean
  stockAmount: number
  thumbnailURL: string
  imageURL: string[]
  createdAt: string
  updatedAt: string
}

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => void
  product?: Product | null
  isEditing?: boolean
}

export default function ProductModal({ isOpen, onClose, onSubmit, product, isEditing = false }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    stockStatus: true,
    stockAmount: 0,
    thumbnailURL: "",
    imageURL: [] as string[],
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category,
        stockStatus: product.stockStatus,
        stockAmount: product.stockAmount,
        thumbnailURL: product.thumbnailURL,
        imageURL: product.imageURL,
      })
    } else {
      setFormData({
        name: "",
        description: "",
        category: "",
        stockStatus: true,
        stockAmount: 0,
        thumbnailURL: "",
        imageURL: [],
      })
    }
  }, [product, isOpen])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isThumb: boolean) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        if (isThumb) {
          setFormData({ ...formData, thumbnailURL: base64 })
        } else {
          setFormData({ ...formData, imageURL: [...formData.imageURL, base64] })
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      imageURL: formData.imageURL.filter((_, i) => i !== index),
    })
  }

  const removeThumbnail = () => {
    setFormData({ ...formData, thumbnailURL: "" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.category) {
      alert("Please fill in all required fields")
      return
    }
    onSubmit(formData)
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
            className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
              <h2 className="text-xl font-bold text-foreground">{isEditing ? "Edit Product" : "Add Product"}</h2>
              <motion.button
                onClick={onClose}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-muted rounded-lg transition"
              >
                <X className="w-5 h-5 text-foreground" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product description"
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                >
                  <option value="">Select a category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                  <option value="Home">Home</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Stock Amount</label>
                <input
                  type="number"
                  value={formData.stockAmount}
                  onChange={(e) => setFormData({ ...formData, stockAmount: Number.parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="stockStatus"
                  checked={formData.stockStatus}
                  onChange={(e) => setFormData({ ...formData, stockStatus: e.target.checked })}
                  className="w-4 h-4 rounded border-border focus:ring-primary"
                />
                <label htmlFor="stockStatus" className="text-sm font-medium text-foreground cursor-pointer">
                  In Stock
                </label>
              </div>

              <div className="border-t border-border pt-4">
                <label className="block text-sm font-medium text-foreground mb-3">Product Thumbnail</label>
                {formData.thumbnailURL ? (
                  <motion.div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                    <img
                      src={formData.thumbnailURL || "/placeholder.svg"}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <motion.button
                      type="button"
                      onClick={removeThumbnail}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-2 right-2 p-1 bg-destructive text-white rounded opacity-0 hover:opacity-100 transition"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Upload className="w-5 h-5" />
                      <span className="text-sm">Click to upload thumbnail</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, true)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="border-t border-border pt-4">
                <label className="block text-sm font-medium text-foreground mb-3">Product Images</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <AnimatePresence>
                    {formData.imageURL.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative w-full aspect-square rounded-lg overflow-hidden border border-border group"
                      >
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Product ${idx}`}
                          className="w-full h-full object-cover"
                        />
                        <motion.button
                          type="button"
                          onClick={() => removeImage(idx)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition"
                        >
                          <X className="w-5 h-5 text-white" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ImageIcon className="w-5 h-5" />
                    <span className="text-sm">Click to upload product images</span>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, false)}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
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
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
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
