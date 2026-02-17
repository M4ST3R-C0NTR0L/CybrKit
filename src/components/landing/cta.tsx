"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Sparkles } from "lucide-react"
import { useState } from "react"

/**
 * Call-to-action section with email capture
 */
export function CTA() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Handle email capture - implement with your email service
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setEmail("")
    alert("Thanks for your interest! We will be in touch soon.")
  }

  return (
    <section className="relative py-32">
      <div className="absolute inset-0 gradient-bg" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 sm:p-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
            <Sparkles className="h-4 w-4" />
            <span>Start building today</span>
          </div>
          
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to ship your SaaS?
          </h2>
          <p className="mb-8 text-lg text-zinc-400">
            Join hundreds of founders who have launched faster with LaunchKit. 
            Get started free — no credit card required.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
              required
            />
            <Button 
              type="submit" 
              variant="gradient" 
              disabled={isSubmitting}
              className="group whitespace-nowrap"
            >
              {isSubmitting ? "Joining..." : "Get Started"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          <p className="mt-4 text-sm text-zinc-500">
            Free forever plan available. Upgrade anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
