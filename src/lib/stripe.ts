import Stripe from 'stripe'

/**
 * Stripe SDK initialization
 * Used for payment processing, subscriptions, and billing
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
})

/**
 * Get or create a Stripe customer for a user
 * @param userId - The user's ID
 * @param email - The user's email
 * @returns The Stripe customer ID
 */
export async function getOrCreateStripeCustomer(
  userId: string,
  email: string
): Promise<string> {
  const { prisma } = await import('./db')
  
  // Check if user already has a Stripe customer
  const existingSubscription = await prisma.subscription.findUnique({
    where: { userId },
  })

  if (existingSubscription?.stripeCustomerId) {
    return existingSubscription.stripeCustomerId
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    metadata: {
      userId,
    },
  })

  // Save customer ID to database
  await prisma.subscription.upsert({
    where: { userId },
    update: { stripeCustomerId: customer.id },
    create: {
      userId,
      stripeCustomerId: customer.id,
      status: 'inactive',
    },
  })

  return customer.id
}

/**
 * Create a Stripe checkout session for subscription
 * @param customerId - The Stripe customer ID
 * @param priceId - The Stripe price ID
 * @param userId - The user's ID
 * @returns The checkout session URL
 */
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  userId: string
): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    subscription_data: {
      metadata: {
        userId,
      },
    },
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/billing?canceled=true`,
    automatic_tax: { enabled: true },
  })

  return session.url!
}

/**
 * Create a Stripe customer portal session
 * @param customerId - The Stripe customer ID
 * @returns The portal session URL
 */
export async function createPortalSession(customerId: string): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXTAUTH_URL}/billing`,
  })

  return session.url
}

/**
 * Subscription plan configurations
 */
export const PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    features: [
      'Up to 3 projects',
      'Basic analytics',
      'Community support',
      '1GB storage',
    ],
  },
  PRO: {
    name: 'Pro',
    price: 29,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      '10GB storage',
      'Custom domains',
      'API access',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 99,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    features: [
      'Everything in Pro',
      'Unlimited storage',
      'Dedicated support',
      'SLA guarantee',
      'Custom integrations',
      'SSO/SAML',
    ],
  },
} as const
