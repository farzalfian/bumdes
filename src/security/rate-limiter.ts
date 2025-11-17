// In-memory rate limiter (for production, use Redis)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number // Time window in milliseconds
}

export function isRateLimited(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 50, windowMs: 60 * 1000 }, // 50 requests per minute
): boolean {
  const now = Date.now()
  const record = requestCounts.get(identifier)

  if (!record || now > record.resetTime) {
    // Reset or create new record
    requestCounts.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs,
    })
    return false
  }

  // Increment count
  record.count++

  if (record.count > config.maxRequests) {
    return true // Rate limited
  }

  return false
}

export function getAdminIdentifier(adminId: string): string {
  return `admin_${adminId}`
}

// Cleanup old records every 5 minutes
setInterval(
  () => {
    const now = Date.now()
    for (const [key, value] of requestCounts.entries()) {
      if (now > value.resetTime) {
        requestCounts.delete(key)
      }
    }
  },
  5 * 60 * 1000,
)
