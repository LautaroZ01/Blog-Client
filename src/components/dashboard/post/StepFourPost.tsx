import { PostFormType } from "@/types/postType"
import { Control, FieldErrors, UseFormRegister } from "react-hook-form"

type StepFourPostProps = {
    control: Control<PostFormType>
    register: UseFormRegister<PostFormType>
    errors: FieldErrors<PostFormType>
}

export default function StepFourPost({ control, register, errors }: StepFourPostProps) {
    return (
        <section className="flex flex-col gap-4">
            <h1>Etapa 4</h1>
        </section>
    )
}
