import { getPosts } from "@/API/PostAPI"
import PostItem from "@/components/post/PostItem"
import { FilterForm } from "@/components/ui/FilterForm"
import Pagination from "@/components/ui/Pagination"
import { PostListFilter } from "@/types/postType"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import { MdBookmarkAdded } from "react-icons/md";

export default function PostListView() {
    const [searchParams, setSearchParams] = useSearchParams()

    const defaultValues: PostListFilter = useMemo(
        () => ({
            search: searchParams.get("search") || "",
            category: searchParams.get("category") || "",
            tag: searchParams.get("tag") || "",
            writer: searchParams.get("writer") || "",
            page: parseInt(searchParams.get("page") || "1", 10)
        }),
        [searchParams]
    )

    const [filter, setFilter] = useState<PostListFilter>(defaultValues)

    const { data, isLoading, isError } = useQuery({
        queryKey: ['posts', filter],
        queryFn: () => getPosts(filter),
        retry: false
    })

    const onSubmit = (data: PostListFilter) => {
        const params: Record<string, string> = {}

        if (data.search) params.search = data.search
        if (data.category) params.category = data.category
        if (data.tag) params.tag = data.tag
        if (data.writer) params.writer = data.writer

        setSearchParams(params)

        setFilter({
            ...data,
            search: data.search || '',
            category: data.category || '',
            tag: data.tag || '',
            writer: data.writer || '',
            page: data.page || 1
        })

    }

    const handlePageChange = (newPage: number) => {
        setFilter((prev) => ({ ...prev, page: newPage }))
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            page: String(newPage),
        })
    }

    if (isLoading) return 'Cargando...'

    if (isError) return <Navigate to={'/404'} />

    if (data) return (
        <main className="my-8">
            <header className="relative text-center min-h-96 flex flex-col justify-center px-16 lg:px-6">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                <MdBookmarkAdded className="text-primary-500 text-6xl mb-4 mx-auto" />

                <h1 className="h1-style mb-4">
                    Explora los diferentes <span className="text-primary-500">artículos</span>
                </h1>
                <p className="text-gray-600 max-w-[80ch] mx-auto">
                    Descubrí una variedad de temas pensados para vos: desde guías prácticas
                    hasta reflexiones inspiradoras. Usá el buscador para encontrar lo que
                    te interesa o filtrá por categorías y empezá a leer lo que más te atrape.
                </p>

                <h3 className="text-2xl font-semibold my-8 text-gray-600">Encontrá el artículo perfecto para vos 🔍</h3>
                <FilterForm<PostListFilter>
                    defaultValues={defaultValues}
                    onSubmit={onSubmit}
                    placeholder="Buscar articulo..."
                    isList
                >
                    {(register) => (
                        <>
                            <div className="w-full lg:w-60">
                                <label htmlFor="category"><small>Categoria</small></label>
                                <select id="category" {...register("category")} className="select-filter">
                                    <option value="">Todos</option>
                                    {data.categories.map((category) => (
                                        <option key={category.name} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full lg:w-60">
                                <label htmlFor="tag"><small>Etiqueta</small></label>
                                <select id="tag" {...register("tag")} className="select-filter">
                                    <option value="">Todos</option>
                                    {data.tags.map((tag) => (
                                        <option key={tag.name} value={tag.name}>
                                            {tag.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full lg:w-60">
                                <label htmlFor="writer"><small>Escritor</small></label>
                                <select id="writer" {...register("writer")} className="select-filter">
                                    <option value="">Todos</option>
                                    {data.writers.map((writer) => (
                                        <option key={writer.name} value={writer.email}>
                                            {writer.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                </FilterForm>

            </header>
            {data.posts.length > 0 ? (
                <section className="max-w-7xl mx-auto my-8 px-16 lg:px-6 grid md:grid-cols-2 lg:grid-cols-3 items-stretch justify-between gap-4 mb-4">
                    {data.posts.map(post => (
                        <PostItem key={post._id} post={post} />
                    ))}
                </section>
            ) : (
                <p className="text-center text-gray-600 my-4">No hay articulos, intenta modificar los filtros</p>
            )}

            <Pagination
                page={data.pagination.page}
                totalPages={data.pagination.totalPages}
                onPageChange={handlePageChange}
            />

        </main>
    )
}
