"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Leaf, Users, Award, Heart, ShoppingBag } from "lucide-react"
import { Product } from "@/types"
import { Button } from "./ui/button"
import { useToast } from "@/hooks/use-toast"

export default function HomeClient({ products, total, currentPage, pageSize }: {
  products: Product[]
  total: number
  currentPage: number
  pageSize: number
}) {
  const { toast } = useToast()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const heroSlides = [
    {
      title: "Produk Lokal Desa",
      subtitle: "Kualitas terbaik dari masyarakat desa, untuk seluruh Indonesia",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop"
    },
    {
      title: "Hasil Petani & UMKM Pilihan",
      subtitle: "Sumber pangan, kerajinan, dan produk unggulan desa",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=600&fit=crop"
    },
    {
      title: "Belanja Resmi & Terjamin",
      subtitle: "Platform marketplace desa yang aman dan terpercaya",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop"
    }
  ]

  const features = [
    { icon: Leaf, title: "Produk Alami", description: "Langsung diproduksi oleh warga desa" },
    { icon: Users, title: "UMKM Desa", description: "Dukung usaha kecil menengah di seluruh desa" },
    { icon: Award, title: "Kualitas Terpilih", description: "Setiap produk melalui proses kurasi" },
    { icon: Heart, title: "Aman & Terpercaya", description: "Transaksi resmi dikelola lembaga desa" }
  ]

  const totalPages = Math.ceil(total / pageSize)

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
    <div className="min-h-screen bg-linear-to-r from-white to-[#F5F8E8]">
      <section className="relative h-[550px] md:h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <AnimatePresence key={index}>
            {currentSlide === index && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className="absolute inset-0 bg-linear-to-r from-[#556B2F]/90 via-[#556B2F]/70 to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-[#C6D870]" />
              <span className="text-[#C6D870] font-semibold">Platform Resmi Desa</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-[#EFF5D2] mb-6">
              {heroSlides[currentSlide].subtitle}
            </p>

            <Link
              href="/products"
              className="inline-flex px-7 py-3 bg-linear-to-r from-[#8FA31E] to-[#C6D870] text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 items-center gap-2"
            >
              Belanja Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#EFF5D2]/40"
              >
                <div className="w-14 h-14 bg-linear-to-r from-[#8FA31E] to-[#C6D870] rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#556B2F] mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#556B2F] mb-3">Produk Unggulan</h2>
            <p className="text-gray-600 max-w-xl mx-auto text-base md:text-lg">
              Jelajahi produk lokal terbaik pilihan dari masyarakat desa
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-card border border-border rounded-xl overflow-hidden shadow hover:shadow-lg transition-all"
                >
                  <Link
                    href={`/products/${product.id}`}
                    className="bg-white h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-1/2 md:h-56 overflow-hidden">
                      <Image
                        src={product.thumbnailURL || product.imageURL[0]}
                        alt={product.name}
                        height={1080}
                        width={1080}
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-[#8FA31E] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {product.category}
                      </div>
                    </div>

                    <div className="p-4 flex flex-col justify-between h-1/2">
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-[#556B2F] mb-1 line-clamp-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-2">
                        <div>
                          <span className="text-xs text-gray-500">Stok</span>
                          <p className="text-sm font-semibold text-[#556B2F]">{product.stockAmount} pcs</p>
                        </div>

                        <div className="relative group">
                          <Button
                            onClick={(e) => {
                              e.preventDefault()
                              handleAddToCart(product.id)
                            }}
                            className="w-10 h-10 cursor-pointer rounded-full flex items-center justify-center bg-linear-to-r from-[#8FA31E] to-[#C6D870] text-white shadow-md transition-all duration-200 group-hover:scale-110"
                          >
                            <ShoppingBag className="w-5 h-5" />
                          </Button>

                          <span className="absolute top-1/2 -translate-y-1/2 right-12 bg-[#556B2F] text-white text-xs px-3 py-1 rounded-full opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-md">
                            Tambahkan produk
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center gap-4 mt-10">
            <Link
              href={`/?page=${currentPage - 1}&max=${pageSize}`}
              className={`px-4 py-2 rounded-full bg-[#8FA31E] text-white flex items-center gap-2 ${
                currentPage <= 1 ? "pointer-events-none opacity-50" : "hover:brightness-110"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Prev
            </Link>

            <span className="text-[#556B2F] font-semibold">
              {currentPage} / {totalPages}
            </span>

            <Link
              href={`/?page=${currentPage + 1}&max=${pageSize}`}
              className={`px-4 py-2 rounded-full bg-[#8FA31E] text-white flex items-center gap-2 ${
                currentPage >= totalPages ? "pointer-events-none opacity-50" : "hover:brightness-110"
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
