import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUserAstronaut } from "react-icons/fa";
import { MdFingerprint } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { useAuth } from '@/hooks/useAuth';

const tabs = [
    { name: 'Tu Cuenta', href: '/user/profile', icon: FaUserAstronaut },
    { name: 'Cambiar Contraseña', href: '/user/password', icon: MdFingerprint },
    { name: 'Gestionar Redes', href: '/user/social-dashboard', icon: IoShareSocialOutline },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Tabs() {
    const navigate = useNavigate()
    const location = useLocation()
    const currentTab = tabs.filter(tab => tab.href === location.pathname)[0].href

    const { data, isLoading } = useAuth()

    if (isLoading) return 'Cargando...'

    if (data) return (
        <div className='mb-10 mt-2 container-blog'>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-primary-800 focus:ring-primary-800"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => navigate(e.target.value)}
                    value={currentTab}
                >
                    {tabs.map((tab) => {
                        if (tab.name !== 'Gestionar Redes') {
                            return (
                                <option
                                    value={tab.href}
                                    key={tab.name}>{tab.name}</option>
                            )
                        } else {
                            if (data.role === 'writer') {
                                return (
                                    <option
                                        value={tab.href}
                                        key={tab.name}>{tab.name}</option>
                                )
                            }
                        }
                    })}
                </select>
            </div>

            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => {
                            if (tab.name !== 'Gestionar Redes') {
                                return (
                                    <Link
                                        key={tab.name}
                                        to={tab.href}
                                        className={classNames(
                                            location.pathname === tab.href
                                                ? 'border-primary-800 text-primary-800'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                            'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                                        )}
                                    >
                                        <tab.icon
                                            className={classNames(
                                                location.pathname === tab.href ? 'text-primary-800' : 'text-gray-400 group-hover:text-gray-500',
                                                '-ml-0.5 mr-2 h-5 w-5'
                                            )}
                                            aria-hidden="true"
                                        />
                                        <span>{tab.name}</span>
                                    </Link>
                                )
                            } else {
                                if (data.role === 'writer') {
                                    return (
                                        <Link
                                            key={tab.name}
                                            to={tab.href}
                                            className={classNames(
                                                location.pathname === tab.href
                                                    ? 'border-primary-800 text-primary-800'
                                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                                'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                                            )}
                                        >
                                            <tab.icon
                                                className={classNames(
                                                    location.pathname === tab.href ? 'text-primary-800' : 'text-gray-400 group-hover:text-gray-500',
                                                    '-ml-0.5 mr-2 h-5 w-5'
                                                )}
                                                aria-hidden="true"
                                            />
                                            <span>{tab.name}</span>
                                        </Link>
                                    )
                                }
                            }
                        })}
                    </nav>
                </div>
            </div>
        </div>
    )
}
