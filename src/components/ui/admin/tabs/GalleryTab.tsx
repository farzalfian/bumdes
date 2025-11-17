"use client"

import { useState, useTransition, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Edit2, Grid3x3, List, Search, Loader2 } from "lucide-react"
import GalleryModal from "../modals/GalleryModal"
import { deleteGallery, updateGallery, createGallery, searchGalleries, getAllGalleries } from "@/lib/actions/galleries"
import { useDebounce } from "@/hooks/use-debounce"
import type { ImageGallery } from "@/types"

interface GalleryTabProps {
  initialGalleries: ImageGallery[]
}

export default function GalleryTab({ initialGalleries }: GalleryTabProps) {
  const [galleries, setGalleries] = useState<ImageGallery[]>(initialGalleries)
  const [searchInput, setSearchInput] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGallery, setSelectedGallery] = useState<ImageGallery | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isSearching, setIsSearching] = useState(false)
  const [isPending, startTransition] = useTransition()

  const debouncedSearchQuery = useDebounce(searchInput, 300)

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSearching(true)
      startTransition(async () => {
        const results = await searchGalleries(debouncedSearchQuery)
        setGalleries(results)
        setIsSearching(false)
      })
    } else {
      setGalleries(initialGalleries)
      setIsSearching(false)
    }
  }, [debouncedSearchQuery, initialGalleries])

  const handleAddGallery = () => {
    setSelectedGallery(null)
    setIsEditing(false)
    setIsModalOpen(true)
  }

  const handleEditGallery = (gallery: ImageGallery) => {
    setSelectedGallery(gallery)
    setIsEditing(true)
    setIsModalOpen(true)
  }

  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return
    try {
      await deleteGallery(id)
      setGalleries(galleries.filter((g) => g.id !== id))
    } catch (error) {
      console.error("[v0] Error deleting gallery:", error)
    }
  }

  const handleModalSubmit = async (data: Omit<ImageGallery, "id" | "createdAt" | "updatedAt">) => {
    try {
      if (isEditing && selectedGallery) {
        await updateGallery(selectedGallery.id, data)
      } else {
        await createGallery(data)
      }
      setIsModalOpen(false)
      // Refresh from server after create/update
      startTransition(async () => {
        const updated = await getAllGalleries()
        setGalleries(updated)
        // Reset search if active
        if (searchInput.trim()) {
          setSearchInput("")
        }
      })
    } catch (error) {
      console.error("[v0] Error saving gallery:", error)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Image Gallery</h2>
          <motion.button
            onClick={handleAddGallery}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Image
          </motion.button>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search images by name or description..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
            {isSearching && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Loader2 className="w-4 h-4 text-primary" />
              </motion.div>
            )}
          </div>

          <div className="flex gap-1 bg-muted p-1 rounded-lg">
            <motion.button
              onClick={() => setViewMode("grid")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded transition ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => setViewMode("list")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded transition ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {galleries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchInput.trim()
              ? "No images found matching your search."
              : "No gallery images yet. Add your first image!"}
          </p>
        </div>
      ) : (
        <>
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {galleries.map((gallery) => (
                  <motion.div
                    key={gallery.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="aspect-square bg-muted overflow-hidden">
                      <img
                        src={gallery.imageURL || "/placeholder.svg"}
                        alt={gallery.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-foreground truncate mb-1">{gallery.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{gallery.description}</p>
                      <p className="text-xs text-muted-foreground mb-3">
                        {new Date(gallery.releaseDate).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleEditGallery(gallery)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center px-2 py-1.5 bg-blue-500/10 text-blue-600 rounded hover:bg-blue-500/20 transition text-xs font-medium"
                        >
                          <Edit2 className="w-3 h-3" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeleteGallery(gallery.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center px-2 py-1.5 bg-destructive/10 text-destructive rounded hover:bg-destructive/20 transition text-xs font-medium"
                        >
                          <Trash2 className="w-3 h-3" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {viewMode === "list" && (
            <div className="space-y-2">
              <AnimatePresence>
                {galleries.map((gallery) => (
                  <motion.div
                    key={gallery.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:shadow-md transition"
                  >
                    <img
                      src={gallery.imageURL || "/placeholder.svg"}
                      alt={gallery.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground truncate">{gallery.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{gallery.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(gallery.releaseDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleEditGallery(gallery)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-blue-500/10 text-blue-600 rounded hover:bg-blue-500/20 transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteGallery(gallery.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-destructive/10 text-destructive rounded hover:bg-destructive/20 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </>
      )}

      <GalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        image={selectedGallery}
        isEditing={isEditing}
      />
    </motion.div>
  )
}
