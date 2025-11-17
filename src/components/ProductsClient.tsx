"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Plus } from "lucide-react"
import { Product } from "@/types"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Kopi Desa Premium",
    description: "Kopi asli desa dengan cita rasa khas, dipetik langsung dari kebun.",
    category: "Food",
    thumbnailURL: "/placeholder.svg",
    imageURL: [],
    stockStatus: true,
    stockAmount: 42,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Kerajinan Tangan Rotan",
    description: "Produk rotan berkualitas tinggi buatan pengrajin lokal.",
    category: "Craft",
    thumbnailURL: "/placeholder.svg",
    imageURL: [],
    stockStatus: true,
    stockAmount: 13,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    name: "Beras Organik Premium",
    description: "Beras organik kualitas super, langsung dari petani.",
    category: "Food",
    thumbnailURL: "/placeholder.svg",
    imageURL: [],
    stockStatus: false,
    stockAmount: 0,
    createdAt: "",
    updatedAt: "",
  },
]

export default function ProductsPage() {
  const [query, setQuery] = useState("")
  const filtered = dummyProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  )

  const slugify = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")

  const handleAddToCart = (product: Product) => {
    
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Produk Kami</h1>
          <p className="text-muted-foreground mt-1">Temukan produk terbaik dari BUMDES</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-input border border-border focus:ring-2 focus:ring-primary/50 outline-none transition"
            />
          </div>

          <Button className="p-2.5 rounded-lg bg-muted border border-border hover:bg-muted/70 transition">
            <Filter className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">Tidak ada produk ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-card border border-border rounded-xl overflow-hidden shadow hover:shadow-lg transition-all group"
              >
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={product.thumbnailURL}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 flex flex-col gap-3">
                  <h3 className="font-bold text-lg text-foreground truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 rounded bg-secondary/20 text-secondary font-medium">
                      {product.category}
                    </span>

                    {product.stockStatus ? (
                      <span className="text-xs text-green-600 font-medium">Tersedia</span>
                    ) : (
                      <span className="text-xs text-destructive font-medium">Habis</span>
                    )}
                  </div>

                  <div className="flex gap-2 mt-2">
                    <a
                      href={`/products/${slugify(product.name)}`}
                      className="flex-1 py-2 rounded-lg bg-muted border border-border text-sm text-foreground hover:bg-muted/60 transition text-center"
                    >
                      Detail
                    </a>

                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 py-2 cursor-pointer rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition"
                    >
                      <Plus className="w-4 h-4" />
                      Keranjang
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}