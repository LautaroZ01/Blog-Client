import AuthPhoto from "@/components/auth/AuthPhoto";
import { AiFillMessage } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export default function WriterModal() {
    const navigate = useNavigate();
    const toggleClose = () => navigate(location.pathname, { replace: true })
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <article className="bg-white p-6 rounded-lg min-w-2xl menu-animation">
                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <AuthPhoto photo={''} name={''} size="big" />
                            <Link to="/profile/writer" className="absolute -bottom-1 -right-1 btn-rounded z-10">
                                <AiFillMessage size={24} />
                            </Link>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="font-semibold text-xl">
                                Nicolas Zuleta {' '}
                                <small className="text-gray-500 ">(dev)</small>
                            </h2>
                            <small className="text-gray-500">
                                correo@correo.com
                            </small>
                        </div>
                    </div>
                    <button
                        onClick={toggleClose}
                        type="button"
                        className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200 rounded-full p-1 hover:bg-gray-100"
                    >
                        <IoClose className="text-xl" />
                    </button>
                </header>
                <section className="mt-6 p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">Contactos</h3>
                        <div className="space-x-4">
                            <small className="px-2 py-1 rounded-full bg-accent-400/20 text-accent-400">24 años</small>
                            <small className="px-2 py-1 rounded-full bg-primary-500/20 text-primary-500">Argentina</small>
                        </div>
                    </div>
                </section>
            </article>
        </div>
    )
}
