import { createCheckoutSession, getOrCreateStripeCustomer } from "@/lib/stripe"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"

/**
 * POST handler for creating a Stripe checkout session
 * Used when users want to upgrade their subscription
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { plan } = await req.json().catch(() => ({ plan: "pro" }))
    
    // Get price ID based on plan
    const priceId = plan === "enterprise" 
      ? process.env.STRIPE_ENTERPRISE_PRICE_ID 
      : process.env.STRIPE_PRO_PRICE_ID

    if (!priceId) {
      return new NextResponse("Price ID not configured", { status: 500 })
    }

    // Get or create Stripe customer
    const customerId = await getOrCreateStripeCustomer(
      session.user.id,
      session.user.email
    )

    // Create checkout session
    const checkoutUrl = await createCheckoutSession(
      customerId,
      priceId,
      session.user.id
    )

    return NextResponse.json({ url: checkoutUrl })
  } catch (error) {
    console.error("[STRIPE_CHECKOUT_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
