import { createReply } from "@/API/CommentAPI"
import AuthPhoto from "@/components/auth/AuthPhoto"
import { Comment, CommentFormType, Post } from "@/types/postType"
import { Sesion } from "@/types/userType"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import InputComment from "./InputComment"

type ReplyFormProps = {
    commentId: Comment['_id']
    postId: Post['_id']
    setShowReplies: (show: boolean) => void
    data: Sesion
}

export default function ReplyForm({ commentId, postId, setShowReplies, data }: ReplyFormProps) {

    const defaultValues: CommentFormType = {
        content: ""
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CommentFormType>({ defaultValues })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createReply,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
            queryClient.invalidateQueries({ queryKey: ['commentsPost', postId] })
            toast.success(data)
            reset()
            setShowReplies(false)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleReply = (formData: CommentFormType) => {
        const commentForm: { formData: CommentFormType; commentId: Comment['_id']; } = {
            commentId,
            formData
        }
        mutate(commentForm)
    }
    return (
        <div className="flex gap-2 pl-20 pr-4 mt-4 insert-animation">
            <div>
                <AuthPhoto photo={data?.photo || ''} name={data?.name || ''} size="normal" />
            </div>
            <form
                onSubmit={handleSubmit(handleReply)}
                noValidate
                className="form-comment"
            >
                <InputComment register={register} errors={errors} />
                {data && (
                    data.status === 'active' ? (
                        <div className="flex items-center justify-end">
                            <button type="submit" className="btn-secundary">Responder</button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <p className="text-gray-400">Tu cuenta esta suspendida, no puedes comentar</p>
                        </div>
                    )
                )}
            </form>

        </div>
    )
}
