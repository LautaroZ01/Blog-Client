import { Sesion } from "@/types/userType"
import AuthPhoto from "../auth/AuthPhoto"
import { Link } from "react-router-dom"
import { useState } from "react"
import { LuMessageCircle } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

type NavAuthProps = {
    user: Sesion,
    handleSession: () => void
}

export default function NavAuth({ user, handleSession }: NavAuthProps) {
    const [isMenuAuth, setIsMenuAuth] = useState(false)

    const toggleMenuAuth = () => {
        setIsMenuAuth(!isMenuAuth);
    };

    return (
        <nav className="flex items-center gap-4">
            <Link
                to={'/chat/conversation'}
                className="text-gray-600 hover:bg-primary-50 transition-colors duration-pro p-2 rounded-full shadow-lg relative"
            >
                <LuMessageCircle />
                <span className="absolute top-0 right-0 size-2 text-xs bg-red-500 rounded-full"></span>
            </Link>

            <button className="relative cursor-pointer" onClick={toggleMenuAuth}>
                <AuthPhoto photo={user.photo} name={user.name} size={'small'} />
            </button>

            <ul onMouseLeave={toggleMenuAuth} className={`${isMenuAuth ? 'block' : 'hidden'} absolute top-12 right-1 p-2 rounded-md shadow-lg menu-animation space-y-2 bg-white z-50 min-w-60`}>
                <li>
                    <div
                        className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"
                    >
                        <AuthPhoto photo={user.photo} name={user.name} size={'small'} />
                        <div className="flex flex-col">
                            <small className="font-bold">{user.name}</small>
                            <small className="text-gray-500">{user.email}</small>
                        </div>
                    </div>
                </li>
                <li>
                    <Link
                        to={'/user/profile'}
                        className="nav-btn"
                    >
                        <FaRegUser className="text-gray-500" />
                        <small>Perfil</small>
                    </Link>
                </li>
                {user.role !== 'user' && (
                    <li>
                        <Link
                            to={'/dashboard'}
                            className="nav-btn"
                        >
                            <RxDashboard className="text-gray-500" />
                            <small>Panel</small>
                        </Link>
                    </li>
                )}
                <li className="border-t border-gray-200">
                    <button
                        onClick={handleSession}
                        className="nav-btn"
                    >
                        <LuLogOut className="text-gray-500" />
                        <small>
                            Cerrar sesion
                        </small>
                    </button>
                </li>
            </ul>
        </nav>
    )
}
