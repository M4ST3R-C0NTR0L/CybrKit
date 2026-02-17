import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { Check, ExternalLink } from "lucide-react"

/**
 * Billing page for subscription management
 */
export default async function BillingPage() {
  const session = await getServerSession(authOptions)
  
  const subscription = await prisma.subscription.findUnique({
    where: { userId: session?.user?.id },
  })

  const isSubscribed = subscription?.status === "active"

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: ["Up to 3 projects", "Basic analytics", "Community support", "1GB storage"],
      current: !isSubscribed,
    },
    {
      name: "Pro",
      price: "$29",
      description: "For growing teams",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "10GB storage",
        "Custom domains",
        "API access",
      ],
      current: isSubscribed,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Billing</h2>
        <p className="text-zinc-400">
          Manage your subscription and billing information.
        </p>
      </div>

      {/* Current plan */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-white">Current Plan</CardTitle>
          <CardDescription className="text-zinc-400">
            You are currently on the {isSubscribed ? "Pro" : "Free"} plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">
                  {isSubscribed ? "Pro" : "Free"}
                </span>
                <Badge variant={isSubscribed ? "success" : "secondary"}>
                  {subscription?.status || "active"}
                </Badge>
              </div>
              {subscription?.currentPeriodEnd && (
                <p className="text-sm text-zinc-500">
                  Your subscription renews on{" "}
                  {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              )}
            </div>
            <form action="/api/stripe/portal" method="POST">
              <Button type="submit" variant="outline" className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800">
                <ExternalLink className="mr-2 h-4 w-4" />
                Manage Subscription
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      {/* Plans comparison */}
      <div className="grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            className={`${plan.current ? 'border-violet-500/50 bg-zinc-900/80' : 'border-zinc-800 bg-zinc-900/50'}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{plan.name}</CardTitle>
                {plan.current && (
                  <Badge variant="success">Current Plan</Badge>
                )}
              </div>
              <CardDescription className="text-zinc-400">
                {plan.description}
              </CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                {plan.price !== "$0" && <span className="text-zinc-500">/month</span>}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-violet-400" />
                    <span className="text-zinc-400">{feature}</span>
                  </li>
                ))}
              </ul>
              {!plan.current && (
                <form action="/api/stripe/checkout" method="POST" className="mt-6">
                  <input type="hidden" name="plan" value={plan.name.toLowerCase()} />
                  <Button type="submit" variant="gradient" className="w-full">
                    Upgrade to {plan.name}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment method */}
      {isSubscribed && (
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-white">Payment Method</CardTitle>
            <CardDescription className="text-zinc-400">
              Manage your payment methods and billing history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action="/api/stripe/portal" method="POST">
              <Button type="submit" variant="outline" className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Customer Portal
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
