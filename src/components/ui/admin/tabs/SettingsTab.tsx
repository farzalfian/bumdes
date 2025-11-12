"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Key, CheckCircle, AlertCircle } from "lucide-react"

export default function SettingsTab() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const ADMIN_PASSWORD = "admin123"

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: "error", text: "All fields are required" })
      return
    }

    if (currentPassword !== ADMIN_PASSWORD) {
      setMessage({ type: "error", text: "Current password is incorrect" })
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" })
      return
    }

    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" })
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    localStorage.setItem("adminPassword", newPassword)
    setMessage({ type: "success", text: "Password changed successfully!" })
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setIsLoading(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-2">Manage your admin account settings</p>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-card rounded-lg border border-border p-6 max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Key className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition disabled:opacity-50"
              disabled={isLoading}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition disabled:opacity-50"
              disabled={isLoading}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition disabled:opacity-50"
              disabled={isLoading}
            />
          </motion.div>

          {message && (
            <motion.div
              variants={itemVariants}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                message.type === "success"
                  ? "bg-green-100 border border-green-300 dark:bg-green-900 dark:border-green-700"
                  : "bg-destructive/10 border border-destructive/30"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-destructive" />
              )}
              <p
                className={`text-sm font-medium ${
                  message.type === "success" ? "text-green-800 dark:text-green-100" : "text-destructive"
                }`}
              >
                {message.text}
              </p>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </motion.button>
        </form>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-accent/10 border border-accent rounded-lg p-4">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Note:</span> This demo stores password changes locally. In a production
          environment, ensure passwords are hashed and stored securely on a server.
        </p>
      </motion.div>
    </motion.div>
  )
}
