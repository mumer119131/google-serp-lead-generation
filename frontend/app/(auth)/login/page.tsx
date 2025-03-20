import React from 'react'
import LoginForm from '@/components/auth/LoginForm'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-60px)] gap-2'>
        <LoginForm />
    </div>
  )
}

export default page