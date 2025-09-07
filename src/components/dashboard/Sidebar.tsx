import { Sesion } from "@/types/userType"
import AuthPhoto from "../auth/AuthPhoto"
import SideOptions from "./SideOptions"
import { NavLink } from "react-router-dom"
import { MdHomeFilled } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { useState } from "react";
import { postOptions, userOptions } from "@/utils/dashboardUtil";

type SidebarProps = {
    user: Sesion
}

export default function Sidebar({ user }: SidebarProps) {
    const [isActive, setIsActive] = useState(true)
    const toggleActive = () => {
        setIsActive(!isActive)
    }

    return (
        <aside className={`bg-gray-100 ${isActive ? 'lg:w-1/6 w-2/6' : 'w-20 flex flex-col items-center'} h-screen p-4 transition-all duration-pro z-50`}>
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

            <nav>
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

                <SideOptions title="Usuario" options={userOptions} isActive={isActive} />
                <SideOptions title="Articulo" options={postOptions} isActive={isActive} />
            </nav>

        </aside>
    )
}
