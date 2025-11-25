import sql from "@/database/connection"
import type { NeonQueryFunction } from "@neondatabase/serverless"
import type { } from "@/types"
import { cloudinary } from "@/database/utils/cloudinary"

const MAX_RETRIES = 5
const RETRY_DELAY = 2000

async function ensureConnection() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set")
  }

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      await sql`SELECT 1`

      return sql
    } catch (error) {
      console.error(`Connection attempt ${i + 1} failed:`, error)

      if (i < MAX_RETRIES - 1) {
        console.log(`Waiting ${RETRY_DELAY}ms before next attempt...`)
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
      } else {
        throw new Error(`Failed to establish database connection after ${MAX_RETRIES} attempts.`)
      }
    }
  }

  throw new Error(`Failed to establish database connection after ${MAX_RETRIES} attempts.`)
}

export async function executeDbOperation<T>(operation: (db: NeonQueryFunction<false, false>) => Promise<T>): Promise<T> {
  try {
    const db = await ensureConnection()
    return await operation(db)
  } catch (error) {
    console.error(`Database operation failed: ${error}`)
    throw error
  }
}

export async function nameOfFunction(): Promise<[]> {
  return executeDbOperation(async(db) => {
    const result = await db`
      SELECT id, nama_item, tipe_item, item, created_at
      FROM website_property
      ORDER BY created_at DESC
    `;
    return result as [];
  });
}
