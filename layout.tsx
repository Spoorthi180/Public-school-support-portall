"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { User } from "@/lib/data"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for user in localStorage (demo purposes)
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push("/login")
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (isLoading) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen bg-background p-6">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </div>
        </div>
      </ThemeProvider>
    )
  }

  if (!user) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <DashboardLayout user={user} onLogout={handleLogout}>
        {children}
      </DashboardLayout>
    </ThemeProvider>
  )
}
