import React from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary'
}

export const AnimatedButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(({ className, children, variant = 'primary', ...props }, ref) => {
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={cn(
        `
        transition-shadow duration-300
        hover:shadow-md
        `,
        variant === 'primary' ? 'btn-slide-primary' : 'btn-slide-secondary',
        className
      )}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {children as React.ReactNode}
      </span>
    </motion.button>
  )
})

AnimatedButton.displayName = 'AnimatedButton'