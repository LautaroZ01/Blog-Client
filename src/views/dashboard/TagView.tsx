import { getTagsDashboard } from "@/API/TagAPI"
import { usePagination } from "@/hooks/usePagination"
import Header from "@/components/dashboard/Header";
import { AnyFilter, Column } from "@/types/postType"
import { ITEMS_PER_PAGE } from "@/utils/dashboardUtil"
import { useQuery } from "@tanstack/react-query"
import { FaPlus } from "react-icons/fa"
import { useNavigate, useSearchParams } from "react-router-dom"
import Table from "@/components/dashboard/Table";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Pagination } from "@/components/ui/Pagination";
import AddTag from "@/components/dashboard/tag/AddTag";
import EditTag from "@/components/dashboard/tag/EditTag";
import DeleteTag from "@/components/dashboard/tag/DeleteTag";
import { useMemo, useState } from "react";
import { FilterForm } from "@/components/ui/FilterForm";

export default function TagView() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const colsTag: Column[] = [
        { label: 'Nombre' },
        { label: 'Slug' },
        { label: 'Posts' },
    ]

    const defaultValues: AnyFilter = useMemo(
        () => ({
            search: searchParams.get("search") || "",
        }),
        [searchParams]
    )

    const [filter, setFilter] = useState<AnyFilter>(defaultValues)

    const { data, isLoading } = useQuery({
        queryKey: ['tagsDashboard', filter],
        queryFn: () => getTagsDashboard(filter),
        retry: false
    })

    const {
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedItems,
    } = usePagination(data || [], ITEMS_PER_PAGE);

    const onSubmit = (data: AnyFilter) => {
        const params: Record<string, string> = {}

        if (data.search) params.search = data.search

        setSearchParams(params)

        setFilter({
            ...data,
            search: data.search || ''
        })
    }

    if (isLoading) return 'Cargando...'

    return (
        <>
            <section>
                <Header
                    title="Etiquetas"
                    subtitleA="Esta es la vista de etiquetas,"
                    subtitleB="aquí puede administrar las etiquetas."
                >
                    <button
                        className="btn-primary flex items-center gap-2"
                        onClick={() => navigate(`${location.pathname}?addTag=true`)}
                    >
                        <FaPlus />
                        Agregar
                    </button>
                </Header>

                <FilterForm defaultValues={defaultValues} onSubmit={onSubmit} isActiveFilter={false} />

                <Table columns={colsTag} >
                    {paginatedItems.map((tag, index) => (
                        <tr className="bg-white border-b border-gray-200" key={index}>
                            <td className="px-6 py-4">
                                {index += 1}
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                {tag.name}
                            </th>
                            <td className="px-6 py-4">
                                {tag.slug}
                            </td>
                            <td className="px-6 py-4">
                                {tag.posts.length}
                            </td>
                            <td className="px-6 py-4 flex items-center justify-end gap-2">
                                <button
                                    className="btn-rounded"
                                    onClick={() => navigate(`${location.pathname}?editTag=${tag._id}`)}
                                >
                                    <MdModeEdit />
                                </button>
                                <button
                                    className="btn-rounded-delete"
                                    onClick={() => navigate(`${location.pathname}?deleteTag=${tag._id}`)}
                                >
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </Table>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

            </section>

            <AddTag />
            <EditTag />
            <DeleteTag />
        </>
    )
}
