"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

/**
 * Authentication provider wrapper for NextAuth.js
 */
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}
