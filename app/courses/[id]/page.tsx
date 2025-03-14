import Link from "next/link"
import { ArrowLeft, Clock, BarChart, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import VideoPlayer from "@/components/video-player"
import { getCourses } from "@/lib/courses"

interface CoursePageProps {
  params: {
    id: string
  }
}

export const dynamicParams = true;

export default async function CoursePage({ params }: CoursePageProps) {
  const course = getCourses().find((c) => c.id === params.id)
  console.log("Cursos disponíveis:", course)

  if (!course) {
    return <div className="container py-12 text-center">Course not found</div>
  }

  return (
    <div className="container py-6 md:py-12">
      <div className="mb-6">
        <Link href="/courses" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Browse</span>
        </Link>
      </div>
      <div className="grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2">
          <VideoPlayer videoId={course.id} thumbnail={course.thumbnail} />
          <div className="mt-6">
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="mt-2 text-muted-foreground">Instructor: {course.instructor}</p>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart className="h-4 w-4" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4" />
                <span>4.8 Rating</span>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-bold">About this Course</h2>
              <p className="mt-2 text-muted-foreground">{course.description}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-bold">Course Content</h2>
            <div className="mt-4 space-y-4">
              {/* This is a placeholder. In a real app, you'd map over actual course modules */}
              {[1, 2, 3].map((module) => (
                <div key={module} className="border-b border-border pb-4 last:border-0">
                  <h3 className="font-medium">Module {module}: Introduction</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Lesson 1: Getting Started</span>
                      <span className="text-xs text-muted-foreground">15:30</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Lesson 2: Basic Concepts</span>
                      <span className="text-xs text-muted-foreground">22:45</span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button className="w-full">Enroll Now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

