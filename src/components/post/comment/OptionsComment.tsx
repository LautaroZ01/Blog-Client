import { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/userType";
import { Comment, Post } from "@/types/postType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "@/API/CommentAPI";
import { toast } from "react-toastify";
import { FiFlag } from "react-icons/fi";
import { MdModeEdit, MdDelete } from "react-icons/md"
import { useNavigate } from "react-router-dom";

type OptionsCommentProps = {
    commentId: Comment['_id']
    authorId: User['_id']
    postId?: Post['_id']
    editFunction: () => void
    reports?: number
    isUser?: boolean
}

export default function OptionsComment({ commentId, authorId, postId, editFunction, reports, isUser }: OptionsCommentProps) {
    const { data } = useAuth()
    const [showOptions, setShowOptions] = useState(false)
    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const { mutate: mutateDelete } = useMutation({
        mutationFn: deleteComment,
        onSuccess: (data) => {
            toast.success(data)
            setShowOptions(false)
            if (postId) {
                queryClient.invalidateQueries({ queryKey: ['comments', postId] })
                queryClient.invalidateQueries({ queryKey: ['commentsPost', postId] })
            }
            if (isUser) {
                queryClient.invalidateQueries({ queryKey: ['userDetail', authorId] })
            }
        },
        onError: (error) => {
            toast.error(error.message)
            setShowOptions(false)
        }
    })

    const editFunctionComment = () => {
        editFunction()
        setShowOptions(false)
    }

    const handleReport = (commentRepostId: Comment['_id']) => {
        navigate(`${location.pathname}?commentRepostId=${commentRepostId}`)
        setShowOptions(false)
    }

    return (
        <div className="relative">
            <button className="btn-rounded" onClick={() => setShowOptions(!showOptions)}>
                <SlOptionsVertical />
            </button>

            {showOptions && (
                <nav className="absolute menu-animation top-10 right-0 flex items-start justify-center flex-col gap-4 bg-bg-50 px-4 py-2 rounded-md inset-shadow-2xs z-50">
                    {data && data._id !== authorId &&
                        <button onClick={() => handleReport(commentId)} className="nav-btn">
                            <FiFlag />
                            <small>Denunciar</small>
                            {reports && reports > 0 && <small className="bg-red-50 text-red-800 rounded-full px-2 py-1 font-bold">{reports}</small>}
                        </button>
                    }

                    {data && data._id === authorId && (
                        <>
                            <button onClick={editFunctionComment} className="nav-btn">
                                <MdModeEdit />
                                <small>Editar</small>
                            </button>
                            <button onClick={() => mutateDelete({ commentId })} className="nav-btn">
                                <MdDelete />
                                <small>Eliminar</small>
                            </button>
                        </>
                    )}
                </nav>
            )}
        </div>
    )
}
