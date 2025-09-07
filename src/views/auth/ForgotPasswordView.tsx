import { forgotPassword } from "@/API/AuthAPI";
import BtnForm from "@/components/auth/BtnForm";
import HeaderAuth from "@/components/auth/HeaderAuth";
import InputContainer from "@/components/auth/InputContainer";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { ForgotPasswordForm } from "@/types/userType";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { LuMail } from "react-icons/lu";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })

    const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)

    return (
        <>
            <HeaderAuth
                title="Recuperar contraseña"
                text="¿Olvidaste tu constraseña? coloca tu email"
                strongText="y reestablece tu constraseña"
            />

            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="min-w-full md:min-w-96 max-w-full mx-auto"
                noValidate
            >
                <InputContainer>
                    <div className="form-data">
                        <LuMail className="text-gray-500 size-5" />
                        <input
                            id="email"
                            type="email"
                            placeholder="Email de Registro"
                            className="input-data"
                            {...register("email", {
                                required: "El Email de registro es obligatorio",
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
                <BtnForm value="Enviar Instrucciones" />
            </form>

            <nav className="flex flex-col space-y-4 p-4 mb-2">
                <Link
                    to='/auth/login'
                    className="link-data"
                >
                    ¿Ya tienes cuenta? Iniciar Sesión
                </Link>

                <Link
                    to='/auth/register'
                    className="link-data"
                >
                    ¿No tienes cuenta? Crea una
                </Link>
            </nav>
        </>
    )
}
