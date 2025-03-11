import Link from "next/link"
import { ArrowLeft, Clock, BarChart, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import VideoPlayer from "@/components/video-player"

interface CoursePageProps {
  params: {
    id: string
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  // In a real app, this would fetch from an API
  const course = await getCourseById(params.id)

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="w-full flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Browse</span>
          </Link>
          <div className="ml-auto">
            <Button>Enroll Now</Button>
          </div>
        </div>
      </header>
      <main className="w-full px-4 py-6 md:px-6 md:py-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <VideoPlayer videoId={course.videoId} thumbnail={course.thumbnail} />
            <div className="mt-6">
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="mt-2 text-gray-400">Instructor: {course.instructor}</p>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <BarChart className="h-4 w-4" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Award className="h-4 w-4" />
                  <span>{course.rating} Rating</span>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-bold">About this Course</h2>
                <p className="mt-2 text-gray-300">{course.description}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
              <h2 className="text-xl font-bold">Course Content</h2>
              <div className="mt-4 space-y-4">
                {course.modules.map((module, index) => (
                  <div key={index} className="border-b border-gray-800 pb-4 last:border-0">
                    <h3 className="font-medium">{module.title}</h3>
                    <ul className="mt-2 space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">{lesson.title}</span>
                          <span className="text-xs text-gray-500">{lesson.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Mock data function - in a real app this would fetch from an API
async function getCourseById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    id,
    title: "Web Development Masterclass",
    instructor: "Sarah Johnson",
    thumbnail: "/placeholder.svg?height=600&width=1000",
    videoId: "sample-video-id",
    duration: "12h 30m",
    level: "Intermediate",
    rating: "4.8/5",
    description:
      "This comprehensive web development course covers everything from HTML and CSS basics to advanced JavaScript frameworks. You'll learn responsive design, DOM manipulation, API integration, and modern development workflows. By the end of this course, you'll be able to build complete, professional websites from scratch.",
    modules: [
      {
        title: "Module 1: HTML & CSS Fundamentals",
        lessons: [
          { title: "Introduction to HTML", duration: "15:30" },
          { title: "HTML Document Structure", duration: "22:45" },
          { title: "CSS Basics", duration: "28:10" },
          { title: "CSS Layout Models", duration: "35:20" },
        ],
      },
      {
        title: "Module 2: JavaScript Essentials",
        lessons: [
          { title: "JavaScript Syntax", duration: "20:15" },
          { title: "Variables and Data Types", duration: "18:30" },
          { title: "Functions and Scope", duration: "25:45" },
          { title: "DOM Manipulation", duration: "32:10" },
        ],
      },
      {
        title: "Module 3: Responsive Design",
        lessons: [
          { title: "Mobile-First Approach", duration: "24:30" },
          { title: "Media Queries", duration: "19:45" },
          { title: "Flexbox Layout", duration: "28:20" },
          { title: "CSS Grid System", duration: "31:15" },
        ],
      },
    ],
  }
}

