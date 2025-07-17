"use client"
import { cn } from "@/lib/utils"
import type React from "react"

import { Utensils, Sparkles, HeartHandshake } from "lucide-react" // Updated icons

interface DisplayCardProps {
  className?: string
  icon?: React.ReactNode
  title?: string
  description?: string
  date?: string
  iconClassName?: string
  titleClassName?: string
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-red-300" />, // Changed to red
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-red-500", // Changed to red
  titleClassName = "text-red-500", // Changed to red
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className,
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-red-800 p-1">{icon}</span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg">{description}</p>
      <p className="text-muted-foreground">{date}</p>
    </div>
  )
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[]
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      icon: <Utensils className="size-4 text-red-300" />,
      title: "Dine-In Experience",
      description: "Enjoy our cozy ambiance and impeccable service.",
      date: "Daily",
      iconClassName: "text-red-500",
      titleClassName: "text-red-500",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Sparkles className="size-4 text-red-300" />,
      title: "Catering Services",
      description: "Bring Bella Italia to your special events.",
      date: "Book in advance",
      iconClassName: "text-red-500",
      titleClassName: "text-red-500",
      className:
        "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <HeartHandshake className="size-4 text-red-300" />,
      title: "Private Events",
      description: "Host your gatherings in our elegant rooms.",
      date: "By appointment",
      iconClassName: "text-red-500",
      titleClassName: "text-red-500",
      className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
    },
  ]
  const displayCards = cards || defaultCards
  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  )
}
