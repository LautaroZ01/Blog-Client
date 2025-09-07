import { DashboardOption } from "@/types/type"
import { NavLink } from "react-router-dom"
import DashboardIcon from "../icons/DashboardIcon"

type SideOptionsProps = {
    title: string
    options: DashboardOption[]
    isActive: boolean
}

export default function SideOptions({ title, options, isActive }: SideOptionsProps) {
    const url = '/dashboard/'
    return (
        <div className="px-4 py-2 mb-4 z-50">
            {isActive && <h3 className="text-gray-700 font-semibold mb-2">{title}</h3>}

            <ul className="flex flex-col gap-2 p-2">
                {options.map((option, index) => (
                    <li key={index}>
                        <NavLink
                            to={url + option.path}
                            className={({ isActive }) =>
                                `link-dashboard group ${isActive
                                    ? "link-dashboard-active"
                                    : "link-dashboard-not-active"
                                }`
                            }
                        >
                            <DashboardIcon name={option.path} />
                            <span className={isActive ? 'sm:block transition-all duration-pro' : 'hidden'}>
                                {option.name}
                            </span>
                            {!isActive && (
                                <small className="
                                    absolute left-full ml-2 px-2 py-1 
                                    bg-gray-800 text-white text-xs rounded
                                    opacity-0 group-hover:opacity-100 transition-opacity
                                    whitespace-nowrap z-50
                                    pointer-events-none
                                ">
                                    {option.name}
                                    <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                                </small>
                            )}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}
