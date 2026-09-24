import { FileText, MessageSquare, UserPlus, Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  type: "assignment" | "message" | "student" | "notification"
  title: string
  description: string
  time: string
  user?: string
}

const activities: Activity[] = [
  {
    id: "1",
    type: "assignment",
    title: "New Assignment Uploaded",
    description: "Algebra Equations Practice by Mr. Robert Smith",
    time: "2 hours ago",
    user: "RS",
  },
  {
    id: "2",
    type: "student",
    title: "New Student Enrolled",
    description: "Emma Taylor joined Class 10-A",
    time: "4 hours ago",
    user: "ET",
  },
  {
    id: "3",
    type: "message",
    title: "Parent Message",
    description: "Michael Doe inquired about student progress",
    time: "5 hours ago",
    user: "MD",
  },
  {
    id: "4",
    type: "notification",
    title: "System Update",
    description: "Grade reports have been generated",
    time: "Yesterday",
  },
  {
    id: "5",
    type: "assignment",
    title: "Assignment Submitted",
    description: "24 students submitted Chemistry Lab Report",
    time: "Yesterday",
  },
]

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "assignment":
      return FileText
    case "message":
      return MessageSquare
    case "student":
      return UserPlus
    case "notification":
      return Bell
  }
}

const getActivityColor = (type: Activity["type"]) => {
  switch (type) {
    case "assignment":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    case "message":
      return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
    case "student":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    case "notification":
      return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[360px]">
          <div className="space-y-1 px-6 pb-6">
            {activities.map((activity) => {
              const Icon = getActivityIcon(activity.type)
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50"
                >
                  {activity.user ? (
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {activity.user}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", getActivityColor(activity.type))}>
                      <Icon className="h-5 w-5" />
                    </div>
                  )}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
