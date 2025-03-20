import DashboardMain from '@/components/dashboard/DashboardMain'
import React from 'react'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-[calc(100vh-60px)] relative max-w-screen">
        <DashboardMain>
            {children}
        </DashboardMain>
    </div>
  )
}

