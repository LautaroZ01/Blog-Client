import { autheticateUser } from "@/API/AuthAPI";
import BtnForm from "@/components/auth/BtnForm";
import HeaderAuth from "@/components/auth/HeaderAuth";
import InputContainer from "@/components/auth/InputContainer";
import Facebook from "@/components/icons/Facebook";
import Google from "@/components/icons/Google";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { UserLoginForm } from "@/types/userType";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LuMail } from "react-icons/lu";
import { MdFingerprint } from "react-icons/md";

export default function LoginView() {
    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: autheticateUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Iniciando Sesion')
            navigate('/')
        }
    })

    const handleLogin = (formData: UserLoginForm) => mutate(formData)

    return (
        <>
            <HeaderAuth
                title="Iniciar Sesion"
                text="Únete a la comunidad"
                strongText="iniciando sesión aquí"
            />

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="min-w-full md:min-w-lg max-w-full mx-auto space-y-5"
                noValidate
            >
                <InputContainer>
                    <div className="form-data">
                        <LuMail className="text-gray-500 size-5" />
                        <input
                            id="email"
                            type="email"
                            placeholder="Email de registro"
                            className="input-data"
                            {...register("email", {
                                required: "El Email es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })}
                        />
                    </div>
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </InputContainer>
                <InputContainer>
                    <div className="form-data">
                        <MdFingerprint className="text-gray-500 size-5" />
                        <input
                            type="password"
                            placeholder="Contraseña de registro"
                            className="input-data"
                            {...register("password", {
                                required: "La contraseña es obligatorio",
                            })}
                        />
                    </div>

                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </InputContainer>
                <BtnForm value="Iniciar Sesión" />
            </form>

            <nav className="flex flex-wrap md:flex-nowrap min-w-96 max-w-full mx-auto gap-6 mt-4 py-4 items-center justify-center">
                <Link
                    to={'http://localhost:3000/api/auth/google'}
                    className="flex items-center justify-center w-full space-x-2 bg-gray-100 border border-gray-200 hover:bg-gray-200 px-4 py-2 rounded-md"
                >
                    <Google className="size-5" />
                    <p className="font-bold text-sm text-gray-500">Google</p>
                </Link>
                <Link
                    to={'http://localhost:3000/api/auth/facebook'}
                    className="flex items-center justify-center w-full space-x-2 bg-gray-100 border border-gray-200 hover:bg-gray-200 px-4 py-2 rounded-md"
                >
                    <Facebook className="size-5" />
                    <p className="font-bold text-sm text-gray-500">Facebook</p>
                </Link>
            </nav>

            <nav className="flex flex-col space-y-4 p-4 mb-2">
                <Link
                    to='/auth/register'
                    className="link-data"
                >
                    ¿No tienes cuenta? Crea Una
                </Link>
                <Link
                    to='/auth/forgot-password'
                    className="link-data"
                >
                    ¿Olvidase tu constraseña? Reestablecer
                </Link>
            </nav>
        </>
    )
}
