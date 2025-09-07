import InputContainer from "@/components/auth/InputContainer"
import RichText from "@/components/post/RichText"
import ErrorMessage from "@/components/ui/ErrorMessage"
import { PostFormType } from "@/types/postType"
import { Control, FieldErrors, UseFormRegister } from "react-hook-form"

type StepOnePostProps = {
  control: Control<PostFormType>
  register: UseFormRegister<PostFormType>
  errors: FieldErrors<PostFormType>
}

export default function StepOnePost({ control, register, errors }: StepOnePostProps) {
  return (
    <section className="flex flex-col gap-4">
      <InputContainer>
        <div>
          <label
            htmlFor="title"
            className="text-sm font-semibold text-gray-800"
          >
            Titulo
          </label>
        </div>
        <div className="form-data">
          <input
            type="text"
            id="title"
            className="input-data"
            placeholder="Escribe el titulo aqui..."
            {...register("title", {
              required: "El titulo es obligatorio",
            })}
          />
        </div>
        {errors.title && (
          <ErrorMessage>{errors.title.message}</ErrorMessage>
        )}
      </InputContainer>
      <RichText name="content" control={control} />
    </section>
  )
}