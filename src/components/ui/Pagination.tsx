import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

type PaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const getVisiblePages = () => {
        const visiblePages = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) {
            endPage = Math.min(5, totalPages);
        } else if (currentPage >= totalPages - 2) {
            startPage = Math.max(totalPages - 4, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }

        return visiblePages;
    };

    const visiblePages = getVisiblePages();

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                aria-label="Página anterior"
            >
                <FiChevronLeft />
            </button>

            {visiblePages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`size-8 rounded-md cursor-pointer ${currentPage === page
                            ? 'bg-primary-400 text-white'
                            : 'hover:bg-gray-100'
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                aria-label="Página siguiente"
            >
                <FiChevronRight />
            </button>
        </div>
    );
}