/**
 * Component Template
 * 
 * Copy this template to create new UI components following the daycare UI patterns.
 * Replace 'MyComponent' with your component name.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Define variants for different visual styles and sizes
 */
const myComponentVariants = cva(
  // Base classes applied to all variants
  "rounded-lg transition-all duration-300 font-body",
  {
    variants: {
      // Visual style variants
      variant: {
        default: "bg-card text-card-foreground border border-border",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        ghost: "hover:bg-muted text-foreground",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
      },
      // Size variants
      size: {
        sm: "px-3 py-2 text-sm",
        default: "px-4 py-3 text-base",
        lg: "px-6 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Component props
 * Extends HTML div attributes and adds variant props
 */
interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {
  /**
   * Add custom props here
   */
  // Example: isActive?: boolean;
}

/**
 * Main component with forwarded ref
 */
const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(myComponentVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </div>
    )
  }
)
MyComponent.displayName = "MyComponent"

export { MyComponent, myComponentVariants, type MyComponentProps }

/**
 * Usage Example:
 * 
 * import { MyComponent } from '@/components/ui/my-component';
 * 
 * <MyComponent variant="primary" size="lg">
 *   Content goes here
 * </MyComponent>
 */
