import { Sesion } from "@/types/userType"
import AuthPhoto from "../auth/AuthPhoto"
import SideOptions from "./SideOptions"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { MdHomeFilled } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { useState } from "react";
import { postOptions, userOptions } from "@/utils/dashboardUtil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "@/API/AuthAPI";
import { toast } from "react-toastify";
import socket from "@/lib/socket";
import { LuLogOut } from "react-icons/lu";
import { FaUserAstronaut } from "react-icons/fa";

type SidebarProps = {
    user: Sesion
}

export default function Sidebar({ user }: SidebarProps) {
    const [isActive, setIsActive] = useState(true)
    const navigate = useNavigate()
    const toggleActive = () => {
        setIsActive(!isActive)
    }

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: logoutUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['user'] })
            queryClient.invalidateQueries({ queryKey: ['conversationsList'] })
            socket.disconnect()
            navigate('/')
        }
    })

    const handleSession = () => {
        mutate()
    }

    return (
        <aside className={`bg-gray-100 ${isActive ? 'lg:w-1/6 w-2/6 flex flex-col' : 'w-20 flex flex-col items-center'} h-screen p-4 transition-all duration-pro z-50`}>
            <button
                onClick={toggleActive}
                className={`flex cursor-pointer items-center w-full ${isActive ? 'sm:gap-4 sm:px-4 sm:justify-start bg-white' : 'justify-center'} transition-all duration-pro mb-4 py-2 rounded-md`}
            >
                <div>
                    <AuthPhoto photo={user.photo} name={user.name} size="small" />
                </div>
                <div className={isActive ? 'sm:block text-left transition-all duration-pro' : 'hidden'}>
                    <h2 className="font-semibold">{user.name}</h2>
                    <small className="text-gray-500">{user.email}</small>
                </div>
            </button>

            <nav className="grow">
                <ul className={`mb-4 flex flex-col gap-2 ${isActive ? 'p-2' : 'py-2 items-center'} transition-all duration-pro`}>
                    <li>
                        <NavLink to={'/'}
                            className={({ isActive }) =>
                                `link-dashboard group ${isActive
                                    ? "link-dashboard-active"
                                    : "link-dashboard-not-active"
                                }`
                            }
                        >
                            <MdHomeFilled />
                            <span className={isActive ? 'sm:block transition-all duration-pro z-10' : 'hidden'}>Inicio</span>
                            {!isActive && (
                                <small className="
                                    absolute left-full ml-2 px-2 py-1 
                                    bg-gray-800 text-white text-xs rounded
                                    opacity-0 group-hover:opacity-100 transition-opacity
                                    whitespace-nowrap z-50
                                    pointer-events-none
                                ">
                                    Inicio
                                    <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                                </small>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/dashboard'}
                            className={({ isActive }) =>
                                `link-dashboard group ${isActive
                                    ? "link-dashboard-active"
                                    : "link-dashboard-not-active"
                                }`
                            }
                        >
                            <RxDashboard />
                            <span className={isActive ? 'sm:block transition-all duration-pro z-10' : 'hidden'}>Dashboard</span>
                            {!isActive && (
                                <small className="
                                    absolute left-full ml-2 px-2 py-1 
                                    bg-gray-800 text-white text-xs rounded
                                    opacity-0 group-hover:opacity-100 transition-opacity
                                    whitespace-nowrap z-50
                                    pointer-events-none
                                ">
                                    Dashboard
                                    <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                                </small>
                            )}
                        </NavLink>
                    </li>
                </ul>

                {user.role === 'admin' && (<SideOptions title="Usuario" options={userOptions} isActive={isActive} />)}
                <SideOptions title="Articulo" options={postOptions} isActive={isActive} />
            </nav>
            <nav className="py-2 border-t border-gray-300">
                <ul className={`mb-4 flex flex-col gap-2 ${isActive ? 'p-2' : 'py-2 items-center'} transition-all duration-pro`}>
                    <li>
                        <Link
                            to={'/user/profile'}
                            className="link-dashboard group cursor-pointer link-dashboard-not-active w-full"
                        >
                            <FaUserAstronaut />
                            <span className={isActive ? 'sm:block transition-all duration-pro' : 'hidden'}>
                                Ver Perfil
                            </span>
                            {!isActive && (
                                <small className="
                                    absolute left-full ml-2 px-2 py-1 
                                    bg-gray-800 text-white text-xs rounded
                                    opacity-0 group-hover:opacity-100 transition-opacity
                                    whitespace-nowrap z-50
                                    pointer-events-none
                                ">
                                    Ver Perfil
                                    <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                                </small>
                            )}
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={handleSession}
                            className="link-dashboard group cursor-pointer link-dashboard-not-active w-full"
                        >
                            <LuLogOut />
                            <span className={isActive ? 'sm:block transition-all duration-pro' : 'hidden'}>
                                Cerrar sesion
                            </span>
                            {!isActive && (
                                <small className="
                                    absolute left-full ml-2 px-2 py-1 
                                    bg-gray-800 text-white text-xs rounded
                                    opacity-0 group-hover:opacity-100 transition-opacity
                                    whitespace-nowrap z-50
                                    pointer-events-none
                                ">
                                    Cerrar sesion
                                    <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                                </small>
                            )}
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
