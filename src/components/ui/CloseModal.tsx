import { IoClose } from "react-icons/io5"
import { useNavigate } from "react-router-dom";

type CloseModalProps = {
    title: string
}

export default function CloseModal({ title }: CloseModalProps) {
    const navigate = useNavigate();
    const toggleClose = () => navigate(location.pathname, { replace: true })

    return (
        <header className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg text-gray-800">{title}</h2>
            </div>
            <button
                onClick={toggleClose}
                type="button"
                className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200 rounded-full p-1 hover:bg-gray-100"
            >
                <IoClose className="text-xl" />
            </button>
        </header>
    )
}
