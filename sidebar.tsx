"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  FolderOpen,
  Bell,
  Upload,
} from "lucide-react"
import { UserRole } from "@/lib/data"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  userRole: UserRole
  onLogout: () => void
}

const adminNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/students", label: "Students", icon: Users },
  { href: "/dashboard/teachers", label: "Teachers", icon: GraduationCap },
  { href: "/dashboard/assignments", label: "Assignments", icon: FileText },
  { href: "/dashboard/resources", label: "Resources", icon: FolderOpen },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

const teacherNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/classes", label: "My Classes", icon: BookOpen },
  { href: "/dashboard/assignments", label: "Assignments", icon: FileText },
  { href: "/dashboard/upload", label: "Upload", icon: Upload },
  { href: "/dashboard/resources", label: "Resources", icon: FolderOpen },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
]

const studentNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/assignments", label: "Assignments", icon: FileText },
  { href: "/dashboard/resources", label: "Study Materials", icon: FolderOpen },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
]

export function Sidebar({ collapsed, onToggle, userRole, onLogout }: SidebarProps) {
  const pathname = usePathname()
  
  const navItems = userRole === "admin" 
    ? adminNavItems 
    : userRole === "teacher" 
      ? teacherNavItems 
      : studentNavItems

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">SchoolPortal</span>
          </Link>
        )}
        {collapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary mx-auto">
            <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Bottom Actions */}
      <div className="border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className={cn(
            "w-full text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
            collapsed ? "justify-center px-2" : "justify-start gap-3"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn(
            "w-full mt-1 text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
            collapsed ? "justify-center px-2" : "justify-start gap-3"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  )
}
