import Navbar from '@/component/shared/Navbar';
import React from 'react'

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main className='min-h-screen mt-20'>
        {children}
      </main>
    </div>
  )
}
