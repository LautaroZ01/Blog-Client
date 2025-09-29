import { getPosts } from "@/API/PostAPI"
import PostItem from "@/components/post/PostItem"
import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"

export default function PostListView() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts
    })

    if (isLoading) return 'Cargando...'

    if (isError) return <Navigate to={'/404'} />

    if (data) return (
        <main>

            <header className="relative text-center min-h-96 flex flex-col justify-center px-16 lg:px-6">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                <h1 className="h1-style mb-4">
                    Explora los diferentes <span className="text-primary-500">artículos</span>
                </h1>
                <p className="text-gray-600 mb-6 max-w-[80ch] mx-auto">
                    Descubrí una variedad de temas pensados para vos: desde guías prácticas
                    hasta reflexiones inspiradoras. Usá el buscador para encontrar lo que
                    te interesa o filtrá por categorías y empezá a leer lo que más te atrape.
                </p>

                <div className="container-blog">
                    <p>Aqui van los filtros</p>
                </div>

            </header>
            <section className="max-w-7xl mx-auto my-8 px-16 lg:px-6 grid md:grid-cols-2 lg:grid-cols-3 items-stretch justify-between gap-4 mb-4">
                {data.data.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </section>
        </main>
    )
}
