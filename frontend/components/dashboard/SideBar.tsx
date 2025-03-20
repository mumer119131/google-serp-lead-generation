import React from 'react'
import { MdDashboard } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Link from 'next/link';

interface SidebarProps {
    currentTab: string
    setCurrentTab: (tab: string) => void
}

const SideBar = (props: SidebarProps) => {
    const { currentTab, setCurrentTab } = props
    const [isOpened, setIsOpened] = React.useState(false)
    const links = [
        {
            title: 'dashboard',
            href: '/dashboard',
            icon: <MdDashboard />
        },
        {
            title: 'leads',
            href: '/leads',
            icon: <MdDashboard />
        },
        {
            title: 'profile',
            href: '/profile',
            icon: <CgProfile />
        },
        {
            title: 'settings',
            href: '/settings',
            icon: <MdOutlineSettings />
        },
        {
            title: 'logout',
            href: '/logout',
            icon: <MdOutlineLogout />
        }
    ]
  return (
    <div className={`${isOpened ? 'basis-1/5' : ''} pb-4`}>
        <div className='flex flex-col justify-between p-2 h-full bg-gray-200 dark:bg-gray-950 text-black dark:text-white rounded-tr-md rounded-br-md'>
            
            <nav className='flex flex-col items-center gap-2'>
                {links.map(link => (
                    <Link href={link.href} key={link.href} className={`flex rounded-md items-center gap-2 p-4 hover:bg-gray-900 hover:text-white w-full cursor-pointer ${currentTab.toLowerCase() === link.title.toLowerCase() ? "bg-gray-900 text-white": ""}`} onClick={() => setCurrentTab(link.title)}>
                        <span className='material-icons'>{link.icon}</span>
                        {
                            isOpened && <span className='capitalize text-sm'>{link.title}</span>
                        }
                    </Link>
                ))}

            </nav>
            <button className='flex justify-between rounded-md items-center gap-2 p-4 hover:bg-gray-900 hover:text-white w-full cursor-pointer' onClick={() => setIsOpened(!isOpened)}>
                <span className='material-icons capitalize '>{isOpened ? 'close' : <FaArrowRight/>}</span>
                {
                    isOpened && <span><FaArrowLeft/></span>
                }
            </button>
        </div>
    </div>
  )
}

export default SideBar