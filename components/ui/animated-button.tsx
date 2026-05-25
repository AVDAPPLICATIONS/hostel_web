import React from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

export const AnimatedButton = React.forwardRef<
  HTMLButtonElement,
  HTMLMotionProps<"button">
>(({ className, children, ...props }, ref) => {
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={cn(
        `
        transition-shadow duration-300
        hover:shadow-md
        `,
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