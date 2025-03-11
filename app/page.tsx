import Link from "next/link"
import { Search } from "lucide-react"
import CourseGrid from "@/components/course-grid"
import CategoryNav from "@/components/category-nav"
import FeaturedCourses from "@/components/featured-courses"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default async function Home() {
  // In a real app, this would come from an API
  const featuredCourses = await getFeaturedCourses()
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">EduStream</span>
          </Link>
          <div className="flex items-center gap-4">
            <form className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search courses or instructors..."
                className="w-[300px] bg-gray-900 pl-8 text-sm ring-offset-gray-900 placeholder:text-gray-500 focus-visible:ring-gray-700"
              />
            </form>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
              Sign In
            </Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>
      <main className="w-full px-4 py-6 md:px-6 md:py-12">
        <FeaturedCourses courses={featuredCourses} />
        <div className="mt-12">
          <CategoryNav categories={categories} />
        </div>
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Popular Courses</h2>
            <Link href="/courses" className="text-sm text-gray-400 hover:text-white">
              View all
            </Link>
          </div>
          <CourseGrid />
        </section>
      </main>
    </div>
  )
}

// Mock data functions - in a real app these would fetch from an API
async function getFeaturedCourses() {
  return [
    {
      id: "1",
      title: "Web Development Masterclass",
      instructor: "Sarah Johnson",
      thumbnail: "/placeholder.svg?height=600&width=1000",
      category: "Development",
    },
    {
      id: "2",
      title: "Data Science Fundamentals",
      instructor: "Michael Chen",
      thumbnail: "/placeholder.svg?height=600&width=1000",
      category: "Data Science",
    },
    {
      id: "3",
      title: "UX/UI Design Principles",
      instructor: "Emma Rodriguez",
      thumbnail: "/placeholder.svg?height=600&width=1000",
      category: "Design",
    },
  ]
}

async function getCategories() {
  return [
    { id: "development", name: "Development" },
    { id: "business", name: "Business" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "data-science", name: "Data Science" },
    { id: "personal-development", name: "Personal Development" },
  ]
}

