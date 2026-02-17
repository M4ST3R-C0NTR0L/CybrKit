"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

/**
 * Testimonial card component
 */
interface TestimonialCardProps {
  content: string
  author: {
    name: string
    role: string
    company: string
    avatar?: string
  }
}

function TestimonialCard({ content, author }: TestimonialCardProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardContent className="p-6">
        <Quote className="mb-4 h-8 w-8 text-violet-500/50" />
        <p className="mb-6 text-zinc-300">&ldquo;{content}&rdquo;</p>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="bg-violet-500/10 text-violet-400">
              {author.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-white">{author.name}</p>
            <p className="text-sm text-zinc-500">
              {author.role} at {author.company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Testimonials section with social proof
 */
export function Testimonials() {
  const testimonials = [
    {
      content: "LaunchKit saved us weeks of development time. We went from idea to paying customers in under 2 weeks. The Stripe integration alone was worth it.",
      author: {
        name: "Sarah Chen",
        role: "Founder",
        company: "TaskFlow",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
    },
    {
      content: "The code quality is exceptional. Everything is type-safe, well-organized, and follows best practices. It is like having a senior dev on your team from day one.",
      author: {
        name: "Marcus Johnson",
        role: "CTO",
        company: "DataSync",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      },
    },
    {
      content: "We evaluated 5 different SaaS starters and LaunchKit was the clear winner. The authentication flow, dashboard UI, and documentation are top-notch.",
      author: {
        name: "Emily Rodriguez",
        role: "Product Manager",
        company: "CloudScale",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      },
    },
  ]

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Loved by{" "}
            <span className="gradient-text">founders</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            See what other builders are saying about LaunchKit.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
