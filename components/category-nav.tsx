"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface Category {
  id: string
  name: string
}

interface CategoryNavProps {
  categories: Category[]
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all")

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    if (categoryId === "all") {
      router.push("/")
    } else {
      router.push(`/courses?category=${categoryId}`)
    }
  }

  return (
    <div className="mb-6">
      <h2 className="mb-4 text-2xl font-bold">Browse by Category</h2>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={cn(
              "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted-foreground/10",
            )}
            onClick={() => handleCategoryChange(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
            {activeCategory === category.id && (
              <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" layoutId="activeCategory" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

