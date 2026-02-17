"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

/**
 * Pricing tier card component
 */
interface PricingCardProps {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  cta: string
  href: string
}

function PricingCard({ name, price, description, features, popular, cta, href }: PricingCardProps) {
  return (
    <Card className={`relative flex flex-col ${popular ? 'border-violet-500/50 bg-zinc-900/80' : 'border-zinc-800 bg-zinc-900/50'} overflow-hidden`}>
      {popular && (
        <div className="absolute right-0 top-0 bg-gradient-to-l from-violet-600 to-blue-600 px-3 py-1 text-xs font-medium text-white">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl text-white">{name}</CardTitle>
        <CardDescription className="text-zinc-400">{description}</CardDescription>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold text-white">{price}</span>
          {price !== "$0" && <span className="ml-1 text-zinc-500">/month</span>}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className={`h-5 w-5 flex-shrink-0 ${popular ? 'text-violet-400' : 'text-zinc-500'}`} />
              <span className="text-sm text-zinc-400">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href={href} className="w-full">
          <Button 
            className="w-full" 
            variant={popular ? "gradient" : "outline"}
          >
            {cta}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

/**
 * Pricing section with three tiers (Free, Pro, Enterprise)
 */
export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started and testing.",
      features: [
        "Up to 3 projects",
        "Basic analytics",
        "Community support",
        "1GB storage",
        "API access (100 req/day)",
      ],
      cta: "Get Started",
      href: "/signup",
    },
    {
      name: "Pro",
      price: "$29",
      description: "For growing teams and businesses.",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority email support",
        "10GB storage",
        "Custom domains",
        "API access (10k req/day)",
        "Team collaboration",
      ],
      popular: true,
      cta: "Start Free Trial",
      href: "/signup",
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "For large organizations with custom needs.",
      features: [
        "Everything in Pro",
        "Unlimited storage",
        "Dedicated support",
        "SLA guarantee",
        "Custom integrations",
        "SSO/SAML",
        "Unlimited API access",
        "Audit logs",
      ],
      cta: "Contact Sales",
      href: "/signup",
    },
  ]

  return (
    <section id="pricing" className="relative py-32">
      <div className="absolute inset-0 gradient-bg" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Simple, transparent{" "}
            <span className="gradient-text">pricing</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Start free, upgrade when you are ready. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>

        {/* Trust note */}
        <p className="mt-8 text-center text-sm text-zinc-500">
          All plans include SSL security, automatic backups, and 99.9% uptime guarantee.
        </p>
      </div>
    </section>
  )
}
