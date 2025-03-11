"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
}

interface CategoryNavProps {
  categories: Category[]
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="mb-6">
      <h2 className="mb-4 text-2xl font-bold">Browse by Category</h2>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
        <button
          className={cn(
            "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
            activeCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700",
          )}
          onClick={() => setActiveCategory("all")}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700",
            )}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

