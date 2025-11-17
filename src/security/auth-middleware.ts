import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

export async function verifyAdminAuth(): Promise<{ id: string; name: string } | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      console.error("[v0] No token provided")
      return null
    }

    const decoded = jwt.verify(token, JWT_SECRET!) as {
      id: string
      name: string
      iat: number
      exp: number
    }

    return { id: decoded.id, name: decoded.name }
  } catch (error) {
    console.error("[v0] Auth verification failed:", error)
    return null
  }
}
