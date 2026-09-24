"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { User, UserRole, mockUsers } from "./data"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo purposes, accept any credentials and create a user based on role
    const mockUser: User = {
      id: crypto.randomUUID(),
      name: role === "admin" ? "Dr. Sarah Johnson" : 
            role === "teacher" ? "Mr. Robert Smith" : 
            role === "student" ? "John Doe" : "Michael Doe",
      email,
      role,
      class: role === "student" ? "Class 10-A" : undefined,
      subject: role === "teacher" ? "Mathematics" : undefined,
    }
    
    setUser(mockUser)
    return true
  }

  const logout = () => {
    setUser(null)
  }

  const register = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      role,
      class: role === "student" ? "Class 10-A" : undefined,
      subject: role === "teacher" ? "General" : undefined,
    }
    
    setUser(newUser)
    return true
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
