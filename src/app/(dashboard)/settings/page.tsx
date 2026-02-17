import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getInitials } from "@/lib/utils"

/**
 * Settings page for user profile management
 */
export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Settings</h2>
        <p className="text-zinc-400">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile section */}
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-white">Profile</CardTitle>
            <CardDescription className="text-zinc-400">
              Update your personal information and profile picture.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                <AvatarFallback className="bg-violet-500/10 text-violet-400 text-2xl">
                  {getInitials(session?.user?.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm" className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800">
                  Change Avatar
                </Button>
                <p className="mt-2 text-xs text-zinc-500">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Full Name</label>
                <Input
                  defaultValue={session?.user?.name || ""}
                  className="border-zinc-700 bg-zinc-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Email</label>
                <Input
                  type="email"
                  defaultValue={session?.user?.email || ""}
                  disabled
                  className="border-zinc-700 bg-zinc-800 text-zinc-500"
                />
              </div>
            </div>

            <Button variant="gradient">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notifications section */}
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-white">Notifications</CardTitle>
            <CardDescription className="text-zinc-400">
              Choose what notifications you want to receive.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "marketing", label: "Marketing emails", description: "Receive emails about new products, features, and more." },
                { id: "social", label: "Social notifications", description: "Receive notifications when someone mentions you or replies." },
                { id: "updates", label: "Product updates", description: "Receive notifications about product updates and changes." },
              ].map((item) => (
                <div key={item.id} className="flex items-start justify-between">
                  <div>
                    <label htmlFor={item.id} className="text-sm font-medium text-white">
                      {item.label}
                    </label>
                    <p className="text-xs text-zinc-500">{item.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    id={item.id}
                    defaultChecked={item.id === "updates"}
                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-violet-600"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Danger zone */}
        <Card className="border-red-900/50 bg-red-950/10">
          <CardHeader>
            <CardTitle className="text-red-400">Danger Zone</CardTitle>
            <CardDescription className="text-red-400/70">
              Irreversible actions for your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Delete Account</p>
                <p className="text-xs text-zinc-500">
                  Permanently delete your account and all associated data.
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
