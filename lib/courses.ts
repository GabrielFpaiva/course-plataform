export interface Course {
  id: string
  title: string
  instructor: string
  thumbnail: string
  duration: string
  level: string
  category: string
  description: string
}

export const courses: Course[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    instructor: "Alex Morgan",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=350&fit=crop",
    duration: "6h 30m",
    level: "Beginner",
    category: "Development",
    description: "Master the basics of JavaScript programming and build a solid foundation for web development.",
  },
  {
    id: "2",
    title: "React for Beginners",
    instructor: "Jessica Lee",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=350&fit=crop",
    duration: "8h 15m",
    level: "Intermediate",
    category: "Development",
    description: "Learn how to build modern web applications using React, the popular JavaScript library.",
  },
  {
    id: "3",
    title: "Advanced CSS Techniques",
    instructor: "David Kim",
    thumbnail: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=500&h=350&fit=crop",
    duration: "5h 45m",
    level: "Advanced",
    category: "Design",
    description: "Take your CSS skills to the next level with advanced techniques and modern best practices.",
  },
  {
    id: "4",
    title: "Python Data Analysis",
    instructor: "Sophia Chen",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=350&fit=crop",
    duration: "10h 20m",
    level: "Intermediate",
    category: "Data Science",
    description: "Learn how to analyze and visualize data using Python and popular data science libraries.",
  },
  {
    id: "5",
    title: "UI/UX Design Principles",
    instructor: "Marcus Johnson",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=350&fit=crop",
    duration: "7h 10m",
    level: "Beginner",
    category: "Design",
    description: "Discover the fundamental principles of user interface and user experience design.",
  },
  {
    id: "6",
    title: "Node.js Backend Development",
    instructor: "Olivia Smith",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&h=350&fit=crop",
    duration: "9h 30m",
    level: "Advanced",
    category: "Development",
    description: "Build scalable and efficient backend systems using Node.js and modern JavaScript.",
  },
  {
    id: "7",
    title: "Digital Marketing Essentials",
    instructor: "Ryan Thompson",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=350&fit=crop",
    duration: "6h 45m",
    level: "Beginner",
    category: "Marketing",
    description: "Learn the fundamentals of digital marketing and grow your online presence.",
  },
  {
    id: "8",
    title: "Machine Learning Basics",
    instructor: "Emma Wilson",
    thumbnail: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=500&h=350&fit=crop",
    duration: "8h 20m",
    level: "Intermediate",
    category: "Data Science",
    description: "Get started with machine learning algorithms and applications using Python.",
  },
]

export const categories = [
  { id: "all", name: "All Categories" },
  { id: "development", name: "Development" },
  { id: "design", name: "Design" },
  { id: "marketing", name: "Marketing" },
  { id: "data-science", name: "Data Science" },
]

export function getCourses(category = "all", searchQuery = ""): Course[] {
  return courses.filter(
    (course) =>
      (category === "all" || course.category.toLowerCase() === category.toLowerCase()) &&
      (course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())),
  )
}

