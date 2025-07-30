"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { triggerAchievement } from "@/components/achievements-notification"

type User = {
  id: string
  name: string
  email: string
  avatar: string
  points: number
  level: number
  achievements: string[]
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
  updateUserPoints: (points: number) => void
  addAchievement: (id: string, title: string, description: string, points?: number) => void
  hasAchievement: (id: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data
const MOCK_USER: User = {
  id: "user-1",
  name: "Demo User",
  email: "demo@avasya-lab.com",
  avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
  points: 42,
  level: 2,
  achievements: [],
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("avasya_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation for demo
    if (email && password) {
      setUser(MOCK_USER)
      localStorage.setItem("avasya_user", JSON.stringify(MOCK_USER))
      setLoading(false)

      // Trigger welcome back achievement
      setTimeout(() => {
        triggerAchievement("Welcome Back!", "You've successfully logged in to Avasya Research Lab", 5)
      }, 1500)

      return true
    }

    setLoading(false)
    return false
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation for demo
    if (name && email && password) {
      const newUser = {
        ...MOCK_USER,
        name,
        email,
        points: 10, // Starting points
        level: 1,
        achievements: ["signup"],
      }
      setUser(newUser)
      localStorage.setItem("avasya_user", JSON.stringify(newUser))
      setLoading(false)

      // Trigger first achievement
      setTimeout(() => {
        triggerAchievement("Welcome to Avasya!", "You've joined the aerospace research community", 10)
      }, 1500)

      return true
    }

    setLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("avasya_user")
  }

  const calculateLevel = (points: number): number => {
    // Simple level calculation: level = 1 + floor(points / 50)
    return 1 + Math.floor(points / 50)
  }

  const updateUserPoints = (points: number) => {
    if (user) {
      const currentLevel = user.level
      const newLevel = calculateLevel(points)
      const updatedUser = { ...user, points, level: newLevel }

      setUser(updatedUser)
      localStorage.setItem("avasya_user", JSON.stringify(updatedUser))

      // Check if user leveled up
      if (newLevel > currentLevel) {
        triggerAchievement("Level Up!", `You've reached level ${newLevel}`, 0)

        // Check for specific level achievements
        if (newLevel === 3 && !user.achievements.includes("level3")) {
          addAchievement("level3", "Rising Star", "Reached level 3 in the Avasya community", 0)
        }
      }
    }
  }

  const addAchievement = (id: string, title: string, description: string, points = 0) => {
    if (user && !user.achievements.includes(id)) {
      const updatedAchievements = [...user.achievements, id]
      const updatedPoints = user.points + points
      const updatedUser = {
        ...user,
        achievements: updatedAchievements,
        points: updatedPoints,
        level: calculateLevel(updatedPoints),
      }

      setUser(updatedUser)
      localStorage.setItem("avasya_user", JSON.stringify(updatedUser))

      // Trigger achievement notification
      triggerAchievement(title, description, points)
    }
  }

  const hasAchievement = (id: string): boolean => {
    return user?.achievements.includes(id) || false
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        updateUserPoints,
        addAchievement,
        hasAchievement,
      }}
    >
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
