import CardWrapper from '@/components/generic/CardWrapper'
import Link from 'next/link';
import React from 'react'
import { MdMarkEmailRead } from "react-icons/md";

const page = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-60px)]">
        <CardWrapper className='max-w-[25rem]'>
        <div className="text-center flex flex-col items-center space-y-2">
            <MdMarkEmailRead className='text-5xl text-green-600'/>
            <h1 className="text-2xl font-semibold">Account Verified</h1>
            <p className="text-gray-500">Thank you for verifying your email address. Your account is now fully activated and you can start using all the features.</p>
            <Link href="/dashboard" className="text-blue-500">
                Dashboard
            </Link>
        </div>
    </CardWrapper>
    </div>
  )
}

export default page