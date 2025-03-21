import React from 'react'



const TabWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-full px-2 rounded-md overflow-scroll max-w-full min-h-[calc(100vh-60px)] max-h-[calc(100vh-60px)] relative">
        <div className='p-4 border-[1px] w-full rounded-md'>
            {children}
        </div>
    </div>
  )
}

export default TabWrapper