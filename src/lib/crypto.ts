import crypto from "crypto"

export async function hashString(password: string): Promise<string> {
  return crypto.createHash("sha256").update(password).digest("hex")
}

export function encryptString(text: string, secretKey: string): string {
  const iv = crypto.randomBytes(16)
  const key = crypto.createHash("sha256").update(secretKey).digest()

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
  let encrypted = cipher.update(text, "utf-8", "hex")
  encrypted += cipher.final("hex")

  return iv.toString("hex") + ":" + encrypted
}

export function decryptString(encryptedText: string, secretKey: string): string {
  const [iv, encrypted] = encryptedText.split(":")
  const key = crypto.createHash("sha256").update(secretKey).digest()

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, Buffer.from(iv, "hex"))
  let decrypted = decipher.update(encrypted, "hex", "utf-8")
  decrypted += decipher.final("utf-8")

  return decrypted
}
