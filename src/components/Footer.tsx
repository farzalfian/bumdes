'use client'

import React, { useState } from 'react'
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, ChevronRight, Send, ArrowUp, Store } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(true)

  const handleNewsletterSubmit = () => {
    if (email) {
      console.log('Newsletter subscription:', email)
      alert('Terima kasih telah berlangganan!')
      setEmail('')
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-linear-to-b from-primary to-[#3d4f22] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#EFF5D2] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C6D870] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-linier-to-br from-[#8FA31E] to-[#C6D870] rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-[#556B2F]"><Store /></span>
              </div>
              <h3 className="text-2xl font-bold text-[#EFF5D2]">BUMDES</h3>
            </div>
            <p className="text-sm text-[#C6D870] leading-relaxed mb-6">
              Badan Usaha Milik Desa yang berkomitmen untuk mengembangkan ekonomi lokal dan memberdayakan masyarakat desa.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook", color: "hover:bg-blue-600" },
                { icon: Instagram, label: "Instagram", color: "hover:bg-pink-600" },
                { icon: Twitter, label: "Twitter", color: "hover:bg-sky-500" },
              ].map(({ icon: Icon, label, color }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center ${color} transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#EFF5D2] flex items-center gap-2">
              <div className="w-1 h-6 bg-linier-to-b from-[#8FA31E] to-[#C6D870] rounded-full"></div>
              Menu Cepat
            </h4>
            <ul className="space-y-3">
              {["Beranda", "Tentang Kami", "Produk", "Layanan", "Berita", "Kontak"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-[#C6D870] hover:text-[#EFF5D2] transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#8FA31E]" />
                    <span className="relative">
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C6D870] group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#EFF5D2] flex items-center gap-2">
              <div className="w-1 h-6 bg-linier-to-b from-[#8FA31E] to-[#C6D870] rounded-full"></div>
              Hubungi Kami
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-[#C6D870] group hover:text-[#EFF5D2] transition-colors duration-300">
                <div className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:bg-[#8FA31E] transition-all duration-300">
                  <MapPin className="w-5 h-5 text-[#8FA31E] group-hover:text-white transition-colors" />
                </div>
                <span className="pt-2">Jalan Raya Desa, Kecamatan, Kabupaten</span>
              </li>
              <li className="flex gap-3 text-sm text-[#C6D870] group hover:text-[#EFF5D2] transition-colors duration-300">
                <div className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:bg-[#8FA31E] transition-all duration-300">
                  <Phone className="w-5 h-5 text-[#8FA31E] group-hover:text-white transition-colors" />
                </div>
                <a href="tel:+6281234567890" className="pt-2">
                  +62 812 3456 7890
                </a>
              </li>
              <li className="flex gap-3 text-sm text-[#C6D870] group hover:text-[#EFF5D2] transition-colors duration-300">
                <div className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:bg-[#8FA31E] transition-all duration-300">
                  <Mail className="w-5 h-5 text-[#8FA31E] group-hover:text-white transition-colors" />
                </div>
                <a href="mailto:info@bumdes.com" className="pt-2">
                  info@bumdes.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#EFF5D2] flex items-center gap-2">
              <div className="w-1 h-6 bg-linier-to-b from-[#8FA31E] to-[#C6D870] rounded-full"></div>
              Newsletter
            </h4>
            <p className="text-sm text-[#C6D870] mb-4">
              Dapatkan update terbaru tentang produk dan layanan kami
            </p>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Anda"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-[#C6D870] focus:outline-none focus:border-[#C6D870] focus:ring-2 focus:ring-[#C6D870]/20 transition-all duration-300"
                />
              </div>
              <button
                onClick={handleNewsletterSubmit}
                className="w-full px-4 py-3 rounded-lg bg-linear-to-r from-[#8FA31E] to-[#C6D870] text-white font-semibold hover:shadow-lg hover:shadow-[#8FA31E]/30 transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02]"
              >
                <span>Berlangganan</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#C6D870] text-center md:text-left">
              © {currentYear} BUMDES Desa. Semua hak cipta dilindungi.
            </p>
            <div className="flex items-center gap-6 text-sm text-[#C6D870]">
              <a href="#" className="hover:text-[#EFF5D2] transition-colors duration-300">
                Kebijakan Privasi
              </a>
              <span className="text-white/20">•</span>
              <a href="#" className="hover:text-[#EFF5D2] transition-colors duration-300">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-linear-to-r from-[#556B2F] via-[#8FA31E] to-[#556B2F] h-1 animate-pulse"></div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-linear-to-r from-[#8FA31E] to-[#C6D870] text-white shadow-lg hover:shadow-xl hover:shadow-[#8FA31E]/30 transition-all duration-300 flex items-center justify-center group hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </footer>
  )
}