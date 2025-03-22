import Leads from '@/components/dashboard/tabs/Leads'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Leads />
    </Suspense>
  )
}

export default page