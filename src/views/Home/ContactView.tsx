import InputContainer from "@/components/auth/InputContainer";
import SocialIcon from "@/components/icons/SocialIcon";
import { useAuth } from "@/hooks/useAuth";
import { WriterProfile } from "@/types/userType";
import { AiFillMessage } from "react-icons/ai";
import { LuMail } from "react-icons/lu";
import { MdOutlineSubject } from "react-icons/md";
import { Link } from "react-router-dom";

type ContactViewProps = {
    writerInfo: WriterProfile
}

export default function ContactView({ writerInfo }: ContactViewProps) {
    const {data, isLoading} = useAuth()
    if(isLoading) return 'Cargando...'
    return (
        <>
            <div className="absolute -z-10 size-full bg-white bg-radial-[ellipse_at_bottom] from-primary-100 to-white to-40%"></div>
            <section className="container-blog my-4 flex flex-col items-center justify-center min-h-screen gap-4 relative" id="contact">
                <AiFillMessage className="size-20 text-primary-500" />
                <h2 className="text-4xl font-bold text-gray-700 text-center">Ponte en contacto conmigo</h2>
                <p className="text-gray-500 text-center max-w-[80ch] text-balance ">Si tienes alguna pregunta, sugerencia o simplemente quieres hablar, no dudes en ponerte en contacto conmigo.</p>
                {data ? (
                    <Link to={'/chat/conversation'} className="btn-secundary">
                        Chatear
                    </Link>
                ) : (
                    <Link to={'/auth/login'} className="link-data">
                        Puedes chatear conmigo si inicies sesion
                    </Link>
                )}
                <div className="flex items-center gap-4">
                    {writerInfo.contacts.map((contact) => (
                        <div key={contact._id} className="flex items-center gap-2 group cursor-pointer">
                            <div className="rounded-full p-2 shadow-md group-hover:bg-gray-100 transition-colors duration-pro">
                                <SocialIcon name={contact.type} size="small" />
                            </div>
                            <span className="text-gray-500 font-semibold group-hover:text-primary-500 transition-colors duration-pro">
                                {contact.name}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    {writerInfo.socialNetworks.map((socialNetwork) => (
                        <a href={socialNetwork.url} target="_blank" key={socialNetwork._id} className="flex items-center gap-2">
                            <small className="rounded-full p-2 shadow hover:bg-gray-100 transition-colors duration-pro">
                                <SocialIcon name={socialNetwork.type} size="small" />
                            </small>
                        </a>
                    ))}
                </div>

                <form className="flex flex-col gap-4 min-w-[600px] p-8 rounded-lg shadow-xl backdrop-blur-md mt-4">
                    <div className="flex gap-4">
                        <InputContainer>
                            <div className="form-data">
                                <LuMail className="text-gray-500 size-5" />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Ingresa tu correo"
                                    className="input-data"
                                />
                            </div>
                        </InputContainer>
                        <InputContainer>
                            <div className="form-data">
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Ingresa tu nombre"
                                    className="input-data"
                                />
                            </div>
                        </InputContainer>
                    </div>
                    <InputContainer>
                        <div className="form-data">
                            <MdOutlineSubject />
                            <input
                                id="subject"
                                type="text"
                                placeholder="Ingresa el asunto"
                                className="input-data"
                            />
                        </div>
                    </InputContainer>
                    <InputContainer>
                        <textarea placeholder="Ingresa tu mensaje" className="border border-gray-300 p-4 rounded-md focus:outline-none" rows={4} />
                    </InputContainer>
                    <button type="submit" className="btn-primary mt-6">Enviar</button>
                </form>
            </section>
        </>
    )
}
