import CourseGrid from "@/components/course-grid"
import CategoryNav from "@/components/category-nav"
import FeaturedCourses from "@/components/featured-courses"
import { getCourses, categories } from "@/lib/courses"

export default async function Home() {
  const featuredCourses = getCourses().slice(0, 3)

  return (
    <div className="container py-6 md:py-12">
      <FeaturedCourses courses={featuredCourses} />
      <div className="mt-12">
        <CategoryNav categories={categories} />
      </div>
      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Popular Courses</h2>
        </div>
        <CourseGrid />
      </section>
    </div>
  )
}

