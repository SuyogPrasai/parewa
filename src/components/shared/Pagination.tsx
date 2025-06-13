
import PaginationControlsProps from '@/types/utilities';
import { ITEMS_PER_PAGE, MAX_PAGES_TO_SHOW } from '@/config/site-config';
import { useEffect, useMemo, useCallback, JSX, useState } from 'react';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const renderPaginationLinks = useCallback(() => {
        const links: JSX.Element[] = [];
        let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2));
        let endPage = Math.min(totalPages, startPage + MAX_PAGES_TO_SHOW - 1);

        if (endPage - startPage + 1 < MAX_PAGES_TO_SHOW) {
            startPage = Math.max(1, endPage - MAX_PAGES_TO_SHOW + 1);
        }

        if (startPage > 1) {
            links.push(
                <PaginationItem key="1">
                    <PaginationLink onClick={() => onPageChange(1)} className="cursor-pointer">
                        1
                    </PaginationLink>
                </PaginationItem>
            );
            if (startPage > 2) {
                links.push(<PaginationItem key="ellipsis-start"><PaginationEllipsis /></PaginationItem>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            links.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => onPageChange(i)}
                        isActive={i === currentPage}
                        className="cursor-pointer"
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                links.push(<PaginationItem key="ellipsis-end"><PaginationEllipsis /></PaginationItem>);
            }
            links.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink onClick={() => onPageChange(totalPages)} className="cursor-pointer">
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return links;
    }, [currentPage, totalPages, onPageChange]);

    return (
        <>
            <Pagination className="mt-3">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onPageChange(currentPage - 1)}
                            aria-disabled={currentPage === 1}
                            tabIndex={currentPage === 1 ? -1 : undefined}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                    </PaginationItem>
                    {renderPaginationLinks()}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onPageChange(currentPage + 1)}
                            aria-disabled={currentPage === totalPages}
                            tabIndex={currentPage === totalPages ? -1 : undefined}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
};

export default PaginationControls;