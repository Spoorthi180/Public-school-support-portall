"use client"

import Link from "next/link"
import { UserPlus, GraduationCap, FileUp, MessageSquarePlus, Calendar, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserRole } from "@/lib/data"

interface QuickActionsProps {
  userRole: UserRole
}

const adminActions = [
  { label: "Add Student", icon: UserPlus, href: "/dashboard/students?action=add" },
  { label: "Add Teacher", icon: GraduationCap, href: "/dashboard/teachers?action=add" },
  { label: "Upload Resource", icon: FileUp, href: "/dashboard/resources?action=upload" },
  { label: "Send Notice", icon: MessageSquarePlus, href: "/dashboard/messages?action=compose" },
  { label: "Schedule Event", icon: Calendar, href: "/dashboard/events?action=create" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
]

const teacherActions = [
  { label: "Upload Assignment", icon: FileUp, href: "/dashboard/upload" },
  { label: "Upload Resource", icon: FileUp, href: "/dashboard/resources?action=upload" },
  { label: "Send Message", icon: MessageSquarePlus, href: "/dashboard/messages?action=compose" },
  { label: "View Submissions", icon: GraduationCap, href: "/dashboard/assignments" },
]

const studentActions = [
  { label: "View Assignments", icon: FileUp, href: "/dashboard/assignments" },
  { label: "Study Materials", icon: GraduationCap, href: "/dashboard/resources" },
  { label: "Messages", icon: MessageSquarePlus, href: "/dashboard/messages" },
]

export function QuickActions({ userRole }: QuickActionsProps) {
  const actions = userRole === "admin" 
    ? adminActions 
    : userRole === "teacher" 
      ? teacherActions 
      : studentActions

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto flex-col gap-2 p-4"
              asChild
            >
              <Link href={action.href}>
                <action.icon className="h-5 w-5 text-primary" />
                <span className="text-sm">{action.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
