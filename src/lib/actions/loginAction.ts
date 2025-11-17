/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers"
import { login } from "../utils"
import jwt from "jsonwebtoken"
import { encryptString, hashString } from "../crypto"

const JWT_SECRET: any = process.env.JWT_SECRET
const secretKey: any = process.env.SECRET_KEY

export default async function loginAction(prevState: any, formData: FormData) {
  const cookieStore = await cookies()
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (!username || !password) {
    return {
      success: false,
      message: "Username dan password harus diisi",
    }
  }

  const hashedPassword = await hashString(password)

  try {
    const admin = await login(username, hashedPassword)

    if (!admin) {
      return {
        success: false,
        message: "Username atau password salah",
      }
    }

    const payload = { id: admin.id, name: admin.name }
    const token = jwt.sign(payload, JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "30d",
    })

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    })

    cookieStore.set("id", await encryptString(String(admin.id), secretKey), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    })
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "Terjadi kesalahan saat login. Coba lagi nanti.",
    }
  }

  return {
    success: true,
    message: "Login berhasil."
  }
}
