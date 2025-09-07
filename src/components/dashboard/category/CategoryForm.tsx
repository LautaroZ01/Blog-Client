import InputContainer from "@/components/auth/InputContainer";
import ErrorMessage from "@/components/ui/ErrorMessage";
import type { CategoryFormType } from "@/types/postType";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FaAd } from "react-icons/fa";

type CategoryFormProps = {
    errors: FieldErrors<CategoryFormType>
    register: UseFormRegister<CategoryFormType>
}

export default function CategoryForm({ register, errors }: CategoryFormProps) {
    return (
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
                        placeholder="Escribe el nombre de la categoria..."
                    />
                </div>
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </InputContainer>

            <InputContainer>
                <div className="form-data">
                    <textarea
                        id="description"
                        className="input-data"
                        rows={5}
                        placeholder="Escribe la descripcion..."
                        {...register("description", {
                            minLength: {
                                value: 8,
                                message: "La descripcion debe tener al menos 8 caracteres",
                            },
                        })}
                    ></textarea>
                </div>
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </InputContainer>
        </>
    )
}
