import { sendContactForm } from "@/API/UserAPI";
import InputContainer from "@/components/auth/InputContainer";
import SocialIcon from "@/components/icons/SocialIcon";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useAuth } from "@/hooks/useAuth";
import { ContactForm, WriterProfile } from "@/types/userType";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AiFillMessage } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { MdOutlineSubject } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type ContactViewProps = {
    writerInfo: WriterProfile
}

export default function ContactView({ writerInfo }: ContactViewProps) {
    const { data, isLoading } = useAuth()

    const defaultValues: ContactForm = {
        email: '',
        name: '',
        subject: '',
        message: ''
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
        defaultValues
    })

    const { mutate } = useMutation({
        mutationFn: sendContactForm,
        onSuccess: (data) => {
            toast.success(data)
            reset()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const sendMessage = (formData: ContactForm) => {
        mutate(formData)
    }

    if (isLoading) return 'Cargando...'
    return (
        <>
            <section className="container-blog py-10 flex flex-col items-center justify-center gap-6 relative" id="contact">
                <div className="absolute -z-10 size-full bg-white bg-radial-[ellipse_at_bottom] from-primary-100/60 to-white to-40%"></div>
                <AiFillMessage className="size-20 text-primary-500" />
                <h2 className="text-4xl font-bold text-gray-700 text-center">Ponte en contacto conmigo</h2>
                <p className="text-gray-500 text-center max-w-[80ch] text-balance ">Si tienes alguna pregunta, sugerencia o simplemente quieres hablar, no dudes en ponerte en contacto conmigo.</p>
                {data ? (
                    <Link to={'/chat/conversation'} className="btn-secundary">
                        Chatear
                    </Link>
                ) : (
                    <Link to={'/auth/login'} className="link-data">
                        Puedes chatear si inicies sesion
                    </Link>
                )}
                <div className="flex flex-col lg:flex-row items-center gap-4">
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
                            <small className="link-social">
                                <SocialIcon name={socialNetwork.type} size="small" />
                            </small>
                        </a>
                    ))}
                </div>

                <form
                    onSubmit={handleSubmit(sendMessage)}
                    className="flex flex-col gap-4 lg:min-w-[600px] lg:p-8 p-4 rounded-lg shadow-xl backdrop-blur-md mt-4"
                >
                    <div className="flex flex-col lg:flex-row gap-4">
                        <InputContainer>
                            <div className="form-data">
                                <LuMail className="text-gray-500 size-5" />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Ingresa tu correo"
                                    className="input-data"
                                    {...register('email',
                                        {
                                            required: 'El correo es obligatorio',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'El correo no es valido'
                                            }
                                        }
                                    )}
                                />
                            </div>
                            {errors.email && (
                                <ErrorMessage>{errors.email.message}</ErrorMessage>
                            )}
                        </InputContainer>
                        <InputContainer>
                            <div className="form-data">
                                <FaUser className="text-gray-500 lg:hidden" />
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Ingresa tu nombre"
                                    className="input-data"
                                    {...register('name',
                                        {
                                            required: 'El nombre es obligatorio'
                                        }
                                    )}
                                />
                            </div>
                            {errors.name && (
                                <ErrorMessage>{errors.name.message}</ErrorMessage>
                            )}
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
                                {...register('subject',
                                    {
                                        required: 'El asunto es obligatorio'
                                    }
                                )}
                            />
                        </div>
                        {errors.subject && (
                            <ErrorMessage>{errors.subject.message}</ErrorMessage>
                        )}
                    </InputContainer>
                    <InputContainer>
                        <textarea
                            placeholder="Ingresa tu mensaje"
                            className="border border-gray-300 p-4 rounded-md focus:outline-none"
                            rows={4}
                            id="message"
                            {...register('message',
                                {
                                    required: 'El mensaje es obligatorio'
                                }
                            )}
                        />
                        {errors.message && (
                            <ErrorMessage>{errors.message.message}</ErrorMessage>
                        )}
                    </InputContainer>
                    <button type="submit" className="btn-primary mt-6">Enviar</button>
                </form>
            </section>
        </>
    )
}
