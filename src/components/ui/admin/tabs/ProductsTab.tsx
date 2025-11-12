"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit2, Trash2, Search } from "lucide-react"
import ProductModal from "@/components/ui/admin/modals/ProductModal"
import { Product } from "@/types"

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("products")
    if (saved) {
      setProducts(JSON.parse(saved))
    }
  }, [])

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts)
    localStorage.setItem("products", JSON.stringify(newProducts))
  }

  const handleAddProduct = (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    const newProduct: Product = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    saveProducts([...products, newProduct])
    setIsModalOpen(false)
  }

  const handleUpdateProduct = (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    if (!selectedProduct) return
    const updated = products.map((p) =>
      p.id === selectedProduct.id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p,
    )
    saveProducts(updated)
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleDeleteProduct = (id: string) => {
    saveProducts(products.filter((p) => p.id !== id))
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
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
          <h2 className="text-2xl font-bold text-foreground">Products</h2>
          <p className="text-muted-foreground mt-1">{filteredProducts.length} products</p>
        </div>
        <motion.button
          onClick={() => {
            setSelectedProduct(null)
            setIsModalOpen(true)
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition font-medium w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </motion.button>
      </motion.div>

      <motion.div variants={itemVariants} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
        />
      </motion.div>

      {filteredProducts.length === 0 ? (
        <motion.div variants={itemVariants} className="bg-card rounded-lg border border-border p-8 text-center">
          <p className="text-muted-foreground">No products found. Create one to get started!</p>
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ y: -4 }}
                className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition duration-300"
              >
                {product.thumbnailURL && (
                  <div className="w-full h-48 bg-muted overflow-hidden">
                    <img
                      src={product.thumbnailURL || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{product.category}</span>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        product.stockStatus
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100"
                          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100"
                      }`}
                    >
                      {product.stockStatus ? "In Stock" : "Out"}
                    </span>
                  </div>

                  <div className="text-sm text-foreground">
                    Stock: <span className="font-semibold">{product.stockAmount}</span>
                  </div>

                  {product.imageURL.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {product.imageURL.map((img, idx) => (
                        <img
                          key={idx}
                          src={img || "/placeholder.svg"}
                          alt={`${product.name} ${idx}`}
                          className="w-16 h-16 rounded object-cover flex-shrink-0"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 pt-3 border-t border-border">
                    <motion.button
                      onClick={() => {
                        setSelectedProduct(product)
                        setIsModalOpen(true)
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition text-sm font-medium"
                    >
                      <Edit2 className="w-4 h-4 inline mr-2" />
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteProduct(product.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-3 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4 inline mr-2" />
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProduct(null)
        }}
        onSubmit={selectedProduct ? handleUpdateProduct : handleAddProduct}
        product={selectedProduct}
        isEditing={!!selectedProduct}
      />
    </motion.div>
  )
}
