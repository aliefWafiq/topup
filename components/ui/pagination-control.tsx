"use client"

import React, { use } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { 
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
    } from '@/components/ui/pagination'

const PaginationControl = ({totalPages}:{totalPages: number}) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get("page")) || 1

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={createPageUrl(currentPage - 1)}
                        aria-disabled={currentPage <= 1}
                        className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                </PaginationItem>
                {/* {pages.map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                        <PaginationLink isActive={currentPage === pageNumber}>{pageNumber}</PaginationLink>
                    </PaginationItem>
                ))} */}
                <PaginationItem className='text-muted-foreground text-sm'>
                    of {totalPages}
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        href={createPageUrl(currentPage + 1)}
                        aria-disabled={currentPage >= totalPages}
                        className={currentPage >= totalPages ? 'pointer-events-none opacity-05' : ''}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationControl