"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sidebar } from "./sidebar"
import { TopNavbar } from "./top-navbar"
import { User } from "@/lib/data"

interface DashboardLayoutProps {
  children: React.ReactNode
  user: User
  onLogout: () => void
}

export function DashboardLayout({ children, user, onLogout }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          userRole={user.role}
          onLogout={onLogout}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-30 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-40">
            <Sidebar
              collapsed={false}
              onToggle={() => setMobileMenuOpen(false)}
              userRole={user.role}
              onLogout={onLogout}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        <TopNavbar
          user={user}
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          onLogout={onLogout}
        />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
