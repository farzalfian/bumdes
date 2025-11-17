"use client"

import { useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Product } from '@/types/index';
import { useToast } from "@/hooks/use-toast"

interface ProductsClientProps {
  products: Product[],
  total: number,
  pageSize: number,
  currentPage: number,
  search: string,
  category: string,
}

export default function ProductsClient({
  products,
  total,
  pageSize,
  currentPage,
  search,
  category,
}: ProductsClientProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [query, setQuery] = useState(search)

  const handleSearch = (v: string) => {
    setQuery(v)
    const params = new URLSearchParams()
    if (v) params.set("search", v)
    if (category) params.set("category", category)
    params.set("page", "1")
    params.set("max", pageSize.toString())
    router.push("/products?" + params.toString())
  }

  const totalPages = Math.ceil(total / pageSize)

  const goToPage = (p: number) => {
    const params = new URLSearchParams()
    if (query) params.set("search", query)
    if (category) params.set("category", category)
    params.set("page", p.toString())
    params.set("max", pageSize.toString())
    router.push("/products?" + params.toString())
  }

  const slugify = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")

  const handleAddToCart = useCallback(
    (id: string) => {
      const stored = localStorage.getItem("products")
      const list: string[] = stored ? JSON.parse(stored) : []
      if (!list.includes(id)) list.push(id)
      localStorage.setItem("products", JSON.stringify(list))

      toast({
        title: "Berhasil",
        description: "Produk telah dimasukkan ke keranjang.",
        duration: 2500,
      })
    },
    [toast]
  )

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
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Cari produk..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-input border border-border"
            />
          </div>

          <Button className="p-2.5 rounded-lg bg-muted border border-border hover:bg-muted/70 transition">
            <Filter className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">Tidak ada produk ditemukan.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-card border border-border rounded-xl overflow-hidden shadow hover:shadow-lg transition-all group flex flex-col"
                >
                  <div className="aspect-video bg-muted overflow-hidden h-1/2">
                    <Image
                      src={product.thumbnailURL}
                      alt={product.name}
                      height={1080}
                      width={1080}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex flex-col justify-between h-1/2 grow">
                    <div className="flex flex-col">
                      <h3 className="font-bold text-lg text-foreground truncate">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
                    </div>

                    <div className="flex flex-col mt-auto">
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

                      <div className="flex gap-2 mt-3">
                        <a
                          href={`/products/${slugify(product.name)}`}
                          className="flex-1 py-2 rounded-lg bg-muted border border-border text-sm text-foreground hover:bg-muted/60 transition text-center"
                        >
                          Detail
                        </a>

                        <Button
                          onClick={() => handleAddToCart(product.id)}
                          className="flex-1 py-2 cursor-pointer rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition"
                        >
                          <Plus className="w-4 h-4" />
                          Keranjang
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Button
              disabled={currentPage <= 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              Prev
            </Button>

            <span className="text-sm text-muted-foreground">
              {currentPage} / {totalPages}
            </span>

            <Button
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
