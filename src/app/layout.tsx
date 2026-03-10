import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/landing/footer"
import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CybrKit - Ship your SaaS in days, not months",
  description: "The complete Next.js SaaS starter kit with authentication, payments, and a beautiful dashboard. Launch your product faster.",
  keywords: ["saas", "starter kit", "next.js", "typescript", "stripe", "authentication"],
  authors: [{ name: "Cybrflux" }],
  openGraph: {
    title: "CybrKit - Ship your SaaS in days",
    description: "The complete Next.js SaaS starter kit with everything you need to launch fast.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-zinc-950 text-white antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
