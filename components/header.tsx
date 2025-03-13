import Link from "next/link"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">CoursePlatform</span>
        </Link>
        <div className="flex items-center gap-4">
          <form className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses or instructors..."
              className="w-[300px] bg-muted pl-8 text-sm"
            />
          </form>
          <Button variant="outline">Sign In</Button>
          <Button>Get Started</Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

