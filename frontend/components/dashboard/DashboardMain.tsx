"use client";
import React, { useEffect } from 'react'
import SideBar from './SideBar'

interface DashboardMainProps {
    children: React.ReactNode;
}
const DashboardMain = (props: DashboardMainProps) => {
    const { children } = props;
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
    <>
        <SideBar currentTab={currentTab} setCurrentTab={setCurrentTab}/>
        <div className="flex-grow min-w-0">
            {children}  
        </div>
    </>
  )
}

export default DashboardMain