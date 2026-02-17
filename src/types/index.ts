import { User, Subscription } from '@prisma/client'
import { DefaultSession } from 'next-auth'

/**
 * Extended NextAuth session types with user ID
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

/**
 * User with subscription relation
 */
export type UserWithSubscription = User & {
  subscription: Subscription | null
}

/**
 * Subscription status types
 */
export type SubscriptionStatus = 
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'paused'
  | 'trialing'
  | 'unpaid'
  | 'inactive'

/**
 * Navigation item for sidebar/menu
 */
export interface NavItem {
  title: string
  href: string
  icon?: string
  disabled?: boolean
}

/**
 * Feature card props for landing page
 */
export interface Feature {
  title: string
  description: string
  icon: string
}

/**
 * Pricing plan props
 */
export interface PricingPlan {
  name: string
  price: number
  description: string
  features: string[]
  priceId?: string
  popular?: boolean
}

/**
 * Testimonial props
 */
export interface Testimonial {
  content: string
  author: {
    name: string
    role: string
    company: string
    avatar?: string
  }
}

/**
 * Dashboard stat card props
 */
export interface StatCard {
  title: string
  value: string | number
  description?: string
  trend?: {
    value: number
    positive: boolean
  }
  icon?: string
}

/**
 * API response types
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

/**
 * Checkout session response
 */
export interface CheckoutSessionResponse {
  url: string
}

/**
 * Portal session response
 */
export interface PortalSessionResponse {
  url: string
}
