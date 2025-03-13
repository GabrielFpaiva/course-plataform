"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import CourseGrid from "@/components/course-grid"
import CategoryNav from "@/components/category-nav"
import { categories } from "@/lib/courses"

export default function CoursesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "all")

  useEffect(() => {
    const newCategory = searchParams.get("category") || "all"
    setCategory(newCategory)
  }, [searchParams])

  return (
    <div className="container py-6 md:py-12">
      <CategoryNav categories={categories} />
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{searchQuery ? `Search Results for "${searchQuery}"` : "All Courses"}</h2>
        </div>
        <CourseGrid category={category} searchQuery={searchQuery} />
      </div>
    </div>
  )
}

