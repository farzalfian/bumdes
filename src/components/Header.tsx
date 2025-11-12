"use client"

import { useState, useEffect } from "react"
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState("Beranda")
  
  // Mock cart - replace with actual cart context
  const cart = []
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Tentang Kami", href: "/about" },
    { label: "Produk", href: "/products" },
  ]

  return (
    <nav 
      className={`bg-primary text-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "shadow-2xl shadow-black/20 backdrop-blur-md bg-primary/95" 
          : "shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}>
          {/* Logo Section */}
          <a 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary via-tertiary to-secondary rounded-lg flex items-center justify-center font-bold text-primary shadow-lg group-hover:shadow-secondary/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <span className="text-lg">B</span>
              </div>
              <div className="absolute inset-0 bg-secondary/30 rounded-lg blur-md group-hover:blur-lg transition-all duration-300 -z-10"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white group-hover:text-secondary transition-colors duration-300">
                BUMDES
              </h1>
              <p className="text-xs text-tertiary group-hover:text-quatenary transition-colors duration-300">
                Badan Usaha Milik Desa
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveItem(item.label)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                  activeItem === item.label
                    ? "text-secondary"
                    : "text-quatenary hover:text-secondary"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {activeItem === item.label && (
                  <span className="absolute inset-0 bg-secondary/10 rounded-lg"></span>
                )}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-secondary group-hover:w-3/4 transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart Button */}
            <a
              href="/cart"
              className="relative p-2.5 text-quatenary hover:text-secondary transition-all duration-300 hover:scale-110 group"
            >
              <ShoppingCart size={scrolled ? 20 : 24} className="transition-all duration-300" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-secondary to-tertiary text-[#556B2F] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse">
                  {cartItemCount}
                </span>
              )}
              <span className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 rounded-full transition-colors duration-300"></span>
            </a>
          </div>

          {/* Mobile Right Section */}
          <div className="md:hidden flex items-center gap-2">
            {/* Cart Button Mobile */}
            <a
              href="/cart"
              className="relative p-2 text-quatenary hover:text-secondary transition-all duration-300 group"
            >
              <ShoppingCart size={20} className="transition-all duration-300" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-secondary to-tertiary text-[#556B2F] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative p-2 text-quatenary hover:text-secondary transition-all duration-300 group"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                }`}></span>
                <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}></span>
                <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-80" : "max-h-0"
          }`}
        >
          <div className="border-t border-secondary/30 bg-gradient-to-b from-[#556B2F] to-[#4a5f27]">
            <div className="px-3 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden ${
                    activeItem === item.label
                      ? "bg-secondary text-[#556B2F]"
                      : "text-quatenary hover:bg-secondary/10 hover:text-secondary"
                  }`}
                  onClick={() => {
                    setIsOpen(false)
                    setActiveItem(item.label)
                  }}
                >
                  <span className="relative z-10 flex items-center justify-between">
                    {item.label}
                    <ChevronDown className="w-4 h-4 -rotate-90 transition-transform duration-200" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </nav>
  )
}