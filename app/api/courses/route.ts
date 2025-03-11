import { NextResponse } from "next/server"
import { getCourses } from "@/lib/courses"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query") || ""
  const category = searchParams.get("category") || "all"

  const courses = getCourses(category, query)

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({ courses })
}

