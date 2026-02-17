import { StatsCards } from "@/components/dashboard/stats-cards"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

/**
 * Dashboard main page
 * Shows stats cards and recent activity
 */
export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  // Get user's subscription status
  const subscription = await prisma.subscription.findUnique({
    where: { userId: session?.user?.id },
  })

  const activities = [
    { id: 1, action: "New user signed up", time: "2 minutes ago", type: "success" },
    { id: 2, action: "Payment received", time: "1 hour ago", type: "success" },
    { id: 3, action: "New project created", time: "3 hours ago", type: "info" },
    { id: 4, action: "API key regenerated", time: "5 hours ago", type: "warning" },
    { id: 5, action: "Team member invited", time: "1 day ago", type: "info" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-3xl font-bold text-white">
          Welcome back, {session?.user?.name?.split(' ')[0] || 'there'}
        </h2>
        <p className="text-zinc-400">
          Here&apos;s what&apos;s happening with your projects today.
        </p>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Content grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent activity */}
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b border-zinc-800 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{activity.action}</p>
                    <p className="text-xs text-zinc-500">{activity.time}</p>
                  </div>
                  <Badge 
                    variant={activity.type as "default" | "secondary" | "destructive" | "outline" | "success" | "warning"}
                    className="text-xs"
                  >
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subscription status */}
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-white">Subscription Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Current Plan</span>
                <Badge variant={subscription?.status === "active" ? "success" : "secondary"}>
                  {subscription?.status === "active" ? "Pro" : "Free"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Status</span>
                <span className="text-white capitalize">{subscription?.status || "inactive"}</span>
              </div>
              {subscription?.currentPeriodEnd && (
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Next Billing</span>
                  <span className="text-white">
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="pt-4">
                <a
                  href="/billing"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  Manage Subscription
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
