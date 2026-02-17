import Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

/**
 * Webhook handler for Stripe events
 * Handles subscription created, updated, and deleted events
 * Updates the database to reflect subscription status changes
 */
export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  switch (event.type) {
    case "checkout.session.completed": {
      // Subscription created
      if (session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        )

        await prisma.subscription.update({
          where: {
            userId: session.metadata?.userId,
          },
          data: {
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCustomerId: subscription.customer as string,
            status: subscription.status,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        })
      }
      break
    }

    case "invoice.payment_succeeded": {
      // Subscription renewed
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      )

      await prisma.subscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          status: subscription.status,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      })
      break
    }

    case "customer.subscription.updated": {
      // Subscription updated
      const subscription = event.data.object as Stripe.Subscription

      await prisma.subscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          status: subscription.status,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      })
      break
    }

    case "customer.subscription.deleted": {
      // Subscription canceled
      const subscription = event.data.object as Stripe.Subscription

      await prisma.subscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          status: "canceled",
        },
      })
      break
    }
  }

  return new NextResponse(null, { status: 200 })
}
