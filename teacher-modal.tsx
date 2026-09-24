"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Checkbox } from "@/components/ui/checkbox"
import { Teacher, classes, subjects } from "@/lib/data"

interface TeacherModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  teacher?: Teacher | null
  onSave: (teacher: Omit<Teacher, "id" | "joinDate">) => Promise<void>
}

export function TeacherModal({ open, onOpenChange, teacher, onSave }: TeacherModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    classes: [] as string[],
    phone: "",
    status: "active" as const,
  })

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name,
        email: teacher.email,
        subject: teacher.subject,
        classes: teacher.classes,
        phone: teacher.phone,
        status: teacher.status,
      })
    } else {
      setFormData({
        name: "",
        email: "",
        subject: "",
        classes: [],
        phone: "",
        status: "active",
      })
    }
  }, [teacher, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onSave(formData)
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleClass = (className: string) => {
    setFormData({
      ...formData,
      classes: formData.classes.includes(className)
        ? formData.classes.filter((c) => c !== className)
        : [...formData.classes, className],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{teacher ? "Edit Teacher" : "Add New Teacher"}</DialogTitle>
          <DialogDescription>
            {teacher ? "Update teacher information" : "Enter the details of the new teacher"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Teacher name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="teacher@school.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => setFormData({ ...formData, subject: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as "active" | "inactive" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="+1 234 567 8900"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Assigned Classes</Label>
            <div className="grid grid-cols-2 gap-2 rounded-lg border border-border p-4">
              {classes.map((className) => (
                <div key={className} className="flex items-center gap-2">
                  <Checkbox
                    id={className}
                    checked={formData.classes.includes(className)}
                    onCheckedChange={() => toggleClass(className)}
                  />
                  <Label htmlFor={className} className="text-sm font-normal cursor-pointer">
                    {className}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Saving...
                </>
              ) : (
                teacher ? "Update Teacher" : "Add Teacher"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
