"use client"

import { useState, useTransition, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Edit2, Grid3x3, List, Search, Loader2 } from "lucide-react"
import ProductModal from "../modals/ProductModal"
import { deleteProduct, createProduct, updateProduct, searchProducts, getAllProducts } from "@/lib/actions/products"
import { useDebounce } from "@/hooks/use-debounce"
import type { Product } from "@/types"
import Image from "next/image"

interface ProductsTabProps {
  initialProducts: Product[]
}

export default function ProductsTab({ initialProducts }: ProductsTabProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchInput, setSearchInput] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
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
        const results = await searchProducts(debouncedSearchQuery)
        setProducts(results)
        setIsSearching(false)
      })
    } else {
      setProducts(initialProducts)
      setIsSearching(false)
    }
  }, [debouncedSearchQuery, initialProducts])

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setIsEditing(false)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsEditing(true)
    setIsModalOpen(true)
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    try {
      await deleteProduct(id)
      setProducts(products.filter((p) => p.id !== id))
    } catch (error) {
      console.error("[v0] Error deleting product:", error)
    }
  }

  const handleModalSubmit = async (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    try {
      if (isEditing && selectedProduct) {
        await updateProduct(selectedProduct.id, data)
      } else {
        await createProduct(data)
      }
      setIsModalOpen(false)
      // Refresh from server after create/update
      startTransition(async () => {
        const updated = await getAllProducts()
        setProducts(updated)
        // Reset search if active
        if (searchInput.trim()) {
          setSearchInput("")
        }
      })
    } catch (error) {
      console.error("[v0] Error saving product:", error)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Products</h2>
          <motion.button
            onClick={handleAddProduct}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </motion.button>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products by name, description, or category..."
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

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchInput.trim()
              ? "No products found matching your search."
              : "No products yet. Create your first product!"}
          </p>
        </div>
      ) : (
        <>
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="aspect-video bg-muted overflow-hidden">
                      <Image
                        src={product.thumbnailURL || "/placeholder.svg"}
                        alt={product.name}
                        height={1080}
                        width={1080}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-foreground truncate mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs px-2 py-1 bg-muted rounded text-foreground">{product.category}</span>
                        <span className="text-xs font-medium">
                          {product.stockStatus ? (
                            <span className="text-green-600">In Stock</span>
                          ) : (
                            <span className="text-red-600">Out of Stock</span>
                          )}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleEditProduct(product)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/10 text-blue-600 rounded hover:bg-blue-500/20 transition text-sm font-medium"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeleteProduct(product.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-destructive/10 text-destructive rounded hover:bg-destructive/20 transition text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
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
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:shadow-md transition"
                  >
                    <Image
                      src={product.thumbnailURL || "/placeholder.svg"}
                      alt={product.name}
                      height={1080}
                      width={1080}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground truncate">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-muted rounded text-foreground">{product.category}</span>
                        <span className="text-xs font-medium">
                          {product.stockStatus ? (
                            <span className="text-green-600">In Stock ({product.stockAmount})</span>
                          ) : (
                            <span className="text-red-600">Out of Stock</span>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleEditProduct(product)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-blue-500/10 text-blue-600 rounded hover:bg-blue-500/20 transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteProduct(product.id)}
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

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        product={selectedProduct}
        isEditing={isEditing}
      />
    </motion.div>
  )
}
