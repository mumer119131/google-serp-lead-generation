import React from 'react'
import TabWrapper from './TabWrapper'
import { getLeadsByUserId } from '@/app/utils/db/leads'
import { headers } from 'next/headers'
import DashboardTopCards from './Dashboard/DashboardTopCards'
import LineGraph from './Dashboard/LineGraph'
import CardWrapper from '@/components/generic/CardWrapper'

const Dashboard = async () => {
  console.log('Dashboard')
  const headersList = await headers()
  const userId = headersList.get('x-user-id')
  if (!userId) {
    return <h1>Unauthorized</h1>
  }
  const leads = await getLeadsByUserId(userId)
  console.log(userId)
  return (
    <TabWrapper>
      <h1>Dashboard</h1>
      <DashboardTopCards leads={leads}/>
      <CardWrapper className='w-full my-4'>
        <LineGraph leads={leads}/>
      </CardWrapper>
    </TabWrapper>
  )
}

export default Dashboard