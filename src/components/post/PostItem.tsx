import { Post } from "@/types/postType"
import { Link } from "react-router-dom"
import AuthPhoto from "../auth/AuthPhoto"
import { formatDate } from "@/utils/formatUtil"

type PostItemProps = {
    post: Post
}

export default function PostItem({ post }: PostItemProps) {
    return (
        <Link
            to={`/post/${post.slug}`}
            className="border border-gray-200 rounded-md h-full flex flex-col shadow-md hover:shadow-xl group transition-shadow duration-pro"
        >
            <div className="relative overflow-hidden">
                <img
                    src={post.images[0] || '/default-img.webp'}
                    alt={post.title}
                    className="rounded-lg group-hover:scale-105 transition-transform duration-pro"
                />
                <small className="absolute bottom-2 right-2 badget-category">
                    {post.category.name}
                </small>
            </div>

            <article className="flex flex-col gap-2 p-4 grow">
                <h2 className="font-semibold text-lg text-gray-700 group-hover:text-primary-500 transition-colors duration-pro">{post.title}</h2>

                <div
                    className="text-sm prose line-clamp-2 my-2 grow"
                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                />

                <footer className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <AuthPhoto
                            photo={post.author?.photo || ''}
                            name={post.author?.name || ''}
                            size="small"
                        />
                        <small className="text-gray-600">{post.author?.name || ''}</small>
                    </div>
                    <small className="text-gray-600 bg-gray-100 py-0.5 px-2.5 rounded-md">{formatDate(post.createdAt?.toString() || '')}</small>
                </footer>
            </article>
        </Link>
    )
}
