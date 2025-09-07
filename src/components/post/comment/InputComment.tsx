import ErrorMessage from "@/components/ui/ErrorMessage";
import { CommentFormType } from "@/types/postType";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type InputCommentProps = {
    register: UseFormRegister<CommentFormType>
    errors: FieldErrors<CommentFormType>
}

export default function InputComment({ register, errors }: InputCommentProps) {
    return (
        <>
            <textarea
                id="content"
                placeholder="Escribe tu comentario..."
                className="input-data h-20 border border-gray-300 rounded-md"
                {...register('content', {
                    required: 'El contenido del comentario no debe estar vacio',
                    maxLength: {
                        value: 300,
                        message: 'El contenido del comentario no debe tener mas de 300 caracteres'
                    }
                })}
            ></textarea>
            {
                errors.content && (
                    <ErrorMessage>{errors.content?.message}</ErrorMessage>
                )
            }
        </>
    )
}
