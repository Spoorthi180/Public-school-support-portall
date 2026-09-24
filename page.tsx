"use client"

import { useState } from "react"
import { Upload, FileText, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { classes, subjects } from "@/lib/data"

export default function UploadPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setSuccess(true)
    
    // Reset after showing success
    setTimeout(() => {
      setSuccess(false)
      setFile(null)
    }, 3000)
  }

  if (success) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Upload Successful!</h3>
            <p className="text-muted-foreground">Your file has been uploaded and is now available to students.</p>
          </div>
          <Button onClick={() => setSuccess(false)}>Upload Another</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Upload Content</h1>
        <p className="text-muted-foreground">
          Upload assignments, resources, or study materials for your students
        </p>
      </div>

      <Tabs defaultValue="assignment" className="w-full">
        <TabsList>
          <TabsTrigger value="assignment">Assignment</TabsTrigger>
          <TabsTrigger value="resource">Study Resource</TabsTrigger>
        </TabsList>

        <TabsContent value="assignment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Assignment</CardTitle>
              <CardDescription>
                Create a new assignment for your students with a due date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Assignment Title</Label>
                    <Input id="title" placeholder="Enter assignment title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" type="date" required />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select required>
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
                    <Label htmlFor="class">Class</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Add instructions or details about the assignment"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload File</Label>
                  <div
                    className={`relative rounded-lg border-2 border-dashed p-8 transition-colors ${
                      dragActive
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {file ? (
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setFile(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                        <p className="mt-4 text-sm text-muted-foreground">
                          Drag and drop your file here, or{" "}
                          <label className="text-primary hover:underline cursor-pointer">
                            click to browse
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => setFile(e.target.files?.[0] || null)}
                              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png"
                            />
                          </label>
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Supported formats: PDF, Word, PowerPoint, Excel, Images (max 10MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline">
                    Save as Draft
                  </Button>
                  <Button type="submit" disabled={isLoading || !file}>
                    {isLoading ? (
                      <>
                        <Spinner className="mr-2 h-4 w-4" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Assignment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resource" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Study Resource</CardTitle>
              <CardDescription>
                Share study materials, notes, or reference documents with students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="resourceTitle">Resource Title</Label>
                    <Input id="resourceTitle" placeholder="Enter resource title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resourceType">Resource Type</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="notes">Lecture Notes</SelectItem>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="presentation">Presentation</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="resourceSubject">Subject</Label>
                    <Select required>
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
                    <Label htmlFor="resourceClass">Class</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All classes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        {classes.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Upload File</Label>
                  <div
                    className={`relative rounded-lg border-2 border-dashed p-8 transition-colors ${
                      dragActive
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {file ? (
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setFile(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                        <p className="mt-4 text-sm text-muted-foreground">
                          Drag and drop your file here, or{" "}
                          <label className="text-primary hover:underline cursor-pointer">
                            click to browse
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                          </label>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading || !file}>
                    {isLoading ? (
                      <>
                        <Spinner className="mr-2 h-4 w-4" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Resource
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
