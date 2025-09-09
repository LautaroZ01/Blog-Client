import { useState } from "react";
import { MdFilterList } from "react-icons/md";

interface FilterProps {
    children: React.ReactNode;
}

export default function Filter({ children }: FilterProps) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="border border-gray-300 px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"
            >
                <MdFilterList />
                Filtros
            </button>
            <div className={`${isOpen ? 'block' : 'hidden'} absolute top-12 right-0 bg-bg-50/30 backdrop-blur-sm border border-gray-300 rounded-md p-4 z-10`}>
                {children}
            </div>
        </div>
    )
}
