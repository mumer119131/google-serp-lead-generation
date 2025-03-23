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
    const items: React.ReactNode[] = [];
    if (totalPages <= 1) return items;

    items.push(
      <PaginationItem key={1}>
        <PaginationLink href={`/leads?page=1`} isActive={page === 1}>
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (page > 3) {
      items.push(<PaginationItem key="start-ellipsis">...</PaginationItem>);
    }

    if (page > 2) {
      items.push(
        <PaginationItem key={page - 1}>
          <PaginationLink href={`/leads?page=${page - 1}`}>
            {page - 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (page !== 1 && page !== totalPages) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink href={`/leads?page=${page}`} isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (page < totalPages - 1) {
      items.push(
        <PaginationItem key={page + 1}>
          <PaginationLink href={`/leads?page=${page + 1}`}>
            {page + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (page < totalPages - 2) {
      items.push(<PaginationItem key="end-ellipsis">...</PaginationItem>);
    }

    items.push(
      <PaginationItem key={totalPages}>
        <PaginationLink href={`/leads?page=${totalPages}`} isActive={page === totalPages}>
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    );

    return items;
  };

  return (
    <Pagination className='mt-4'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`/leads?page=${page - 1}`} />
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem>
          <PaginationNext href={`/leads?page=${page + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default LeadsPagination