import CardWrapper from '@/components/generic/CardWrapper'
import { Lead } from '@/types/leads'
import React from 'react'
import { SiGoogleadsense } from "react-icons/si";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";

interface DashboardTopCardsProps {
    leads: Lead[]
}
const DashboardTopCards = (props: DashboardTopCardsProps) => {
    const { leads } = props
    const leadsScrapedThisWeek = leads.filter(lead => {
        const today = new Date()
        const leadDate = new Date(lead.crawled_at)
        return today.getDate() - leadDate.getDate() <= 7
    })
    const leadsMailed = leads.filter(lead => lead.status === 'mailed')
    const leadsScraped = leads.filter(lead => lead.status === 'scraped')
  return (
    <div className='flex gap-4'>
        <CardWrapper className='basis-1/4 flex justify-between'>
            <div>
                <h3 className='text-sm text-gray-800 dark:text-gray-400'>Total Leads</h3>
                <p className='font-thin text-3xl text-black dark:text-gray-200'>{leads.length}</p>
                <p className='text-xs text-gray-500'>Total leads by far.</p>
            </div>
            <SiGoogleadsense className='text-xl text-gray-700 dark:text-gray-300'/>
        </CardWrapper>
        <CardWrapper className='basis-1/4 flex justify-between'>
            <div>
                <h3 className='text-sm text-gray-800 dark:text-gray-400'>Weekly Leads</h3>
                <p className='font-thin text-3xl text-black dark:text-gray-200'>{leadsScrapedThisWeek.length}</p>
                <p className='text-xs text-gray-500'>Current Week leads.</p>
            </div>
            <BsCalendar2WeekFill className='text-lg text-gray-700 dark:text-gray-300'/>
        </CardWrapper>
        <CardWrapper className='basis-1/4 flex justify-between'>
            <div>
                <h3 className='text-sm text-gray-800 dark:text-gray-400'>Pending Leads</h3>
                <p className='font-thin text-3xl text-black dark:text-gray-200'>{leadsScraped.length}</p>
                <p className='text-xs text-gray-500'>Pending to be mailed leads.</p>
            </div>
            <MdEmail className='text-xl text-gray-700 dark:text-gray-300'/>
        </CardWrapper>
        <CardWrapper className='basis-1/4 flex justify-between'>
            <div>
                <h3 className='text-sm text-gray-800 dark:text-gray-400'>Mailed Leads</h3>
                <p className='font-thin text-3xl text-black dark:text-gray-200'>{leadsMailed.length}</p>
                <p className='text-xs text-gray-500'>Mailed leads to clients.</p>
            </div>
            <MdPendingActions className='text-xl text-gray-700 dark:text-gray-300'/>
        </CardWrapper>
        
    </div>
  )
}

export default DashboardTopCards