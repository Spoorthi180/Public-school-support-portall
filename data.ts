// Mock data for the School Support Portal

export type UserRole = "admin" | "teacher" | "student" | "parent"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  class?: string
  subject?: string
}

export interface Student {
  id: string
  name: string
  email: string
  class: string
  rollNo: string
  status: "active" | "inactive"
  parentName: string
  parentEmail: string
  phone: string
  address: string
  joinDate: string
}

export interface Teacher {
  id: string
  name: string
  email: string
  subject: string
  classes: string[]
  phone: string
  status: "active" | "inactive"
  joinDate: string
}

export interface Assignment {
  id: string
  title: string
  subject: string
  teacherId: string
  teacherName: string
  class: string
  uploadDate: string
  dueDate: string
  fileUrl: string
  fileType: "pdf" | "docx" | "pptx" | "xlsx" | "image"
  fileSize: string
  description: string
  downloads: number
}

export interface Resource {
  id: string
  title: string
  subject: string
  class: string
  type: "notes" | "pdf" | "video" | "presentation"
  uploadDate: string
  fileUrl: string
  fileSize: string
  uploadedBy: string
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderRole: UserRole
  receiverId: string
  receiverName: string
  content: string
  timestamp: string
  read: boolean
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "assignment" | "message"
  timestamp: string
  read: boolean
}

// Mock Students
export const mockStudents: Student[] = [
  { id: "1", name: "John Doe", email: "john@school.edu", class: "Class 10-A", rollNo: "001", status: "active", parentName: "Michael Doe", parentEmail: "michael@email.com", phone: "+1 234 567 8901", address: "123 Main St", joinDate: "2024-01-15" },
  { id: "2", name: "Jane Wilson", email: "jane@school.edu", class: "Class 10-A", rollNo: "002", status: "active", parentName: "David Wilson", parentEmail: "david@email.com", phone: "+1 234 567 8902", address: "456 Oak Ave", joinDate: "2024-01-15" },
  { id: "3", name: "Mike Brown", email: "mike@school.edu", class: "Class 10-B", rollNo: "003", status: "active", parentName: "James Brown", parentEmail: "james@email.com", phone: "+1 234 567 8903", address: "789 Pine Rd", joinDate: "2024-02-01" },
  { id: "4", name: "Sarah Miller", email: "sarah@school.edu", class: "Class 9-A", rollNo: "004", status: "active", parentName: "Robert Miller", parentEmail: "robert@email.com", phone: "+1 234 567 8904", address: "321 Elm St", joinDate: "2024-01-20" },
  { id: "5", name: "Tom Anderson", email: "tom@school.edu", class: "Class 9-B", rollNo: "005", status: "inactive", parentName: "Chris Anderson", parentEmail: "chris@email.com", phone: "+1 234 567 8905", address: "654 Maple Dr", joinDate: "2023-09-01" },
  { id: "6", name: "Emma Taylor", email: "emma@school.edu", class: "Class 10-A", rollNo: "006", status: "active", parentName: "Lisa Taylor", parentEmail: "lisa@email.com", phone: "+1 234 567 8906", address: "987 Cedar Ln", joinDate: "2024-01-15" },
  { id: "7", name: "Alex Johnson", email: "alex@school.edu", class: "Class 10-B", rollNo: "007", status: "active", parentName: "Karen Johnson", parentEmail: "karen@email.com", phone: "+1 234 567 8907", address: "147 Birch Ave", joinDate: "2024-02-10" },
  { id: "8", name: "Olivia White", email: "olivia@school.edu", class: "Class 9-A", rollNo: "008", status: "active", parentName: "Nancy White", parentEmail: "nancy@email.com", phone: "+1 234 567 8908", address: "258 Spruce St", joinDate: "2024-01-25" },
]

// Mock Teachers
export const mockTeachers: Teacher[] = [
  { id: "1", name: "Mr. Robert Smith", email: "robert@school.edu", subject: "Mathematics", classes: ["Class 10-A", "Class 10-B", "Class 9-A"], phone: "+1 234 567 8910", status: "active", joinDate: "2020-08-15" },
  { id: "2", name: "Ms. Emily Davis", email: "emily@school.edu", subject: "English", classes: ["Class 10-A", "Class 9-A", "Class 9-B"], phone: "+1 234 567 8911", status: "active", joinDate: "2019-06-01" },
  { id: "3", name: "Dr. James Wilson", email: "james@school.edu", subject: "Science", classes: ["Class 10-A", "Class 10-B"], phone: "+1 234 567 8912", status: "active", joinDate: "2018-08-20" },
  { id: "4", name: "Mrs. Linda Brown", email: "linda@school.edu", subject: "History", classes: ["Class 9-A", "Class 9-B"], phone: "+1 234 567 8913", status: "active", joinDate: "2021-01-10" },
  { id: "5", name: "Mr. David Lee", email: "david@school.edu", subject: "Computer Science", classes: ["Class 10-A", "Class 10-B", "Class 9-A", "Class 9-B"], phone: "+1 234 567 8914", status: "inactive", joinDate: "2022-03-15" },
]

// Mock Assignments
export const mockAssignments: Assignment[] = [
  { id: "1", title: "Algebra Equations Practice", subject: "Mathematics", teacherId: "1", teacherName: "Mr. Robert Smith", class: "Class 10-A", uploadDate: "2024-03-15", dueDate: "2024-03-22", fileUrl: "/files/algebra-practice.pdf", fileType: "pdf", fileSize: "2.4 MB", description: "Complete all exercises from page 45-50", downloads: 24 },
  { id: "2", title: "Shakespeare Essay Guidelines", subject: "English", teacherId: "2", teacherName: "Ms. Emily Davis", class: "Class 10-A", uploadDate: "2024-03-14", dueDate: "2024-03-28", fileUrl: "/files/shakespeare-essay.docx", fileType: "docx", fileSize: "1.2 MB", description: "Write a 1000-word essay on Hamlet", downloads: 18 },
  { id: "3", title: "Chemistry Lab Report Template", subject: "Science", teacherId: "3", teacherName: "Dr. James Wilson", class: "Class 10-A", uploadDate: "2024-03-13", dueDate: "2024-03-20", fileUrl: "/files/lab-report.docx", fileType: "docx", fileSize: "856 KB", description: "Use this template for your lab reports", downloads: 32 },
  { id: "4", title: "World War II Presentation", subject: "History", teacherId: "4", teacherName: "Mrs. Linda Brown", class: "Class 9-A", uploadDate: "2024-03-12", dueDate: "2024-03-26", fileUrl: "/files/ww2-presentation.pptx", fileType: "pptx", fileSize: "5.8 MB", description: "Group presentation guidelines", downloads: 15 },
  { id: "5", title: "Python Programming Basics", subject: "Computer Science", teacherId: "5", teacherName: "Mr. David Lee", class: "Class 10-B", uploadDate: "2024-03-10", dueDate: "2024-03-24", fileUrl: "/files/python-basics.pdf", fileType: "pdf", fileSize: "3.1 MB", description: "Complete the coding exercises", downloads: 28 },
  { id: "6", title: "Geometry Worksheet", subject: "Mathematics", teacherId: "1", teacherName: "Mr. Robert Smith", class: "Class 10-B", uploadDate: "2024-03-08", dueDate: "2024-03-15", fileUrl: "/files/geometry.pdf", fileType: "pdf", fileSize: "1.8 MB", description: "Triangles and circles problems", downloads: 21 },
]

// Mock Resources
export const mockResources: Resource[] = [
  { id: "1", title: "Calculus Fundamentals", subject: "Mathematics", class: "Class 10-A", type: "pdf", uploadDate: "2024-03-10", fileUrl: "/files/calculus.pdf", fileSize: "4.2 MB", uploadedBy: "Mr. Robert Smith" },
  { id: "2", title: "English Grammar Guide", subject: "English", class: "Class 10-A", type: "pdf", uploadDate: "2024-03-08", fileUrl: "/files/grammar.pdf", fileSize: "2.8 MB", uploadedBy: "Ms. Emily Davis" },
  { id: "3", title: "Physics Lecture Notes", subject: "Science", class: "Class 10-B", type: "notes", uploadDate: "2024-03-05", fileUrl: "/files/physics-notes.pdf", fileSize: "3.5 MB", uploadedBy: "Dr. James Wilson" },
  { id: "4", title: "History Timeline", subject: "History", class: "Class 9-A", type: "presentation", uploadDate: "2024-03-01", fileUrl: "/files/history-timeline.pptx", fileSize: "6.2 MB", uploadedBy: "Mrs. Linda Brown" },
  { id: "5", title: "Programming Tutorial", subject: "Computer Science", class: "All Classes", type: "video", uploadDate: "2024-02-28", fileUrl: "/files/programming.mp4", fileSize: "125 MB", uploadedBy: "Mr. David Lee" },
]

// Mock Messages
export const mockMessages: Message[] = [
  { id: "1", senderId: "1", senderName: "Dr. Sarah Johnson", senderRole: "admin", receiverId: "2", receiverName: "Mr. Robert Smith", content: "Please submit the quarterly report by Friday.", timestamp: "2024-03-15T10:30:00", read: true },
  { id: "2", senderId: "parent1", senderName: "Michael Doe", senderRole: "parent", receiverId: "2", receiverName: "Mr. Robert Smith", content: "I would like to discuss John's progress in Mathematics.", timestamp: "2024-03-15T09:15:00", read: false },
  { id: "3", senderId: "2", senderName: "Mr. Robert Smith", senderRole: "teacher", receiverId: "4", receiverName: "John Doe", content: "Great work on your last assignment!", timestamp: "2024-03-14T14:45:00", read: true },
  { id: "4", senderId: "3", senderName: "Ms. Emily Davis", senderRole: "teacher", receiverId: "1", receiverName: "Dr. Sarah Johnson", content: "The English department meeting is rescheduled to Monday.", timestamp: "2024-03-14T11:20:00", read: true },
]

// Mock Notifications
export const mockNotifications: Notification[] = [
  { id: "1", title: "New Assignment", message: "Algebra Equations Practice has been uploaded", type: "assignment", timestamp: "2024-03-15T10:00:00", read: false },
  { id: "2", title: "Message Received", message: "You have a new message from Mr. Robert Smith", type: "message", timestamp: "2024-03-15T09:30:00", read: false },
  { id: "3", title: "Deadline Reminder", message: "Chemistry Lab Report is due in 2 days", type: "warning", timestamp: "2024-03-14T15:00:00", read: true },
  { id: "4", title: "Grade Updated", message: "Your Mathematics grade has been updated", type: "success", timestamp: "2024-03-14T12:00:00", read: true },
  { id: "5", title: "School Notice", message: "Parent-teacher meeting scheduled for next week", type: "info", timestamp: "2024-03-13T09:00:00", read: true },
]

// Stats for dashboards
export const adminStats = {
  totalStudents: 458,
  totalTeachers: 32,
  totalClasses: 24,
  activeAssignments: 18,
  pendingMessages: 12,
  upcomingEvents: 5,
}

export const teacherStats = {
  totalStudents: 120,
  activeClasses: 4,
  assignmentsPending: 6,
  submissionsToReview: 24,
}

export const studentStats = {
  pendingAssignments: 5,
  completedAssignments: 12,
  averageGrade: 85,
  attendance: 96,
}

// Classes list
export const classes = [
  "Class 9-A",
  "Class 9-B",
  "Class 10-A",
  "Class 10-B",
  "Class 11-A",
  "Class 11-B",
  "Class 12-A",
  "Class 12-B",
]

// Subjects list
export const subjects = [
  "Mathematics",
  "English",
  "Science",
  "History",
  "Computer Science",
  "Physics",
  "Chemistry",
  "Biology",
]
