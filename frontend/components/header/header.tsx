"use client"
import React, { useEffect } from 'react'
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { GrCubes } from "react-icons/gr";
import { MdOutlineLogout } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThermeContext';
import { useAuth } from '@/context/AuthContext';
import { logoutUser } from '@/app/utils/auth/auth';
import { FaRegUserCircle } from "react-icons/fa";
import Link from 'next/link';

export const Header = () => {
    const {logout, isAuthenticated} = useAuth()
    const {theme, toggleTheme} = useTheme()
    const router = useRouter()
    
    const toggleThemeMode = () => {
        document.documentElement.classList.toggle("dark")
        toggleTheme()
    }
    useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme) {
            document.documentElement.classList.add(theme)
        }
    }, [])
    const logoutUserSite = async () => {
        await logoutUser()
        logout()
        router.push("/login")
    }
  return (
    <header className="">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-poppins"><Link href='/' className='flex items-center justify-center gap-1'><GrCubes/> &nbsp; SERP<b>Leads</b></Link></h1>
        <nav className="flex space-x-4">
          <button onClick={toggleThemeMode} className="text-gray-600 hover:text-gray-800 cursor-pointer">{
            theme === "dark" ? <CiDark size={24} /> : <MdDarkMode size={24} />
            }</button>
          {
            isAuthenticated && <button onClick={logoutUserSite} className="text-gray-600 hover:text-gray-800 cursor-pointer">
                    <MdOutlineLogout size={24} />
            </button>
            }
            {
            isAuthenticated && <button onClick={() => router.push("/profile")} className="text-gray-600 hover:text-gray-800 cursor-pointer">
                    <FaRegUserCircle size={24} /> 
            </button>

            }
        </nav>
      </div>
    </header>
  )
}
