"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import type { Course } from "@/lib/courses"

interface FeaturedCoursesProps {
  courses: Course[]
}

export default function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % courses.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + courses.length) % courses.length)
  }

  const currentCourse = courses[currentIndex]

  return (
    <section className="relative w-full overflow-hidden rounded-xl bg-muted">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-[500px] w-full"
        >
          <Image
            src={currentCourse.thumbnail || "/placeholder.svg"}
            alt={currentCourse.title}
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-0 left-0 right-0 p-6 md:p-12"
          >
            <span className="mb-2 inline-block rounded bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
              {currentCourse.category}
            </span>
            <h1 className="mb-2 text-3xl font-bold text-foreground md:text-5xl">{currentCourse.title}</h1>
            <p className="mb-6 text-lg text-muted-foreground">Instructor: {currentCourse.instructor}</p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2">
                <Play className="h-4 w-4" /> Watch Now
              </Button>
              <Button size="lg" variant="outline">
                Add to Watchlist
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-background/10 text-foreground hover:bg-background/20"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-background/10 text-foreground hover:bg-background/20"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {courses.map((_, index) => (
          <button
            key={index}
            className={cn("h-2 w-2 rounded-full", index === currentIndex ? "bg-foreground" : "bg-foreground/50")}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

