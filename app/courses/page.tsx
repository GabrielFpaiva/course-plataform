"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import CourseGrid from "@/components/course-grid"
import CategoryNav from "@/components/category-nav"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "development", name: "Development" },
    { id: "business", name: "Business" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "data-science", name: "Data Science" },
    { id: "personal-development", name: "Personal Development" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">All Courses</h1>
          </div>
          <div className="flex items-center gap-4">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search courses or instructors..."
                className="w-[300px] bg-gray-900 pl-8 text-sm ring-offset-gray-900 placeholder:text-gray-500 focus-visible:ring-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </header>
      <main className="w-full px-4 py-6 md:px-6 md:py-12">
        <CategoryNav categories={categories} />
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {searchQuery ? `Search Results for "${searchQuery}"` : "All Courses"}
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Sort
              </Button>
            </div>
          </div>
          <CourseGrid />
        </div>
      </main>
    </div>
  )
}

