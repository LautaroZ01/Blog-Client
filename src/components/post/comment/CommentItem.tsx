import { Comment, CommentFormType, Post } from "@/types/postType"
import RepliesList from "./RepliesList"
import { useState } from "react"
import ReplyForm from "./ReplyForm"
import { useAuth } from "@/hooks/useAuth"
import AuthPhoto from "@/components/auth/AuthPhoto"
import { formatDate } from "@/utils/formatUtil"
import OptionsComment from "./OptionsComment"
import { changeCommentStatus, updateComment } from "@/API/CommentAPI"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import InputComment from "./InputComment"
import { commentStatus } from "@/locales/es"
import ReportModal from "./ReportModal"

type CommentItemProps = {
    comment: Comment
    postId: Post['_id']
}
export default function CommentItem({ comment, postId }: CommentItemProps) {
    const { data, isLoading } = useAuth()
    const [showReplies, setShowReplies] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const defaultValues: CommentFormType = {
        content: comment.content
    }

    const { register, handleSubmit, formState: { errors } } = useForm<CommentFormType>({ defaultValues })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateComment,
        onSuccess: (data) => {
            toast.success(data)
            setShowEdit(false)
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
            queryClient.invalidateQueries({ queryKey: ['commentsPost', postId] })
        },
        onError: (error) => {
            toast.error(error.message)
            setShowEdit(false)
        }
    })

    const handleUpdateComment = (formData: CommentFormType) => {
        const commentForm: { formData: CommentFormType; commentId: Comment['_id']; } = {
            commentId: comment._id,
            formData
        }
        mutate(commentForm)
    }

    const { mutate: mutateChangeCommentStatus } = useMutation({
        mutationFn: changeCommentStatus,
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
            queryClient.invalidateQueries({ queryKey: ['commentsPost', postId] })
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleChangeCommentStatus = (commentId: Comment['_id']) => {
        mutateChangeCommentStatus(commentId)
    }

    if (isLoading) return 'Cargando...'

    return (
        <>
            <div className="py-6 px-4 bg-white">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <AuthPhoto photo={comment.author?.photo || ''} name={comment.author?.name || ''} size="normal" />
                        <div>
                        <strong className="text-sm">{comment.author?.name}</strong>
                        <p className="text-xs text-gray-500">{comment.createdAt && formatDate(comment.createdAt.toString())}</p>
                    </div>
                </div>
                {data &&
                <div className="flex items-center gap-2">
                    {data.role !== 'user' && comment.status && <button onClick={() => handleChangeCommentStatus(comment._id)} className="bg-accent-50 text-accent-600 p-1 rounded-full font-bold cursor-pointer"><small>{commentStatus[comment.status]}</small></button>}
                    <OptionsComment commentId={comment._id} authorId={comment.author!._id} postId={postId} editFunction={() => setShowEdit(!showEdit)} reports={comment.reports} />
                </div>
                }
            </div>
            <div className="lg:px-12 p-4 lg:py-4 my-2">
                {showEdit ? (
                    <form
                        onSubmit={handleSubmit(handleUpdateComment)}
                        noValidate
                        className="form-comment"
                    >
                        <InputComment register={register} errors={errors} />
                        <div className="flex items-center justify-end gap-2">
                            <button type="button" onClick={() => setShowEdit(false)} className="btn-secundary">Cancelar</button>
                            <button type="submit" className="btn-primary">Actualizar</button>
                        </div>
                    </form>
                ) : (
                    <p className="text-balance prose">{comment.content}</p>
                )}
            </div>
            {data && !showEdit &&
                <div className="flex items-center justify-end px-2">
                    <button
                        className="btn-secundary"
                        onClick={() => setShowReplies(!showReplies)}>
                        {showReplies ? 'Cancelar' : 'Responder'}
                    </button>
                </div>
            }
            {showReplies && (
                data &&
                <ReplyForm commentId={comment._id} postId={postId} setShowReplies={setShowReplies} data={data} />
            )}
            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-6 lg:ml-10 p-4 rounded-md bg-gray-50 inset-shadow-2xs">
                    <RepliesList replies={comment.replies} postId={postId} />
                </div>
            )}
        </div>
        <ReportModal postId={postId} />
        </>
    )
}
