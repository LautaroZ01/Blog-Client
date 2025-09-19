import { changePassword } from "@/API/UserAPI"
import BtnForm from "@/components/auth/BtnForm"
import HeaderAuth from "@/components/auth/HeaderAuth"
import InputContainer from "@/components/auth/InputContainer"
import ErrorMessage from "@/components/ui/ErrorMessage"
import type { ChangePasswordForm } from "@/types/userType"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { LuLockKeyhole } from "react-icons/lu"
import { MdFingerprint } from "react-icons/md"
import { toast } from "react-toastify"

export default function ChangePasswordView() {
    const initialValues: ChangePasswordForm = {
        current_password: '',
        password: '',
        password_confirmation: ''
    }

    const { mutate } = useMutation({
        mutationFn: changePassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues })
    const password = watch('password');

    const handleRegister = (formData: ChangePasswordForm) => mutate(formData)


    return (
        <section>
            <HeaderAuth
                title="Cambiar Contraseña"
                text="Ingresa tu contraseña actual y"
                strongText="la nueva contraseña que deseas tener"
                isActive={false}
            />
            <form
                onSubmit={handleSubmit(handleRegister)}
                noValidate
                className="w-full md:w-xl mx-auto space-y-4 mb-6 px-2"
            >
                <InputContainer>
                    <div className="form-data">
                        <MdFingerprint className="text-gray-500 size-5" />
                        <input
                            type="password"
                            id="current_password"
                            className="input-data"
                            placeholder="Ingresa tu contraseña"
                            {...register("current_password", {
                                required: "Debes colocar tu contraseña actual",
                            })}
                        />
                    </div>
                    {errors.current_password && (
                        <ErrorMessage>{errors.current_password.message}</ErrorMessage>
                    )}
                </InputContainer>
                <InputContainer>
                    <div className="form-data">
                        <MdFingerprint className="text-gray-500 size-5" />
                        <input
                            type="password"
                            id="password"
                            className="input-data"
                            placeholder="Ingresa tu nueva contraseña"
                            {...register("password", {
                                required: "La Contraseña es obligatoria",
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
                            type="password"
                            id="password_confirmation"
                            placeholder="Repite la nueva contraseña"
                            className="input-data"
                            {...register("password_confirmation", {
                                required: "La Confirmación de Contraseña es obligatoria",
                                validate: (value) => value === password || "Las contraseñas no coinciden"
                            })}
                        />
                    </div>
                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </InputContainer>
                <BtnForm value="Cambiar Contraseñas" />
            </form>
        </section>
    )
}
