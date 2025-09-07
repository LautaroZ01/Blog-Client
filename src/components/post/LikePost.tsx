import { dislikePost, likePost } from "@/API/PostAPI"
import { useAuth } from "@/hooks/useAuth"
import { Post } from "@/types/postType"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { FaHeart } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

type LikePostProps = {
    postId: Post['_id']
    likes: Post['likes']
}

export default function LikePost({ postId, likes }: LikePostProps) {
    const { data } = useAuth()
    const params = useParams()
    const slug = params.slug!

    const [isLiked, setIsLiked] = useState(data ? likes.includes(data._id) : false)  

    const queryClient = useQueryClient()
    const mutateLike = useMutation({
        mutationFn: likePost,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            setIsLiked(true)
            queryClient.invalidateQueries({ queryKey: ['homePosts'] })
            if(slug){
                queryClient.invalidateQueries({ queryKey: ['postBySlug', slug] })
            }
        }
    })

    const mutateUnlike = useMutation({
        mutationFn: dislikePost,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            setIsLiked(false)
            queryClient.invalidateQueries({ queryKey: ['homePosts'] })
            if(slug){
                queryClient.invalidateQueries({ queryKey: ['postBySlug', slug] })
            }
        }
    })

    const handleLike = async () => {
        if (data) {
            await mutateLike.mutateAsync(postId)
        }else{
            toast.error('Debes iniciar sesión para likear un post')
        }
    }
    
    const handleDislike = async () => {
        if (data) {
            await mutateUnlike.mutateAsync(postId)
        }
    }
    
    return (
        <button className={`flex items-center gap-1 cursor-pointer ${isLiked ? 'text-primary-400' : ''}`} onClick={isLiked ? handleDislike : handleLike}>
            <FaHeart className="inline mr-1" />
            {likes.length}
        </button>
    )
}
