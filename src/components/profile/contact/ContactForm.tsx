import InputContainer from "@/components/auth/InputContainer"
import ErrorMessage from "@/components/ui/ErrorMessage"
import { ContactFormType, contactsTypeSchema } from "@/types/userType"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { FaAd } from "react-icons/fa"
import { IoShareSocialOutline } from "react-icons/io5"

type ContactFormProps = {
    errors: FieldErrors<ContactFormType>
    register: UseFormRegister<ContactFormType>
}

const contactOptions = contactsTypeSchema.options;

export default function ContactForm({ register, errors }: ContactFormProps) {
    return (
        <>
            <InputContainer>
                <div className="form-data">
                    <IoShareSocialOutline className="text-gray-500 size-5" />
                    <select
                        id="type"
                        className="input-data capitalize"
                        {...register("type", {
                            required: "El tipo es obligatorio",
                        })}
                    >
                        <option value="">Selecciona el tipo de contacto</option>
                        {contactOptions.map((type) => (
                            <option key={type} value={type} className='capitalize'>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                {errors.type && (
                    <ErrorMessage>{errors.type.message}</ErrorMessage>
                )}
            </InputContainer>

            <InputContainer>
                <div className="form-data">
                    <FaAd className="text-gray-500 size-5" />
                    <input
                        type="text"
                        id="name"
                        className="input-data"
                        placeholder="Escribe el nombre de usuario..."
                        {...register("name", {
                            required: "El nombre de usuario es obligatorio",
                        })}
                    />
                </div>
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </InputContainer>
        </>
    )
}
