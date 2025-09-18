import { createComment } from "@/API/CommentAPI"
import AuthPhoto from "@/components/auth/AuthPhoto"
import { useAuth } from "@/hooks/useAuth"
import { CommentFormType, Post } from "@/types/postType"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import InputComment from "./InputComment"

type CommentFormProps = {
    postId: Post['_id']
}

export default function CommentForm({ postId }: CommentFormProps) {
    const { data, isLoading } = useAuth()

    const { slug } = useParams()
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: createComment,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
            queryClient.invalidateQueries({ queryKey: ['postBySlug', slug] })
            queryClient.invalidateQueries({ queryKey: ['commentsPost', postId] })
            toast.success(data)
            reset()
        },
        onError: (error) => {
            toast.error(error.message)
            reset()
        }
    })

    const defaultValues: CommentFormType = {
        content: ''
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CommentFormType>({ defaultValues })

    const handleComment = (formData: CommentFormType) => {
        const commentForm: { formData: CommentFormType; postId: Post['_id']; } = {
            postId,
            formData
        }
        mutate(commentForm)
    }

    if (isLoading) return 'Cargando...'

    return (
        <div className="flex gap-2 bg-white p-4 rounded-md shadow-md mb-4">
            <div>
                <AuthPhoto photo={data?.photo || ''} name={data?.name || ''} size="normal" />
            </div>
            <form
                onSubmit={handleSubmit(handleComment)}
                noValidate
                className="form-comment"
            >
                <InputComment register={register} errors={errors} />
                {data ? (
                    data.status === 'active' ? (
                        <div className="flex items-center justify-end gap-2">
                            <button type="submit" className="btn-primary">Comentar</button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <p className="text-gray-400">Tu cuenta esta suspendida, no puedes comentar</p>
                        </div>
                    )
                ) : (
                    <div className="flex items-center justify-end gap-2">
                        <Link to="/auth/login" className="link-data">Inicia sesión para comentar</Link>
                    </div>
                )}
            </form>
        </div>
    )
}
