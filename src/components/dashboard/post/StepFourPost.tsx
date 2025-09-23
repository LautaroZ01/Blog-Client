import { useFieldArray, Control, FieldErrors, UseFormRegister } from "react-hook-form"
import { PostFormType } from "@/types/postType"
import InputContainer from "@/components/auth/InputContainer"
import RichText from "@/components/post/RichText"
import ErrorMessage from "@/components/ui/ErrorMessage"
import SectionImageUpload from "./SectionImageUpload"

type StepFourPostProps = {
    control: Control<PostFormType>
    register: UseFormRegister<PostFormType>
    errors: FieldErrors<PostFormType>
}

export default function StepFourPost({ control, register, errors }: StepFourPostProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "sections",
    })

    return (
        <section className="flex flex-col gap-6">
            {fields.map((field, index) => (
                <details key={field.id} open>
                    <summary className="font-semibold text-lg">Sección {index + 1}</summary>

                    {/* Título */}
                    <InputContainer>
                        <label
                            htmlFor={`sections.${index}.title`}
                            className="text-sm font-semibold text-gray-800"
                        >
                            Título
                        </label>
                        <input
                            type="text"
                            id={`sections.${index}.title`}
                            className="input-data"
                            placeholder="Escribe el título aquí..."
                            {...register(`sections.${index}.title`, {
                                required: "El título es obligatorio",
                            })}
                        />
                        {errors.sections?.[index]?.title && (
                            <ErrorMessage>{errors.sections[index]?.title?.message}</ErrorMessage>
                        )}
                    </InputContainer>

                    {/* Editor */}
                    <RichText name={`sections.${index}.content`} control={control} />

                    {/* Imagen única */}
                    <SectionImageUpload control={control} name={`sections.${index}.thumbnail`} />

                    <button
                        type="button"
                        className="text-red-500 mt-2"
                        onClick={() => remove(index)}
                    >
                        Eliminar sección
                    </button>
                </details>
            ))}

            <button
                type="button"
                className="btn-primary"
                onClick={() => append({ title: "", content: "", thumbnail: "" })}
            >
                Agregar sección
            </button>
        </section>
    )
}
