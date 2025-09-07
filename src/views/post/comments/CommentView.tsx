import CommentForm from "@/components/post/comment/CommentForm";
import { Post } from "@/types/postType";
import { useQuery } from "@tanstack/react-query";
import ComentList from "../../../components/post/comment/ComentList";
import { getComments } from "@/API/CommentAPI";

type CommentViewProps = {
    postId: Post['_id']
}

export default function CommentView({ postId }: CommentViewProps) {
    const { data, isLoading } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => getComments(postId)
    })

    if (isLoading) return 'Cargando...'

    return (
        <>
            <CommentForm postId={postId} />
            {data && data.length > 0 ? <ComentList comments={data} postId={postId} /> :
                <h3 className="text-center mt-4">Aun no hay comentarios, sé el primero en comentar</h3>
            }
        </>
    )
}
