"use server"

import { cookies } from "next/headers"
import { dbConnect } from "@/database/mongodb"
import AdminModel from "@/database/models/Admin"
import { hashString } from "@/lib/crypto"

export async function changeAdminPassword(currentPassword: string, newPassword: string) {
  try {
    await dbConnect()

    if (!currentPassword || !newPassword) {
      return {
        success: false,
        message: "Current password and new password are required",
      }
    }

    if (newPassword.length < 6) {
      return {
        success: false,
        message: "New password must be at least 6 characters long",
      }
    }

    const cookieStore = await cookies()
    const token = cookieStore.get("token")

    if (!token) {
      return {
        success: false,
        message: "Unauthorized - please login again",
      }
    }

    const idCookie = cookieStore.get("id")?.value
    if (!idCookie) {
      return {
        success: false,
        message: "Admin ID not found",
      }
    }

    const admin = await AdminModel.findById(idCookie)

    if (!admin) {
      return {
        success: false,
        message: "Admin not found",
      }
    }

    // Verify current password
    const currentPasswordHashed = await hashString(currentPassword)
    if (admin.password !== currentPasswordHashed) {
      return {
        success: false,
        message: "Current password is incorrect",
      }
    }

    // Hash and update new password
    const newPasswordHashed = await hashString(newPassword)
    admin.password = newPasswordHashed
    await admin.save()

    return {
      success: true,
      message: "Password changed successfully",
    }
  } catch (error) {
    console.error("[v0] Error changing password:", error)
    return {
      success: false,
      message: "Failed to change password. Try again later.",
    }
  }
}
