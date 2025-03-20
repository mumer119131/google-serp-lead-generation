"use client"
import React, { useEffect } from 'react'
import TabWrapper from './TabWrapper'
import { Button } from '@/components/ui/button'
import TableLeads from './TableLeads'
import { LeadsResponse } from '@/types/leads'

const Leads = () => {
    const [leads, setLeads] = React.useState<LeadsResponse>({
        metadata: { page: 1, total: 0, resultsPerPage: 10 },
        results: []
    })
    useEffect(() => {
        const fetchLeads = async () => {
            const res = await fetch('/api/leads')
            const data = await res.json()
            setLeads(data)
        }
        fetchLeads()
    }, [])
  return (
    <TabWrapper>
        <h1 className='text-3xl font-bold'>Leads</h1>
        <div className="flex gap-2">
            <Button className='mt-4'>Create New Lead</Button>
            <Button className='mt-4'>Export CSV</Button>
        </div>
        <div className='overflow-x-auto max-w-full'>
            {leads.results.length > 0 && <TableLeads leads={leads} />}
        </div>
    </TabWrapper>
  )
}

export default Leads