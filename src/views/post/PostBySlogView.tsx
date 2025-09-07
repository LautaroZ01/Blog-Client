import { getPostBySlug } from "@/API/PostAPI"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import PostView from "./PostView"

export default function PostBySlogView() {

    const { slug } = useParams()

    const { data, isLoading } = useQuery({
        queryKey: ['postBySlug', slug],
        queryFn: () => getPostBySlug(slug!)
    })

    if (isLoading) return 'Cargando...'

    if (data) return (
        <PostView post={data} />
    )
}
