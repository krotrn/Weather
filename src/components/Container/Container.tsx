import React from 'react'
export default function Container({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 ${className}`}>
      {children}
    </div>
  )
}