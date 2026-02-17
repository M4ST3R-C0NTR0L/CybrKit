"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  FileText,
  HelpCircle,
} from "lucide-react"

/**
 * Navigation item type
 */
interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

/**
 * Dashboard sidebar navigation component
 * Shows navigation links for authenticated users
 */
export function Sidebar() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Billing",
      href: "/billing",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const bottomNavItems: NavItem[] = [
    {
      title: "Documentation",
      href: "#",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Help & Support",
      href: "#",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ]

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-950 pt-16 lg:flex">
      {/* Main navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-violet-500/10 text-violet-400"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="my-4 border-t border-zinc-800" />

        {/* Bottom navigation */}
        <nav className="space-y-1">
          {bottomNavItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Upgrade card */}
      <div className="p-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <h4 className="mb-1 text-sm font-medium text-white">Upgrade to Pro</h4>
          <p className="mb-3 text-xs text-zinc-500">
            Get unlimited projects and advanced features.
          </p>
          <Link href="/billing">
            <button className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90">
              View Plans
            </button>
          </Link>
        </div>
      </div>
    </aside>
  )
}
