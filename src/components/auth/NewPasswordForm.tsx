import { updatePasswordWithToken } from "@/API/AuthAPI"
import type { ConfirmToken, NewPasswordForm } from "@/types/userType"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import InputContainer from "./InputContainer"
import ErrorMessage from "../ui/ErrorMessage"
import BtnForm from "./BtnForm"
import { MdFingerprint } from "react-icons/md"
import { LuLockKeyhole } from "react-icons/lu"

type NewPasswordFormProps = {
    token: ConfirmToken['token']
}

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
    const navigate = useNavigate()
    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate('/auth/login')
        }

    })

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            formData,
            token
        }

        mutate(data)
    }

    const password = watch('password');

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="min-w-full md:min-w-lg max-w-full mx-auto mb-10"
                noValidate
            >
                <InputContainer>
                    <div className="form-data">
                        <MdFingerprint className="text-gray-500 size-5" />
                        <input
                            type="password"
                            placeholder="Ingresa tu nueva contraseña"
                            className="input-data"
                            {...register("password", {
                                required: "El Password es obligatorio",
                                minLength: {
                                    value: 8,
                                    message: 'El Password debe ser mínimo de 8 caracteres'
                                }
                            })}
                        />
                    </div>
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </InputContainer>

                <InputContainer>
                    <div className="form-data">
                        <LuLockKeyhole className="text-gray-500 size-5" />
                        <input
                            id="password_confirmation"
                            type="password"
                            placeholder="Repite la contraseña"
                            className="input-data"
                            {...register("password_confirmation", {
                                required: "Repetir Password es obligatorio",
                                validate: value => value === password || 'Los Passwords no son iguales'
                            })}
                        />
                    </div>
                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </InputContainer>
                <BtnForm value="Establecer Contraseña" />
            </form>

        </>
    )
}
