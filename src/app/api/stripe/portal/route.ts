import { createPortalSession } from "@/lib/stripe"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

/**
 * POST handler for creating a Stripe customer portal session
 * Allows users to manage their subscription, payment methods, and billing history
 */
export async function POST() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get user's Stripe customer ID
    const subscription = await prisma.subscription.findUnique({
      where: { userId: session.user.id },
    })

    if (!subscription?.stripeCustomerId) {
      return new NextResponse("No subscription found", { status: 404 })
    }

    // Create portal session
    const portalUrl = await createPortalSession(subscription.stripeCustomerId)

    return NextResponse.json({ url: portalUrl })
  } catch (error) {
    console.error("[STRIPE_PORTAL_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
