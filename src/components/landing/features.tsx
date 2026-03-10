"use client"

import { 
  Shield, 
  CreditCard, 
  LayoutDashboard, 
  Moon, 
  Code2, 
  Zap 
} from "lucide-react"

/**
 * Feature card component
 */
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-all hover:border-violet-500/50 hover:bg-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
        <p className="text-zinc-400">{description}</p>
      </div>
    </div>
  )
}

/**
 * Features section showcasing the key capabilities of CybrKit
 */
export function Features() {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Authentication Ready",
      description: "Pre-configured NextAuth.js with Google, GitHub, and email magic link providers. Secure session management included.",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Stripe Integration",
      description: "Complete subscription management with Stripe. Checkout sessions, customer portal, and webhook handling out of the box.",
    },
    {
      icon: <LayoutDashboard className="h-6 w-6" />,
      title: "Beautiful Dashboard",
      description: "A clean, modern dashboard with sidebar navigation, user management, and responsive design that works on all devices.",
    },
    {
      icon: <Moon className="h-6 w-6" />,
      title: "Dark Mode First",
      description: "Dark mode is the default with a carefully crafted color palette. Light mode support included with next-themes.",
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "TypeScript Native",
      description: "100% TypeScript coverage with strict typing. No 'any' types, full IntelliSense support, and type-safe APIs.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "API Ready",
      description: "RESTful API structure with proper error handling. Extend easily with your own endpoints and business logic.",
    },
  ]

  return (
    <section id="features" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Everything you need to{" "}
            <span className="gradient-text">launch fast</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Stop wasting time on boilerplate. CybrKit includes all the essential 
            features you need to build and ship your SaaS product.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
