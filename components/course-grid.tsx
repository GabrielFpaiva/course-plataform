"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Course } from "@/lib/courses"
import { motion } from "framer-motion"

interface CourseGridProps {
  initialCourses?: Course[]
  category?: string
  searchQuery?: string
}

export default function CourseGrid({ initialCourses, category = "all", searchQuery = "" }: CourseGridProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses || [])
  const [loading, setLoading] = useState(!initialCourses)

  useEffect(() => {
    if (!initialCourses) {
      fetchCourses()
    }
  }, [category, searchQuery, initialCourses])

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/courses?category=${category}&query=${searchQuery}`)
      const data = await response.json()
      setCourses(data.courses)
    } catch (error) {
      console.error("Failed to fetch courses:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
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
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link href={`/courses/${course.id}`}>
            <Card className="overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg">
              <div className="group relative aspect-video">
                <Image
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover transition-all group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground">
                    <Play className="h-6 w-6" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 rounded bg-background/70 px-2 py-1 text-xs text-foreground">
                  {course.duration}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="mb-1 line-clamp-1 font-medium">{course.title}</h3>
                <p className="text-sm text-muted-foreground">{course.instructor}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="rounded-full bg-muted px-2 py-1 text-xs">{course.level}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

