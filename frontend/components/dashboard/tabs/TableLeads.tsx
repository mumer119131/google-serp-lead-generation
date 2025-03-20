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

interface Props {
    leads: LeadsResponse
}
const TableLeads = (props: Props) => {
  const { leads } = props
  const leadHeaders: (keyof Lead)[] = leads.results[0] ? Object.keys(leads.results[0]) as (keyof Lead)[] : []
  return (
    <Table className='mt-4 max-w-full overflow-auto'>
      <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
            <TableRow>
              {
                leadHeaders && leadHeaders.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))
              }
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                leads.results.map((lead) => (
                    <TableRow key={lead.id}>
                        {
                            leadHeaders && leadHeaders.map((header) => (
                                <TableCell key={header}>
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
    </Table>

  )
}

export default TableLeads