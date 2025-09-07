import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { UserRegistrationForm } from "../../types/userType";
import { toast } from "react-toastify";
import HeaderAuth from "@/components/auth/HeaderAuth";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { createAccount } from "@/API/AuthAPI";
import InputContainer from "@/components/auth/InputContainer";
import { Link } from "react-router-dom";
import BtnForm from "@/components/auth/BtnForm";
import { FaUserAstronaut } from "react-icons/fa";
import { CgRename } from "react-icons/cg";
import { LuLockKeyhole, LuMail } from "react-icons/lu";
import { CiCalendarDate } from "react-icons/ci";
import { FaMountainCity } from "react-icons/fa6";
import { MdFingerprint } from "react-icons/md";
import { countries } from "@/lib/data";

export default function RegisterView() {
    const initialValues: UserRegistrationForm = {
        name: '',
        lastname: '',
        email: '',
        birthdate: new Date(),
        country: '',
        password: '',
        password_confirmation: ''
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });
    const password = watch('password');

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })

    const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

    return (
        <>
            <HeaderAuth
                title='Crea una cuenta'
                text="Llena el formulario para"
                strongText="crear tu cuenta"
            />

            <form
                onSubmit={handleSubmit(handleRegister)}
                noValidate
                className="min-w-full md:min-w-xl max-w-full mx-auto"
            >
                <div className="flex flex-wrap md:flex-nowrap gap-2">
                    <InputContainer>
                        <div className="form-data">
                            <FaUserAstronaut className="text-gray-500 size-5" />
                            <input
                                type="text"
                                id="name"
                                className="input-data"
                                placeholder="Escribe tu nombre"
                                {...register("name", {
                                    required: "El Nombre de usuario es obligatorio",
                                })}
                            />
                        </div>
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </InputContainer>
                    <InputContainer>
                        <div className="form-data">
                            <CgRename className="text-gray-500 size-5" />
                            <input
                                type="text"
                                id="lastname"
                                className="input-data"
                                placeholder="Escribe tu apellido"
                                {...register("lastname", {
                                    required: "El Apellido de usuario es obligatorio",
                                })}
                            />
                        </div>
                        {errors.lastname && (
                            <ErrorMessage>{errors.lastname.message}</ErrorMessage>
                        )}
                    </InputContainer>
                </div>
                <InputContainer>
                    <div className="form-data">
                        <LuMail className="text-gray-500 size-5" />
                        <input
                            type="email"
                            id="email"
                            className="input-data"
                            placeholder="Escribe tu correo electronico"
                            {...register("email", {
                                required: "El Correo Electrónico es obligatorio",
                            })}
                        />
                    </div>
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </InputContainer>
                <div className="flex flex-wrap md:flex-nowrap gap-2">
                    <InputContainer>
                        <div className="form-data">
                            <CiCalendarDate className="text-gray-500 size-5" />
                            <input
                                type="date"
                                id="birthdate"
                                className="input-data"
                                {...register("birthdate", {
                                    required: "La Fecha de Nacimiento es obligatoria",
                                })}
                            />
                        </div>
                        {errors.birthdate && (
                            <ErrorMessage>{errors.birthdate.message}</ErrorMessage>
                        )}
                    </InputContainer>
                    <InputContainer>
                        <div className="form-data">
                            <FaMountainCity className="text-gray-500 size-5" />
                            <select
                                id="country"
                                className="input-data"
                                {...register("country", {
                                    required: "El País es obligatorio",
                                })}
                            >
                                <option value="">Selecciona un país</option>
                                {countries.map((country) => (
                                    <option key={country.code} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.country && (
                            <ErrorMessage>{errors.country.message}</ErrorMessage>
                        )}
                    </InputContainer>
                </div>
                <InputContainer>
                    <div className="form-data">
                        <MdFingerprint className="text-gray-500 size-5" />
                        <input
                            type="password"
                            id="password"
                            className="input-data"
                            placeholder="Ingresa tu contraseña"
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
                            placeholder="Repite la contraseña"
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
                <BtnForm value="Crear Cuenta" />
            </form>
            <nav className="flex flex-col space-y-4 p-4 mb-2">
                <Link
                    to='/auth/login'
                    className="link-data"
                >
                    ¿Ya tienes cuenta? Iniciar Sesion
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
