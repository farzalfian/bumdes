"use client"

import Link from "next/link"
import { Home, MapPin } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-[#EFF5D2] to-[#C6D870]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#8FA31E] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#556B2F] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-9xl md:text-[150px] font-bold text-[#556B2F] leading-none">404</h1>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#556B2F] mb-4 text-balance">Halaman Tidak Ditemukan</h2>

        {/* Description */}
        <p className="text-lg text-[#556B2F] opacity-80 mb-8 max-w-md text-pretty">
          Maaf, halaman yang Anda cari tidak tersedia. Silakan kembali ke halaman utama atau jelajahi menu kami.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#556B2F] hover:bg-[#8FA31E] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Home size={20} />
            Kembali ke Beranda
          </Link>
          <Link
            href="#"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#8FA31E] hover:bg-[#556B2F] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <MapPin size={20} />
            Hubungi Kami
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t-2 border-[#8FA31E] border-opacity-30">
          <p className="text-sm text-[#556B2F] opacity-70 mb-4">Butuh bantuan? Silakan hubungi tim kami</p>
          <a
            href="mailto:support@bumdes.local"
            className="text-[#8FA31E] hover:text-[#556B2F] font-semibold underline transition-colors"
          >
            support@bumdes.local
          </a>
        </div>
      </div>
    </main>
  )
}
