import React from 'react'
export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
      {children}
    </div>
  )
}