import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

/**
 * NextAuth.js API route handler
 * Handles authentication for all providers (Google, GitHub, Email)
 */
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
