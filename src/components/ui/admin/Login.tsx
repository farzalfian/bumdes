"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Mail } from "lucide-react"

interface AdminLoginProps {
  onLogin: () => void
}

export default function Login({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const ADMIN_PASSWORD = "admin123"
  const ADMIN_EMAIL = "admin@dashboard.com"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      onLogin()
    } else {
      setError("Invalid email or password")
      setPassword("")
    }
    setIsLoading(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="w-full max-w-md" variants={itemVariants}>
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Admin Portal</h1>
            <p className="text-muted-foreground mt-2">Secure access required</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dashboard.com"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  disabled={isLoading}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  disabled={isLoading}
                />
              </div>
            </motion.div>

            {error && (
              <motion.div
                variants={itemVariants}
                className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg"
              >
                <p className="text-sm text-destructive">{error}</p>
              </motion.div>
            )}

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Login"}
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className="mt-6 text-center text-xs text-muted-foreground">
            <p className="mb-2">Demo Credentials:</p>
            <p>Email: admin@dashboard.com</p>
            <p>Password: admin123</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
