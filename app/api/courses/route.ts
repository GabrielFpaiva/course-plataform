import { NextResponse } from "next/server"

// This would be replaced with actual API integration in a real app
export async function GET(request: Request) {
  // Parse URL to get search params
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")
  const category = searchParams.get("category")

  // Mock database of courses
  const courses = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      instructor: "Alex Morgan",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "6h 30m",
      level: "Beginner",
      category: "Development",
    },
    {
      id: "2",
      title: "React for Beginners",
      instructor: "Jessica Lee",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "8h 15m",
      level: "Intermediate",
      category: "Development",
    },
    {
      id: "3",
      title: "Advanced CSS Techniques",
      instructor: "David Kim",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "5h 45m",
      level: "Advanced",
      category: "Design",
    },
    {
      id: "4",
      title: "Python Data Analysis",
      instructor: "Sophia Chen",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "10h 20m",
      level: "Intermediate",
      category: "Data Science",
    },
    {
      id: "5",
      title: "UI/UX Design Principles",
      instructor: "Marcus Johnson",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "7h 10m",
      level: "Beginner",
      category: "Design",
    },
    {
      id: "6",
      title: "Node.js Backend Development",
      instructor: "Olivia Smith",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "9h 30m",
      level: "Advanced",
      category: "Development",
    },
    {
      id: "7",
      title: "Digital Marketing Essentials",
      instructor: "Ryan Thompson",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "6h 45m",
      level: "Beginner",
      category: "Marketing",
    },
    {
      id: "8",
      title: "Business Analytics",
      instructor: "Emma Wilson",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "8h 20m",
      level: "Intermediate",
      category: "Business",
    },
  ]

  // Filter courses based on query parameters
  let filteredCourses = [...courses]

  if (query) {
    const searchQuery = query.toLowerCase()
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery) || course.instructor.toLowerCase().includes(searchQuery),
    )
  }

  if (category) {
    filteredCourses = filteredCourses.filter((course) => course.category.toLowerCase() === category.toLowerCase())
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({ courses: filteredCourses })
}

