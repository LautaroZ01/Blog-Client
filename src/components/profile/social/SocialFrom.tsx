import InputContainer from "@/components/auth/InputContainer"
import ErrorMessage from "@/components/ui/ErrorMessage"
import { SocialNetworkForm, socialNetworksTypeSchema } from "@/types/userType"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { FaAd } from "react-icons/fa"
import { GoRelFilePath } from "react-icons/go"
import { IoShareSocialOutline } from "react-icons/io5"

type SocialFromProps = {
    errors: FieldErrors<SocialNetworkForm>
    register: UseFormRegister<SocialNetworkForm>
}

const socialNetworkOptions = socialNetworksTypeSchema.options;

export default function SocialFrom({ register, errors }: SocialFromProps) {
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
                        <option value="">Selecciona el tipo de red social</option>
                        {socialNetworkOptions.map((type) => (
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


            <InputContainer>
                <div className="form-data">
                    <GoRelFilePath className="text-gray-500 size-5" />
                    <input
                        type="text"
                        id="url"
                        className="input-data"
                        placeholder="Escribe el link de la pagina"
                        {...register("url", {
                            required: "El link es obligatorio",
                        })}
                    />
                </div>
                {errors.url && (
                    <ErrorMessage>{errors.url.message}</ErrorMessage>
                )}
            </InputContainer>

        </>
    )
}
