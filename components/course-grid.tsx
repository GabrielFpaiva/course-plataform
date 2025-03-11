"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Course {
  id: string
  title: string
  instructor: string
  thumbnail: string
  duration: string
  level: string
}

export default function CourseGrid() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const fetchCourses = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setCourses([
          {
            id: "1",
            title: "JavaScript Fundamentals",
            instructor: "Alex Morgan",
            thumbnail: "/placeholder.svg?height=400&width=600",
            duration: "6h 30m",
            level: "Beginner",
          },
          {
            id: "2",
            title: "React for Beginners",
            instructor: "Jessica Lee",
            thumbnail: "/placeholder.svg?height=400&width=600",
            duration: "8h 15m",
            level: "Intermediate",
          },
          {
            id: "3",
            title: "Advanced CSS Techniques",
            instructor: "David Kim",
            thumbnail: "/placeholder.svg?height=400&width=600",
            duration: "5h 45m",
            level: "Advanced",
          },
          {
            id: "4",
            title: "Python Data Analysis",
            instructor: "Sophia Chen",
            thumbnail: "/placeholder.svg?height=400&width=600",
            duration: "10h 20m",
            level: "Intermediate",
          },
          {
            id: "5",
            title: "UI/UX Design Principles",
            instructor: "Marcus Johnson",
            thumbnail: "/placeholder.svg?height=400&width=600",
            duration: "7h 10m",
            level: "Beginner",
          },
          {
            id: "6",
            title: "Node.js Backend Development",
            instructor: "Olivia Smith",
            thumbnail: "/placeholder.svg?height=400&width=600",
            duration: "9h 30m",
            level: "Advanced",
          },
        ])
        setLoading(false)
      }, 1000)
    }

    fetchCourses()
  }, [])

  if (loading) {
    return (
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden bg-gray-900">
              <Skeleton className="aspect-video w-full" />
              <CardContent className="p-4">
                <Skeleton className="mb-2 h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
      </div>
    )
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {courses.map((course) => (
        <Link key={course.id} href={`/courses/${course.id}`}>
          <Card className="overflow-hidden bg-gray-900 transition-all hover:scale-[1.02] hover:shadow-xl">
            <div className="group relative aspect-video">
              <Image
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                fill
                className="object-cover transition-all group-hover:brightness-75"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Play className="h-6 w-6" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs">{course.duration}</div>
            </div>
            <CardContent className="p-4">
              <h3 className="mb-1 line-clamp-1 font-medium">{course.title}</h3>
              <p className="text-sm text-gray-400">{course.instructor}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="rounded-full bg-gray-800 px-2 py-1 text-xs">{course.level}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

