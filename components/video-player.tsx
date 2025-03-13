"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface VideoPlayerProps {
  videoId: string
  thumbnail: string
}

export default function VideoPlayer({ videoId, thumbnail }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // In a real implementation, we would use the videoId to fetch the actual video
  // For this demo, we'll use a sample video
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100
    }
  }

  const handleProgressChange = (value: number[]) => {
    const newProgress = value[0]
    setProgress(newProgress)
    if (videoRef.current) {
      videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const newProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(newProgress)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {!isPlaying && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Image src={thumbnail || "/placeholder.svg"} alt="Video thumbnail" fill className="object-cover" priority />
          <motion.button
            onClick={togglePlay}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Play className="h-8 w-8" />
          </motion.button>
        </div>
      )}

      <video
        ref={videoRef}
        className="h-full w-full"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn("absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-background/80 to-transparent p-4")}
          >
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="mb-4 [&>span:first-child]:h-1 [&>span:first-child]:bg-muted-foreground/50 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-0 [&_[role=slider]]:bg-primary [&>span:first-child_span]:bg-primary"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  className="h-8 w-8 text-foreground hover:bg-background/20"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground hover:bg-background/20">
                  <SkipBack className="h-5 w-5" />
                </Button>

                <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground hover:bg-background/20">
                  <SkipForward className="h-5 w-5" />
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="h-8 w-8 text-foreground hover:bg-background/20"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>

                  <Slider
                    value={[volume]}
                    max={100}
                    onValueChange={handleVolumeChange}
                    className="w-24 [&>span:first-child]:h-1 [&>span:first-child]:bg-muted-foreground/50 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-0 [&_[role=slider]]:bg-primary [&>span:first-child_span]:bg-primary"
                  />
                </div>

                <div className="ml-2 text-sm text-foreground">
                  {videoRef.current ? formatTime(videoRef.current.currentTime) : "0:00"} /
                  {videoRef.current ? formatTime(videoRef.current.duration || 0) : "0:00"}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleFullscreen}
                className="h-8 w-8 text-foreground hover:bg-background/20"
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

