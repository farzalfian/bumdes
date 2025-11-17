"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logoutActions() {
  try {
    const cookieStore = await cookies()

    cookieStore.delete("id")
    cookieStore.delete("token")
    redirect("/login")
  } catch (error) {
    console.error("Logout error:", error)
    return {
      success: false,
      message: "Terjadi kesalahan saat logout. Coba lagi nanti.",
    }
  }
}