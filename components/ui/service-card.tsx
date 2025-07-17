import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react" // Import LucideIcon type

export interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon // Use LucideIcon for the icon prop
  href?: string
  className?: string
}

export function ServiceCard({
  title,
  description,
  icon: Icon, // Destructure and rename to Icon for JSX rendering
  href,
  className,
}: ServiceCardProps) {
  const Card = href ? "a" : "div"
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border-t",
        "bg-gradient-to-b from-muted/50 to-muted/10",
        "p-4 text-start sm:p-6",
        "hover:from-muted/60 hover:to-muted/20",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-colors duration-300",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center rounded-full bg-primary/10 p-2">
          <Icon className="h-6 w-6 text-primary" /> {/* Render the icon */}
        </div>
        <h3 className="text-md font-semibold leading-none">{title}</h3>
      </div>
      <p className="sm:text-md mt-4 text-sm text-muted-foreground">{description}</p>
    </Card>
  )
}
