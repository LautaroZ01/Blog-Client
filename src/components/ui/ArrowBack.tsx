import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function ArrowBack() {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => (navigate(-1) ? navigate(-1) : navigate('/'))}
            className="rounded-full cursor-pointer flex items-center text-primary-500 justify-center hover:bg-primary-400 hover:text-white p-2 transition-colors duration-pro"
        >
            <IoIosArrowBack />
        </button>
    )
}
