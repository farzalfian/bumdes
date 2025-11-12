"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit2, Trash2, Search, ImageIcon } from "lucide-react"
import GalleryModal from "@/components/ui/admin/modals/GalleryModal"
import { ImageGallery } from "@/types"

export default function GalleryTab() {
  const [gallery, setGallery] = useState<ImageGallery[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<ImageGallery | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("gallery")
    if (saved) {
      setGallery(JSON.parse(saved))
    }
  }, [])

  const saveGallery = (newGallery: ImageGallery[]) => {
    setGallery(newGallery)
    localStorage.setItem("gallery", JSON.stringify(newGallery))
  }

  const handleAddImage = (data: Omit<ImageGallery, "id" | "createdAt" | "updatedAt">) => {
    const newImage: ImageGallery = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    saveGallery([...gallery, newImage])
    setIsModalOpen(false)
  }

  const handleUpdateImage = (data: Omit<ImageGallery, "id" | "createdAt" | "updatedAt">) => {
    if (!selectedImage) return
    const updated = gallery.map((img) =>
      img.id === selectedImage.id ? { ...img, ...data, updatedAt: new Date().toISOString() } : img,
    )
    saveGallery(updated)
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  const handleDeleteImage = (id: string) => {
    saveGallery(gallery.filter((img) => img.id !== id))
  }

  const filteredGallery = gallery.filter(
    (img) =>
      img.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gallery</h2>
          <p className="text-muted-foreground mt-1">{filteredGallery.length} images</p>
        </div>
        <motion.button
          onClick={() => {
            setSelectedImage(null)
            setIsModalOpen(true)
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition font-medium w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </motion.button>
      </motion.div>

      <motion.div variants={itemVariants} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search gallery..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
        />
      </motion.div>

      {filteredGallery.length === 0 ? (
        <motion.div variants={itemVariants} className="bg-card rounded-lg border border-border p-8 text-center">
          <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No images found. Add one to get started!</p>
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredGallery.map((image) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                exit="exit"
                className="bg-card rounded-lg border border-border overflow-hidden group hover:shadow-lg transition"
              >
                <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
                  {image.imageURL ? (
                    <img
                      src={image.imageURL || "/placeholder.svg"}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-muted-foreground" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    <motion.button
                      onClick={() => {
                        setSelectedImage(image)
                        setIsModalOpen(true)
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                    >
                      <Edit2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteImage(image.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground truncate">{image.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{image.description}</p>
                  <p className="text-xs text-muted-foreground mt-3">
                    Released: {new Date(image.releaseDate).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <GalleryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedImage(null)
        }}
        onSubmit={selectedImage ? handleUpdateImage : handleAddImage}
        image={selectedImage}
        isEditing={!!selectedImage}
      />
    </motion.div>
  )
}
