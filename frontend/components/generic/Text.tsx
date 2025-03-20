import { cn } from '@/lib/utils'
import React from 'react'


type TextProps = {
    children: React.ReactNode
    className?: string
    size?: 'sm' | 'md' | 'lg'
}
const Text = (props: TextProps) => {
    const { children, className, size = 'sm' } = props
  return (
    <p className={cn('text-black dark:text-white '+`text-${size}`, className)}>{children}</p>
  )
}

export default Text