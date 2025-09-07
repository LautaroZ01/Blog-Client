import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NavNotAuth() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <>
            <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-primary-400 focus:outline-none"
            >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <nav
                className={`${isMenuOpen ? 'block' : 'hidden'
                    } lg:flex lg:items-center lg:gap-2 absolute lg:static top-12 right-0 z-50 lg:bg-transparent w-full lg:w-auto p-4 lg:p-0 bg-white`}
            >
                <ul className="flex flex-col lg:flex-row items-center gap-4">
                    <li>
                        <Link
                            to={'/auth/login'}
                            className="btn-secundary"
                        >
                            Iniciar Sesión
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={'/auth/register'}
                            className="btn-primary"
                        >
                            Crear Cuenta
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
