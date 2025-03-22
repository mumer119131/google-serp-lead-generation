import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Metadata {
  page: number;
  total: number;
  resultsPerPage: number;
};

interface LeadsPaginationProps {
  metadata: Metadata
} 

const LeadsPagination = ({ metadata }: LeadsPaginationProps) => {
  const { page, total, resultsPerPage } = metadata;
  const totalPages = Math.ceil(total / resultsPerPage);

  const renderPaginationItems = () => {
  const items = [];
  for (let i = 1; i <= totalPages; i++) {
    items.push(
    <PaginationItem key={i}>
      <PaginationLink href={`/leads?page=${i}`} isActive={i === page}>
      {i}
      </PaginationLink>
    </PaginationItem>
    );
  }
  return items;
  };

  return (
  <Pagination className='mt-4'>
    <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href={`/leads?page=${page-1}`} />
    </PaginationItem>
    {renderPaginationItems()}
    <PaginationItem>
      <PaginationNext href={`/leads?page=${page+1}`} />
    </PaginationItem>
    </PaginationContent>
  </Pagination>
  )
}

export default LeadsPagination