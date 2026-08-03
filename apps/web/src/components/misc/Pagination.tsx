import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { MAX_PAGES_TO_SHOW } from '@/lib/site-config';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    category?: string;
    query?: string;
    startDate?: string;
    endDate?: string;
}

function PaginationControls({
    currentPage,
    totalPages,
    category,
    query,
    startDate,
    endDate,
}: PaginationControlsProps) {
    if (totalPages <= 1) return null;

    const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

    const makePageHref = (page: number) => {
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (query) params.set('query', query);
        if (startDate) params.set('startDate', startDate);
        if (endDate) params.set('endDate', endDate);
        params.set('page', String(page));

        const queryString = params.toString();
        return queryString ? `/articles?${queryString}` : '/articles';
    };

    const renderPaginationLinks = () => {
        const links: React.ReactNode[] = [];
        
        let startPage = Math.max(1, safeCurrentPage - Math.floor(MAX_PAGES_TO_SHOW / 2));

        const endPage = Math.min(totalPages, startPage + MAX_PAGES_TO_SHOW - 1);

        if (endPage - startPage + 1 < MAX_PAGES_TO_SHOW) {
            startPage = Math.max(1, endPage - MAX_PAGES_TO_SHOW + 1);
        }

        if (startPage > 1) {
            links.push(
                <PaginationItem key="1">
                    <PaginationLink
                        href={makePageHref(1)}
                        className="font-secondary text-foreground hover:text-primary"
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );
            if (startPage > 2) {
                links.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis className="text-muted-foreground" />
                    </PaginationItem>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            links.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href={makePageHref(i)}
                        isActive={i === safeCurrentPage}
                        className={i === safeCurrentPage ? 'font-secondary text-primary' : 'font-secondary text-foreground hover:text-primary'}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                links.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis className="text-muted-foreground" />
                    </PaginationItem>
                );
            }
            links.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        href={makePageHref(totalPages)}
                        className="font-secondary text-foreground hover:text-primary"
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return links;
    };

    return (
        <Pagination className="mt-6 justify-center">
            <PaginationContent className="font-secondary text-xs tracking-widest text-muted-foreground">
                <PaginationItem>
                    <PaginationPrevious
                        href={makePageHref(Math.max(1, safeCurrentPage - 1))}
                        aria-disabled={safeCurrentPage === 1}
                        className={safeCurrentPage === 1 ? 'pointer-events-none opacity-50 font-secondary' : 'font-secondary text-foreground hover:text-primary'}
                    />
                </PaginationItem>
                {renderPaginationLinks()}
                <PaginationItem>
                    <PaginationNext
                        href={makePageHref(Math.min(totalPages, safeCurrentPage + 1))}
                        aria-disabled={safeCurrentPage === totalPages}
                        className={safeCurrentPage === totalPages ? 'pointer-events-none opacity-50 font-secondary' : 'font-secondary text-foreground hover:text-primary'}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default PaginationControls;