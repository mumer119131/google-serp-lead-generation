import RegisterForm from '@/components/auth/RegisterForm'
import React from 'react'

const page = () => {
    
    
  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-60px)] gap-2'>
        <RegisterForm />
    </div>
  )
}

export default page