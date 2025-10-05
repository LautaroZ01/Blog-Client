import { useEffect, useState } from "react";
import AuthPhoto from "@/components/auth/AuthPhoto";
import ImageCarousel from "@/components/post/ImageCarousel";
import ArrowBack from "@/components/ui/ArrowBack";
import { Post } from "@/types/postType"
import { formatDate } from "@/utils/formatUtil";
import { FaComment, FaFilePdf } from "react-icons/fa";
import CommentView from "./comments/CommentView";
import LikePost from "@/components/post/LikePost";
import { useNavigate } from "react-router-dom";
import ImgContainer from "@/components/post/ImgContainer";
import { sendPostAsPdf } from "@/API/UserAPI";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

type PostViewProps = {
    post: Post & {
        images?: string[];
    }
}

export default function PostView({ post }: PostViewProps) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const { data, isLoading: isLoadingAuth } = useAuth()

    useEffect(() => {
        document.title = post.title;
        window.scrollTo(0, 0);
        return () => {
            document.title = 'Blog';
        };
    }, [post.title]);

    const { mutate } = useMutation({
        mutationFn: sendPostAsPdf,
        onError: (error) => {
            toast.error(error.message)
            setIsLoading(false)
        },
        onSuccess: (data) => {
            toast.success(data)
            setIsLoading(false)
        },
    })

    const handleSendPdf = () => {
        setIsLoading(true)
        mutate(post._id)
    }

    if (isLoadingAuth) return 'Cargando...'

    return (
        <>
            <main className="max-w-6xl mx-auto px-4 py-8">
                <header className="mb-8 text-center max-w-[100ch] mx-auto flex items-center gap-2">
                    <ArrowBack />
                    <h1 className="lg:text-4xl text-2xl font-semibold text-gray-700 text-balance grow">{post.title}</h1>
                </header>

                {post.images && post.images.length > 0 ? (
                    <ImageCarousel images={post.images} category={post.category.name} readTime={post.readTime} />
                ) : <ImgContainer img='/default-img.webp' alt={post.title} />}

                <section className="flex items-start justify-between gap-2 w-full max-w-[100ch] mx-auto">
                    <button onClick={() => navigate(`${location.pathname}?writerId=${post.author?._id}`)} className="flex flex-col items-start gap-4 group cursor-pointer">
                        <div className="flex items-center gap-2 text-sm">
                            <div>
                                <AuthPhoto photo={post.author?.photo || ''} name={post.author?.name || ''} size="small" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-left group-hover:text-primary-400 transition-colors duration-pro">{post.author?.name || ''}</p>
                                <p className="text-gray-500">{post.author?.email || ''}</p>
                            </div>
                        </div>
                    </button>
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-6 text-sm text-gray-500 font-bold">
                            {data && (
                                <button onClick={handleSendPdf} className="flex items-center cursor-pointer hover:text-primary-400 transition-colors duration-pro">
                                    <FaFilePdf className="inline mr-2" />
                                    {isLoading ? 'Enviando...' : 'Solicitar PDF'}
                                </button>
                            )}
                            <LikePost postId={post._id} likes={post.likes} />
                            <div>
                                <FaComment className="inline mr-2" />
                                {post.comments.length}
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400 font-bold">
                            <p>{formatDate(post.createdAt?.toString() || '')}</p>
                        </div>
                    </div>
                </section>

                {post.content && (
                    <div
                        className="max-w-[80ch] mt-8 mx-auto border-t border-gray-300 pt-4 prose prose-lg"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                )}

                {post.sections && post.sections.length > 0 && (
                    post.sections.map(section => (
                        <section key={section._id} className="my-8">
                            {section.thumbnail && (
                                <ImgContainer img={section.thumbnail} alt={section.title} />
                            )}
                            <h2 className="lg:text-4xl text-2xl font-semibold text-gray-700 text-balance text-center mt-4">{section.title}</h2>
                            <div
                                className="max-w-[80ch] mt-8 mx-auto pt-4 prose prose-lg"
                                dangerouslySetInnerHTML={{ __html: section.content }}
                            />
                        </section>
                    ))
                )}

                <section className="flex items-center gap-2 mt-8 justify-center max-w-[100ch] mx-auto">
                    {post.tags.map(tag => (
                        <span key={tag._id} className="py-2 px-4 rounded-full bg-primary-50 text-primary-600 text-sm font-bold">#{tag.slug}</span>
                    ))}
                </section>
            </main>
            <div className="bg-bg-100 py-4 relative">
                <section className="w-full max-w-[100ch] mx-auto px-2">
                    <CommentView postId={post._id} />
                </section>
            </div>
        </>
    )
}
