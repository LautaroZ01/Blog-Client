import { useFieldArray, Control, FieldErrors, UseFormRegister } from "react-hook-form"
import { PostFormType } from "@/types/postType"
import InputContainer from "@/components/auth/InputContainer"
import RichText from "@/components/post/RichText"
import ErrorMessage from "@/components/ui/ErrorMessage"
import SectionImageUpload from "./SectionImageUpload"
import { MdDelete } from "react-icons/md"

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
                <details key={field.id} className="p-2 shadow-lg rounded-lg space-y-2 mt-2">
                    <summary className="font-semibold text-lg cursor-pointer text-gray-500 flex justify-between items-center">
                        <p>
                            Sección {index + 1}
                        </p>
                        <button
                            type="button"
                            className="btn-rounded-delete"
                            onClick={() => remove(index)}
                        >
                            <MdDelete />
                        </button>
                    </summary>

                    <input
                        type="hidden"
                        {...register(`sections.${index}._id`)}
                        defaultValue={field._id || ""}
                    />

                    <SectionImageUpload
                        control={control}
                        name={`sections.${index}.thumbnail`}
                    />

                    <InputContainer>
                        <label
                            htmlFor={`sections.${index}.title`}
                            className="text-sm font-semibold text-gray-800 mt-4"
                        >
                            Título
                        </label>
                        <div className="form-data">
                            <input
                                type="text"
                                id={`sections.${index}.title`}
                                className="input-data"
                                placeholder="Escribe el título aquí..."
                                defaultValue={field.title}
                                {...register(`sections.${index}.title`, {
                                    required: "El título es obligatorio",
                                })}
                            />
                        </div>
                        {errors.sections?.[index]?.title && (
                            <ErrorMessage>{errors.sections[index]?.title?.message}</ErrorMessage>
                        )}
                    </InputContainer>

                    <RichText
                        name={`sections.${index}.content`}
                        control={control}
                    />
                </details>
            ))}

            <button
                type="button"
                className="btn-primary mt-4"
                onClick={() => append({ title: "", content: "", thumbnail: "" })}
            >
                Agregar sección
            </button>
        </section>
    )
}
