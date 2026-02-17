"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, TrendingUp, Activity } from "lucide-react"

/**
 * Stat card component
 */
interface StatCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend?: {
    value: string
    positive: boolean
  }
}

function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-violet-500/10 p-1.5 text-violet-400">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <p className="text-xs text-zinc-500">
          {trend && (
            <span className={trend.positive ? "text-green-400" : "text-red-400"}>
              {trend.positive ? "+" : ""}{trend.value}
            </span>
          )}{" "}
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

/**
 * Stats cards grid for dashboard
 */
export function StatsCards() {
  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      description: "from last month",
      icon: <Users className="h-5 w-5" />,
      trend: { value: "12.5%", positive: true },
    },
    {
      title: "Revenue",
      value: "$45,231",
      description: "from last month",
      icon: <DollarSign className="h-5 w-5" />,
      trend: { value: "8.2%", positive: true },
    },
    {
      title: "Growth",
      value: "+23.5%",
      description: "vs last quarter",
      icon: <TrendingUp className="h-5 w-5" />,
      trend: { value: "4.1%", positive: true },
    },
    {
      title: "Active Now",
      value: "573",
      description: "users online",
      icon: <Activity className="h-5 w-5" />,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
