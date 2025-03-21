import { cn } from '@/lib/utils'
import React from 'react'


interface CardWrapperProps {
    children: React.ReactNode
    className?: string
}
const CardWrapper = ({children, className}: CardWrapperProps) => {
  return (
    <div className={cn('border-[1px] border-gray-200 dark:border-gray-700 w-max h-max p-4 rounded-md', className)}>{children}</div>
  )
}

export default CardWrapper