"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Dashboard from "@/components/ui/admin/Dashboard"
import type { Product, ImageGallery } from "@/types"
import { redirect } from "next/navigation"
import { logoutActions } from "@/lib/actions/logoutActions"

interface AdminClientProps {
  initialProducts: Product[]
  initialGalleries: ImageGallery[]
  loginStatus: boolean
}

export default function AdminClient({ initialProducts, initialGalleries, loginStatus }: AdminClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (loginStatus) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [loginStatus])

  const handleLogout = () => {
    logoutActions()
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full"
        />
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {!isAuthenticated ? redirect("/login") : (
        <Dashboard
          key="dashboard"
          onLogout={handleLogout}
          initialProducts={initialProducts}
          initialGalleries={initialGalleries}
        />
      )}
    </AnimatePresence>
  )
}
