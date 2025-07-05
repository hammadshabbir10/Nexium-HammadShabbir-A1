import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-beige focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary-navy to-primary-brown text-white hover:from-primary-navy/90 hover:to-primary-brown/90 shadow-professional hover:shadow-custom-hover hover:-translate-y-1",
        destructive: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-600/90 hover:to-red-700/90 shadow-professional hover:shadow-custom-hover hover:-translate-y-1",
        outline: "border-2 border-primary-sage/40 text-white hover:bg-primary-navy/30 hover:text-white backdrop-blur-sm bg-transparent hover:border-primary-sage/60",
        secondary: "bg-gradient-to-r from-primary-sage to-primary-beige text-primary-black hover:from-primary-sage/90 hover:to-primary-beige/90 shadow-professional hover:shadow-custom-hover hover:-translate-y-1",
        ghost: "hover:bg-primary-navy/30 hover:text-primary-beige text-white transition-colors rounded-xl",
        link: "underline-offset-4 hover:underline text-primary-beige hover:text-white font-medium",
      },
      size: {
        default: "h-12 py-3 px-6",
        sm: "h-10 px-4 rounded-lg",
        lg: "h-14 px-10 rounded-xl text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }