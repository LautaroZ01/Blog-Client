import { Post } from "@/types/postType";
import { formatDate } from "@/utils/formatUtil";
import AuthPhoto from "../auth/AuthPhoto";
import { FaComment, FaCalendar, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import LikePost from "./LikePost";

type HomePostItemProps = {
    post: Post;
    index: number;
}

export default function HomePostItem({ post, index }: HomePostItemProps) {
    return (
        <div
            key={post._id}
            className={`relative overflow-hidden aspect-video rounded-lg h-full w-full flex flex-col justify-between ${index === 0 ? 'row-span-4' : index === 1 ? 'row-span-2' : 'row-span-2 col-start-2 row-start-3'}`}
        >
            <div className="absolute inset-0 z-0 w-full h-full">
                <img
                    src={post.images[0]}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/800x600?text=Imagen+no+disponible';
                    }}
                />
                <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent to-black/50 to-70% z-10" />
            </div>

            {index === 0 && (
                <div className="p-4 z-10 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <AuthPhoto photo={post.author?.photo || ''} name={post.author?.name || ''} size="small" />
                        <div>
                            <div className="text-sm text-white font-semibold">
                                {post.author?.name || 'Autor desconocido'}
                            </div>
                            <div className="text-xs text-gray-200 flex items-center gap-1">
                                <FaCalendar className="inline mr-1" />
                                {formatDate(post.createdAt?.toString() || '')}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-primary-50 border-primary-700 border rounded-full px-2 py-1 inline-flex items-center gap-1 bg-primary-800">
                            {post.category?.name || 'Sin categoría'}
                        </span>
                    </div>
                </div>
            )}

            <div className="relative px-4 py-6 h-full flex flex-col justify-end gap-2 text-white z-10">
                {index !== 0 ? (
                    <div>
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-xs text-gray-200 flex items-center gap-1">
                                <FaCalendar className="inline mr-1" />
                                {formatDate(post.createdAt?.toString() || '')}
                            </div>
                            <div className="text-xs text-primary-50 border-primary-700 border rounded-full px-2 py-1 inline-flex items-center gap-1 bg-primary-800">
                                {post.category?.name || 'Sin categoría'}
                            </div>
                        </div>
                        <Link to={`/post/${post.slug}`} className="text-2xl line-clamp-1 font-semibold hover:text-primary-400 transition-colors duration-pro text-wrap">{post.title}</Link>
                    </div>

                ) : (
                    <Link to={`/post/${post.slug}`} className="text-2xl line-clamp-2 font-semibold hover:text-primary-400 transition-colors duration-pro text-wrap">{post.title}</Link>
                )}
                {post.content && (
                    <div
                        className="text-sm prose prose-invert line-clamp-2 my-2"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                )}

                <div className="flex items-center justify-between text-xs mt-2 px-2">
                    <div className="flex items-center gap-2 text-sm">
                        <LikePost postId={post._id} likes={post.likes} />
                        <div className="flex items-center gap-1">
                            <FaComment className="inline mr-1" />
                            {post.comments.length}
                        </div>
                    </div>
                    <Link
                        to={`/post/${post.slug}`}
                        className="flex items-center gap-2 group hover:text-primary-400 transition-all duration-pro"
                    >
                        Leer más
                        <FaArrowRight className="group-hover:-rotate-45 transition-all duration-pro" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
