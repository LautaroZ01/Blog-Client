import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"

type PaginationProps = {
    page: number
    totalPages: number
    onPageChange: (newPage: number) => void
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    if(totalPages < 2) return null

    return (
        <div className="flex justify-center mt-4 gap-4">
            <button
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="btn-page"
            >
                <MdKeyboardArrowLeft size={20} />
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`font-semibold px-4 rounded-lg cursor-pointer transition-colors duration-pro ${page === p ? "text-primary-400 bg-primary-500/10" : " hover:bg-gray-500/10 text-gray-500"
                        }`}
                >
                    <p>{p}</p>
                </button>
            ))}

            <button
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className="btn-page"
            >
                <MdKeyboardArrowRight size={20} />
            </button>
        </div>
    )
}
