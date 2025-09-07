import { getCommentsByPostId } from "@/API/CommentAPI"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation } from "react-router-dom"
import CommentListModal from "./CommentListModal"


export default function CommentListByPostId() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const postId = queryParams.get('postId')!
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['commentsPost', postId],
        queryFn: () => getCommentsByPostId(postId),
        retry: false
    })

    
    if (isError) return <Navigate to='/dashboard/post' />
    if (isLoading) return 'Cargando...'

    if(data)return (
        <CommentListModal comments={data} postId={postId} />
    )
}
