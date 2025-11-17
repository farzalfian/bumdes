import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function verifyToken(token: string): boolean {
  if (!JWT_SECRET) throw new Error("JWT_SECRET not found in env!");

  try {
    jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
    return true;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return false;
  }
}
