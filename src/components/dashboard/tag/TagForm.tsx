import InputContainer from "@/components/auth/InputContainer";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { TagFormType } from "@/types/postType";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FaAd } from "react-icons/fa";

type TagFormProps = {
    errors: FieldErrors<TagFormType>
    register: UseFormRegister<TagFormType>
}

export default function TagForm({ register, errors }: TagFormProps) {
    return (
        <>
            <>
                <InputContainer>
                    <div className="form-data">
                        <FaAd className="text-gray-500 size-5" />
                        <input
                            type="text"
                            id="name"
                            className="input-data"
                            {...register("name", {
                                required: "El nombre es requerido"
                            })}
                            placeholder="Escribe el nombre de la etiqueta..."
                        />
                    </div>
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </InputContainer>
            </>
        </>
    )
}
