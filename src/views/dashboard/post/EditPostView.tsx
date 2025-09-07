import { getPostByIdFromEdit } from "@/API/PostAPI";
import EditPostForm from "@/components/dashboard/post/EditPostForm";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function EditPostView() {
    const params = useParams()
    const postId = params.postId!

    const { data, isLoading } = useQuery({
        queryKey: ['postEdit', postId],
        queryFn: () => getPostByIdFromEdit(postId)
    })

    if (isLoading) return 'Cargando...'

    if(data) return (
        <EditPostForm post={data}/>
    )
}
