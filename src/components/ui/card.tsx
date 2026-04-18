import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardShellClasses =
  "group fdc-card-surface relative overflow-hidden rounded-xl text-card-foreground shadow-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform fdc-card-reveal";

const interactiveCardClasses =
  "cursor-pointer border border-border/80 bg-card/90 backdrop-blur-sm hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl dark:bg-card/80";

const premiumCardClasses =
  "border border-border/70 bg-linear-to-br from-primary/[0.06] via-card to-secondary/[0.08] backdrop-blur-md hover:-translate-y-1 hover:border-primary/25 hover:shadow-2xl";

const cardVariants = cva(
  cardShellClasses,
  {
    variants: {
      variant: {
        default: "border border-border bg-card",
        outlined: "border-2 border-border bg-card",
        elevated: "border border-border/80 bg-card shadow-md hover:shadow-xl",
        gradient: "border border-border/60 bg-linear-to-br from-primary/5 via-card to-secondary/5",
        feature: "rounded-[var(--radius-lg)] border border-border/60 bg-card p-1 shadow-lg",
        data: "rounded-md border border-border/50 bg-muted/20 shadow-none",
        interactive: interactiveCardClasses,
        premium: premiumCardClasses,
        clay: premiumCardClasses,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> { }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, children, ...props }, ref) => (
    <div
      ref={ref}
      data-variant={variant ?? "default"}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    >
      {children}
    </div>
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight font-rubik transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:text-primary",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

