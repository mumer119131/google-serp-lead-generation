"use client"
import React, { useEffect } from 'react'
import TabWrapper from './TabWrapper'
import { Button } from '@/components/ui/button'
import TableLeads from './TableLeads'
import { LeadsResponse } from '@/types/leads'
import CreateLeads from './Leads/CreateLeads'
import LeadsTableSkeleton from './Leads/LeadsTableSkeleton'


const Leads = () => {
    const [loading, setLoading] = React.useState(true)
    const [leads, setLeads] = React.useState<LeadsResponse>({
        metadata: { page: 1, total: 0, resultsPerPage: 10 },
        results: []
    })
    useEffect(() => {
        const fetchLeads = async () => {
            const res = await fetch('/api/leads')
            const data = await res.json()
            setLeads(data)
            setLoading(false)
        }
        fetchLeads()
    }, [])
  return (
    <TabWrapper>
        <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">Leads</h2>
        <p className="text-sm text-gray-500">Here you can manage your leads and perform various actions like creating new leads or exporting them as CSV.</p>
      </div>
        <div className="flex gap-2">
            <CreateLeads />
            <Button className='mt-4'>Export CSV</Button>
        </div>
        {loading && <LeadsTableSkeleton />}
        <div className='max-w-full min-h-0 min-w-0 max-h-full'>
            {leads.results.length > 0 && <TableLeads leads={leads} />}
        </div>
    </TabWrapper>
  )
}

export default Leads