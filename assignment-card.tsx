"use client"

import { Download, FileText, FileType, Presentation, Image as ImageIcon, Calendar, User } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Assignment } from "@/lib/data"
import { cn } from "@/lib/utils"

interface AssignmentCardProps {
  assignment: Assignment
  showTeacher?: boolean
  onDownload?: (assignment: Assignment) => void
}

const getFileIcon = (fileType: Assignment["fileType"]) => {
  switch (fileType) {
    case "pdf":
      return FileText
    case "docx":
      return FileType
    case "pptx":
      return Presentation
    case "image":
      return ImageIcon
    default:
      return FileText
  }
}

const getFileTypeColor = (fileType: Assignment["fileType"]) => {
  switch (fileType) {
    case "pdf":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    case "docx":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
    case "pptx":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
    case "xlsx":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
    case "image":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
  }
}

export function AssignmentCard({ assignment, showTeacher = true, onDownload }: AssignmentCardProps) {
  const FileIcon = getFileIcon(assignment.fileType)

  const handleDownload = () => {
    // Create a download link (in production, this would be a real file URL)
    const link = document.createElement("a")
    link.href = assignment.fileUrl
    link.download = `${assignment.title}.${assignment.fileType}`
    link.click()
    
    onDownload?.(assignment)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const isOverdue = new Date(assignment.dueDate) < new Date()

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", getFileTypeColor(assignment.fileType))}>
              <FileIcon className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold leading-tight">{assignment.title}</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {assignment.subject}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {assignment.class}
                </Badge>
              </div>
            </div>
          </div>
          <Badge
            variant={isOverdue ? "destructive" : "outline"}
            className="shrink-0 text-xs"
          >
            {isOverdue ? "Overdue" : "Active"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {assignment.description}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {showTeacher && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{assignment.teacherName}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Due: {formatDate(assignment.dueDate)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-border bg-muted/30 pt-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="uppercase font-medium">{assignment.fileType}</span>
            <span className="text-border">|</span>
            <span>{assignment.fileSize}</span>
            <span className="text-border">|</span>
            <span>{assignment.downloads} downloads</span>
          </div>
          <Button size="sm" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
