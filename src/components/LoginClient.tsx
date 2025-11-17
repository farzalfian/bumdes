"use client"

import type React from "react"
import { useActionState, useEffect } from "react"
import { useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, HelpCircle, KeyRound, User, Loader2 } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import loginAction from "@/lib/actions/loginAction"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  username: string
  password: string
}

const MotionInput: React.FC<React.ComponentProps<typeof Input> & { icon: React.ReactNode }> = ({ icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
    <Input
      {...props}
      className="bg-background border border-border h-12 rounded-lg pl-10 pr-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
    />
  </div>
)

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
}

function SubmitButton({
  isFormValid,
  pending,
}: {
  isFormValid: boolean
  pending: boolean
}) {
  return (
    <motion.button
      type="submit"
      disabled={pending || !isFormValid}
      variants={itemVariants}
      whileHover={{ scale: pending ? 1 : 1.02 }}
      whileTap={{ scale: pending ? 1 : 0.98 }}
      className="transition cursor-pointer duration-200 bg-primary hover:bg-primary/90 focus:bg-primary/80 focus:shadow-sm focus:ring-4 focus:ring-primary/50 text-primary-foreground w-full py-3 rounded-lg text-sm shadow-lg hover:shadow-xl font-semibold text-center inline-flex items-center justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span>Memproses...</span>
        </>
      ) : (
        <>
          <span className="mr-2">Masuk</span>
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </motion.button>
  )
}

export default function LoginClient() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  })
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackurl") || "/admin"
  const toastHook = useToast()
  const toast = toastHook.toast
  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
    message: "",
  })
  const [firstOpen, setFirstOpen] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isPending === true) setFirstOpen(true)
  }, [isPending])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const handleForgotPassword = useCallback(() => {
    toast({
      title: "Lupa Password",
      description: "Fitur reset password akan segera tersedia. Hubungi administrator untuk bantuan.",
      duration: 4000,
    })
  }, [toast])

  const handleHelp = useCallback(() => {
    toast({
      title: "Butuh Bantuan?",
      description: "Silakan hubungi administrator atau tim IT untuk mendapatkan bantuan login.",
      duration: 4000,
    })
  }, [toast])

  const isFormValid: boolean = formData.username && formData.password ? true : false

  useEffect(() => {
    if (state && !state.success && firstOpen) {
      toast({
        variant: "destructive",
        title: "Login Gagal",
        description: state.message,
        duration: 5000,
      })
    } else if(state && state.success) {
      router.push("/admin")
    }
  }, [firstOpen, router, state, toast])

  return (
    <div className="container mx-auto px-4 relative pt-24 pb-20" style={{ zIndex: 3 }}>
      <motion.div
        className="max-w-md mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ pointerEvents: "auto" }}
      >
        <motion.h1
          className="font-bold text-center text-3xl mb-2 text-foreground drop-shadow-lg"
          variants={itemVariants}
        >
          Admin Login
        </motion.h1>

        <motion.p className="text-center text-muted-foreground mb-6 text-sm" variants={itemVariants}>
          Masukkan kredensial untuk melanjutkan
        </motion.p>

        <motion.div
          className="bg-card backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-border"
          variants={itemVariants}
        >
          {state && !state.success && (
            <motion.div
              className="px-6 py-4 bg-destructive/10 border-b border-destructive/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="flex items-center text-destructive text-sm">
                {state.message ? (
                  <>
                    <span className="mr-2">⚠️</span>
                    {state.message}
                  </>
                ) : null}
              </p>
            </motion.div>
          )}

          <form action={formAction} className="px-6 py-8 space-y-5">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />

            <motion.div className="space-y-2" variants={itemVariants}>
              <label htmlFor="username" className="font-medium text-sm text-muted-foreground block">
                Username
              </label>
              <MotionInput
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                required
                placeholder="Masukkan username anda"
                icon={<User className="h-5 w-5 text-muted-foreground" />}
              />
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <label htmlFor="password" className="font-medium text-sm text-muted-foreground block">
                Password
              </label>
              <MotionInput
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Masukkan password anda"
                icon={<KeyRound className="h-5 w-5 text-muted-foreground" />}
              />
            </motion.div>

            <SubmitButton pending={isPending} isFormValid={isFormValid} />
          </form>

          <div className="border-t border-border/30 px-6 py-4 bg-background/50">
            <div className="flex flex-wrap justify-between gap-2">
              <motion.button
                onClick={handleForgotPassword}
                className="text-sm cursor-pointer text-muted-foreground hover:text-secondary flex items-center gap-1 transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
              >
                <KeyRound className="w-4 h-4" />
                <span>Lupa Password</span>
              </motion.button>

              <motion.button
                onClick={handleHelp}
                className="text-sm cursor-pointer text-muted-foreground hover:text-secondary flex items-center gap-1 transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Bantuan</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
