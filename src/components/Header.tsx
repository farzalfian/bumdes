"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, ChevronDown, Store } from "lucide-react"
import { Button } from "./ui/button"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState("Beranda")

  const cart: number[] = []
  const cartItemCount = cart.reduce((t, i) => t + i.quantity, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
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
          ? "shadow-2xl shadow-black/15 backdrop-blur-lg bg-primary/90"
          : "shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all duration-300 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-linear-to-br from-secondary via-tertiary to-secondary rounded-xl flex items-center justify-center font-bold text-primary shadow-lg group-hover:scale-110 transition-all">
                <span className="text-lg"><Store /></span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold group-hover:text-secondary transition-colors">
                BUMDES KUTABIMA
              </h1>
              <p className="text-xs text-tertiary">Badan Usaha Milik Desa Kutabima</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setActiveItem(item.label)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
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
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/cart"
              className="relative p-2.5 text-quatenary hover:text-secondary transition-all group"
            >
              <ShoppingCart
                size={scrolled ? 20 : 24}
                className="transition-all duration-300"
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/cart"
              className="relative p-2 text-quatenary hover:text-secondary group"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-quatenary hover:text-secondary transition-all bg-transparent"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-1/2 w-full h-0.5 bg-current transition-all duration-300 ${
                    isOpen ? "rotate-45" : "-translate-y-2"
                  }`}
                ></span>
                <span
                  className={`absolute top-1/2 w-full h-0.5 bg-current transition-all duration-300 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`absolute top-1/2 w-full h-0.5 bg-current transition-all duration-300 ${
                    isOpen ? "-rotate-45" : "translate-y-2"
                  }`}
                ></span>
              </div>
            </Button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-80" : "max-h-0"
          }`}
        >
          <div className="border-t border-secondary/30 bg-primary/40 backdrop-blur-xl">
            <div className="px-3 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false)
                    setActiveItem(item.label)
                  }}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeItem === item.label
                      ? "bg-secondary text-primary"
                      : "text-quatenary hover:bg-secondary/10 hover:text-secondary"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {item.label}
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
