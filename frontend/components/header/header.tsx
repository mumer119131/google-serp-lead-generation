"use client"
import React, { useEffect, useState } from 'react'
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { logout } from '../../app/utils/auth/auth';
import { useRouter } from 'next/navigation';

export const Header = () => {
    const [currentTheme, setCurrentTheme] = useState("light")
    const router = useRouter()
    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark")
        setCurrentTheme(document.documentElement.classList.contains("dark") ? "dark" : "light")
        localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light")
    }
    useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme) {
            document.documentElement.classList.add(theme)
            setCurrentTheme(theme)
        }
    }, [])
    const logoutUser = async () => {
        await logout()
        router.push("/login")
    }
  return (
    <header className="">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold font-poppins flex items-center justify-center gap-1"><MdLeaderboard/> Leads</h1>
        <nav className="flex space-x-4">
          <button onClick={toggleTheme} className="text-gray-600 hover:text-gray-800 cursor-pointer">{
            currentTheme === "dark" ? <CiDark size={24} /> : <MdDarkMode size={24} />
            }</button>
          <button onClick={logoutUser} className="text-gray-600 hover:text-gray-800 cursor-pointer">{
                <MdOutlineLogout size={24} />
            }</button>
        </nav>
      </div>
    </header>
  )
}
