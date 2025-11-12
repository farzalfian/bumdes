"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Login from "@/components/ui/admin/Login"
import Dashboard from "@/components/ui/admin/Dashboard"

export default function AdminClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem("adminAuth", "true")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("adminAuth")
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
      {!isAuthenticated ? (
        <Login key="login" onLogin={handleLogin} />
      ) : (
        <Dashboard key="dashboard" onLogout={handleLogout} />
      )}
    </AnimatePresence>
  )
}
