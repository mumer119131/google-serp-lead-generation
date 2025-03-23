"use client"
import React from 'react'
import { Lead } from '@/types/leads'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { LeadsResponse } from '@/types/leads'
import { Checkbox } from "@/components/ui/checkbox"

interface Props {
    leads: LeadsResponse
    checkedLeads: string[]
    setCheckedLeads: (leads: string[]) => void
}
const TableLeads = (props: Props) => {
  const { leads, checkedLeads, setCheckedLeads } = props
  const leadHeaders: (keyof Lead)[] = leads.results[0] ? Object.keys(leads.results[0]) as (keyof Lead)[] : []
  
  const checkAllLeads = () => {
    const allLeads = leads.results.map((lead) => lead.id)
    if (checkedLeads.length === allLeads.length) {
      setCheckedLeads([])
    } else {
      setCheckedLeads(allLeads)
    }

  }

  const checkLead = (id: string) => {
    if (checkedLeads.includes(id)) {
      setCheckedLeads(checkedLeads.filter((leadId) => leadId !== id))
    } else {
      setCheckedLeads([...checkedLeads, id])
    }
  }
  return (
    <Table className='mt-4 max-w-full overflow-auto'>
      <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableCell className='fixed bg-white dark:bg-[#0a0a0a] !pr-4'>
                <Checkbox onCheckedChange={checkAllLeads}/>
            </TableCell>
              {
                leadHeaders && leadHeaders.map((header, index) => (
                  <TableHead key={header} className={`${index === 0 ? 'pl-10' : ''}`}>{header}</TableHead>
                ))
              }
            </TableRow>
        </TableHeader>
        {
          checkedLeads && <TableBody>
          {
              leads.results.map((lead) => (
                  <TableRow key={lead.id}>
                      <TableCell className='fixed bg-white dark:bg-[#0a0a0a] !pr-4'>
                        <Checkbox onCheckedChange={() => checkLead(lead.id)} checked={checkedLeads.includes(lead.id)} />
                      </TableCell>
                      {

                          leadHeaders && leadHeaders.map((header, index) => (
                              <TableCell key={header} className={`${index === 0 ? 'pl-10' : ''}`}>
                                  {lead[header] instanceof Date 
                                      ? lead[header].toISOString() 
                                      : lead[header]}
                              </TableCell>
                          ))
                      }
                  </TableRow>
              ))
          }
      </TableBody>
        }
    </Table>

  )
}

export default TableLeads