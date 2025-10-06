import { changeCommentStatus, updateComment } from '@/API/CommentAPI'
import AuthPhoto from '@/components/auth/AuthPhoto'
import { Comment, CommentFormType, Post, Reply } from '@/types/postType'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import OptionsComment from './OptionsComment'
import { formatDate } from '@/utils/formatUtil'
import InputComment from './InputComment'
import { commentStatus } from '@/locales/es'
import { useAuth } from '@/hooks/useAuth'
import { Author } from '@/types/userType'

type ReplyItemProps = {
    reply: Reply
    postId?: Post['_id']
    isUser?: boolean
    authorId?: Author['_id']
}

export default function ReplyItem({ reply, postId, isUser, authorId }: ReplyItemProps) {
    const { data } = useAuth()
    const [showEdit, setShowEdit] = useState(false)
    const defaultValues: CommentFormType = {
        content: reply.content
    }

    const { register, handleSubmit, formState: { errors } } = useForm<CommentFormType>({
        defaultValues
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateComment,
        onSuccess: (data) => {
            toast.success(data)
            setShowEdit(false)
            if (postId) {
                queryClient.invalidateQueries({ queryKey: ['comments', postId] })
                queryClient.invalidateQueries({ queryKey: ['commentsPost', postId] })
            }
            if (isUser && authorId) {
                queryClient.invalidateQueries({ queryKey: ['userDetail', authorId] })
            }
        },
        onError: (error) => {
            toast.error(error.message)
            setShowEdit(false)
        }
    })

    const handleUpdateComment = (formData: CommentFormType) => {
        const commentForm: { formData: CommentFormType; commentId: Comment['_id']; } = {
            commentId: reply._id,
            formData
        }
        mutate(commentForm)
    }

    const { mutate: mutateChangeCommentStatus } = useMutation({
        mutationFn: changeCommentStatus,
        onSuccess: (data) => {
            toast.success(data)
            if (postId) {
                queryClient.invalidateQueries({ queryKey: ['comments', postId] })
                queryClient.invalidateQueries({ queryKey: ['commentsPost', postId] })
            }

            if (isUser && authorId) {
                queryClient.invalidateQueries({ queryKey: ['userDetail', authorId] })
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleChangeCommentStatus = (commentId: Comment['_id']) => {
        mutateChangeCommentStatus(commentId)
    }


    return (
        <>
            <div className="flex items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-2">
                    <AuthPhoto photo={reply.author?.photo || ''} name={reply.author?.name || ''} size="normal" />
                    <div>
                        <strong className="text-sm">{reply.author?.name}</strong>
                        <p className="text-xs text-gray-500">{reply.createdAt && formatDate(reply.createdAt.toString())}</p>
                    </div>
                </div>
                {data &&
                    <div className="flex items-center gap-2">
                        {data.role !== 'user' && reply.status && (
                            data.role === 'admin' ? (
                                <button onClick={() => handleChangeCommentStatus(reply._id)} className="bg-accent-50 text-accent-600 p-1 rounded-full font-bold cursor-pointer"><small>{commentStatus[reply.status]}</small></button>

                            ) : (
                                <div className="bg-accent-50 text-accent-600 p-1 rounded-full font-bold"><small>{commentStatus[reply.status]}</small></div>
                            )
                        )}
                        <OptionsComment commentId={reply._id} authorId={reply.author!._id} postId={postId} editFunction={() => setShowEdit(!showEdit)} reports={reply.reports} isUser={isUser} />
                    </div>
                }
            </div>
            <div className="lg:px-12 p-4 lg:py-4 my-4">
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
                    <p className="text-balance prose">{reply.content}</p>
                )}
            </div>
        </>
    )
}
