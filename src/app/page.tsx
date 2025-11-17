"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles, Users, Award, ShoppingBag, Leaf, Heart } from "lucide-react"
import PageTransition from "@/components/PageTransition"
import { Product } from "@/types"
import font from "@/lib/font";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    
    fetchProducts()
    
    return () => clearInterval(interval)
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products?limit=4')
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      
      const data = await response.json()
      setProducts(data.products || data)
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const heroSlides = [
    {
      title: "Memberdayakan Ekonomi Desa",
      subtitle: "Bersama membangun kesejahteraan masyarakat desa",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop"
    },
    {
      title: "Produk Berkualitas dari Desa",
      subtitle: "Langsung dari tangan petani lokal untuk Anda",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=600&fit=crop"
    },
    {
      title: "Dukung UMKM Lokal",
      subtitle: "Setiap pembelian Anda membantu ekonomi desa",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop"
    }
  ]

  const features = [
    {
      icon: Leaf,
      title: "Produk Alami",
      description: "100% organik dan ramah lingkungan"
    },
    {
      icon: Users,
      title: "Dari Petani Lokal",
      description: "Langsung dari tangan petani desa"
    },
    {
      icon: Award,
      title: "Kualitas Terjamin",
      description: "Produk terpilih dengan standar tinggi"
    },
    {
      icon: Heart,
      title: "Pemberdayaan Desa",
      description: "Membantu ekonomi masyarakat desa"
    }
  ]

  const stats = [
    { number: "500+", label: "Produk Lokal" },
    { number: "1000+", label: "Petani Mitra" },
    { number: "5000+", label: "Pelanggan Puas" },
    { number: "15+", label: "Desa Binaan" }
  ]

  return (
    <PageTransition>
      <main className={`min-h-screen bg-linear-to-b from-white to-[#F5F8E8] ${font.primary}`}>
        {/* Hero Section */}
        <section className="relative h-[600px] overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-linear-to-r from-[#556B2F]/95 via-[#556B2F]/80 to-transparent" />
            </div>
          ))}

          <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className={`max-w-2xl transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-[#C6D870]" />
                <span className="text-[#C6D870] font-semibold">BUMDES</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl text-[#EFF5D2] mb-8 leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="group px-8 py-4 bg-linear-to-r from-[#8FA31E] to-[#C6D870] text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-[#8FA31E]/40 transition-all duration-300 flex items-center gap-2 hover:scale-105"
                >
                  Belanja Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? "w-12 h-3 bg-[#C6D870]"
                    : "w-3 h-3 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#EFF5D2]/20"
                >
                  <div className="w-14 h-14 bg-linear-to-br from-[#8FA31E] to-[#C6D870] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#556B2F] mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-[#556B2F] via-[#6B7F35] to-[#556B2F] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#C6D870] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8FA31E] rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#C6D870] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-[#EFF5D2] font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#556B2F] mb-4">Produk Unggulan</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Pilihan terbaik produk lokal berkualitas tinggi dari petani dan UMKM desa
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                    <div className="h-64 bg-gray-200"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden h-64">
                      <img
                        src={product.thumbnailURL || product.imageURL[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-[#8FA31E] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {product.category}
                      </div>
                      {!product.stockStatus && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                            Stok Habis
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-[#556B2F] mb-2 group-hover:text-[#8FA31E] transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Stok</span>
                          <span className="text-sm font-semibold text-[#556B2F]">
                            {product.stockAmount} pcs
                          </span>
                        </div>
                        <button 
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                            product.stockStatus
                              ? "bg-linear-to-br from-[#8FA31E] to-[#C6D870] text-white hover:scale-110"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                          onClick={(e) => {
                            e.preventDefault()
                            if (product.stockStatus) {
                              console.log('Add to cart:', product.id)
                            }
                          }}
                          disabled={!product.stockStatus}
                        >
                          <ShoppingBag className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">Belum ada produk tersedia</p>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#8FA31E] to-[#C6D870] text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300"
                >
                  Tambah Produk
                </Link>
              </div>
            )}

            {products.length > 0 && (
              <div className="text-center">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#8FA31E] to-[#C6D870] text-white font-semibold rounded-full hover:shadow-xl hover:shadow-[#8FA31E]/30 transition-all duration-300 hover:scale-105"
                >
                  Lihat Semua Produk
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </PageTransition>
  )
}