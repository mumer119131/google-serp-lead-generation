
"use client";
import React, { useEffect } from 'react'
import SideBar from '../../../components/dashboard/SideBar'
import { ThemeProvider } from '@/context/ThermeContext';
import { Header } from '@/components/header/header';


const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const [currentTab, setCurrentTab] = React.useState('dashboard')
    useEffect(() => {
        const url = window.location.pathname;
        const tab = url.split('/')[1];
        console.log(tab)
        if (tab) {
            setCurrentTab(tab)
        }
    }
    , [])
    // const tabs = ['dashboard', 'users', 'settings', 'profile']
    return (
      <ThemeProvider>
        <Header />
        <div className='flex h-[calc(100vh-60px)] relative max-w-screen'>
            <SideBar currentTab={currentTab} setCurrentTab={setCurrentTab}/>
            <div className="flex-grow min-w-0">
                {children}  
            </div>
        </div>
      </ThemeProvider>
  )
}

export default Layout