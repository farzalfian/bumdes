"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LogOut, Package, Images, SettingsIcon } from "lucide-react"
import ProductsTab from "./tabs/ProductsTab"
import GalleryTab from "./tabs/GalleryTab"
import SettingsTab from "./tabs/SettingsTab"
import type { Product, ImageGallery } from "@/types"

interface DashboardProps {
  onLogout: () => void
  initialProducts: Product[]
  initialGalleries: ImageGallery[]
}

export default function Dashboard({ onLogout, initialProducts, initialGalleries }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("products")

  const tabs = [
    { id: "products", label: "Products", icon: Package },
    { id: "gallery", label: "Gallery", icon: Images },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      className="min-h-screen bg-"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.header
        className="bg-card border-b border-border sticky top-0 z-10 shadow-sm"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          </motion.div>
          <motion.button
            onClick={onLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex text-white items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </div>
      </motion.header>

      <motion.div
        className="bg-card border-b border-border"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variants={itemVariants}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ y: -2 }}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.div>

      <motion.main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "products" && <ProductsTab key="products" initialProducts={initialProducts} />}
          {activeTab === "gallery" && <GalleryTab key="gallery" initialGalleries={initialGalleries} />}
          {activeTab === "settings" && <SettingsTab key="settings" />}
        </AnimatePresence>
      </motion.main>
    </motion.div>
  )
}
