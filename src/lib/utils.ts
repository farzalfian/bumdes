import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { dbConnect } from "@/database/mongodb"
import AdminModel from "@/database/models/Admin"
import type { Admin } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function generateWhatsAppMessage(
  cart: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>,
  finalTotal: number
): string {
  let message = "Halo, saya ingin memesan:\n\n";
  
  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `   Qty: ${item.quantity} x ${formatPrice(item.price)}\n`;
    message += `   Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`;
  });
  
  message += `*Total: ${formatPrice(finalTotal)}*\n\n`;
  message += "Mohon informasi untuk proses selanjutnya. Terima kasih!";
  
  return encodeURIComponent(message);
}

export async function login(username: string, hashedPassword: string): Promise<Admin | null> {
  try {
    console.log(username, hashedPassword)
    await dbConnect()
    const admin = await AdminModel.findOne({
      name: username,
      password: hashedPassword,
    })

    return admin || null
  } catch (error) {
    console.error("[v0] Database login error:", error)
    throw error
  }
}

export async function createAdmin(admin: Omit<Admin, "id" | "createdAt" | "updatedAt">): Promise<boolean> {
  try {
    await dbConnect()
    const now = new Date().toISOString()
    
    const newAdmin = new AdminModel({
      ...admin,
      createdAt: now,
      updatedAt: now,
    })

    await newAdmin.save()
    return true
  } catch (error) {
    console.error("[v0] Error creating admin:", error)
    throw error
  }
}

export async function getAdminById(id: string): Promise<Admin | null> {
  try {
    await dbConnect()
    const admin = await AdminModel.findById(id)
    return admin || null
  } catch (error) {
    console.error("[v0] Error fetching admin:", error)
    throw error
  }
}
