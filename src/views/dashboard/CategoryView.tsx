import { getCategoriesDashboard } from "@/API/CategoryAPI";
import AddCategory from "@/components/dashboard/category/AddCategory";
import DeleteCategory from "@/components/dashboard/category/DeleteCategory";
import EditCategory from "@/components/dashboard/category/EditCategory";
import Header from "@/components/dashboard/Header";
import Table from "@/components/dashboard/Table";
import { FilterForm } from "@/components/ui/FilterForm";
import { Pagination } from "@/components/ui/Pagination";
import { usePagination } from "@/hooks/usePagination";
import type { AnyFilter, Column } from "@/types/postType";
import { ITEMS_PER_PAGE } from "@/utils/dashboardUtil";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function CategoryView() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const colsCategory: Column[] = [
    { label: 'Nombre' },
    { label: 'Descripcion' },
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
    queryKey: ['categoriesDashboard', filter],
    queryFn: () => getCategoriesDashboard(filter),
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

  if (data) return (
    <>
      <section>
        <Header
          title="Categorías"
          subtitleA="Esta es la vista de categoría,"
          subtitleB="aquí puede administrar las categorías."
        >
          <button
            className="btn-primary flex items-center gap-2"
            onClick={() => navigate(`${location.pathname}?addCategory=true`)}
          >
            <FaPlus />
            Agregar
          </button>
        </Header>

        <FilterForm defaultValues={defaultValues} onSubmit={onSubmit} isActiveFilter={false} />

        <Table columns={colsCategory} >
          {paginatedItems.map((category, index) => (
            <tr className="bg-white border-b border-gray-200" key={index}>
              <td className="px-6 py-4">
                {index += 1}
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {category.name}
              </th>
              <td className="px-6 py-4 max-w-60">
                {category.description}
              </td>
              <td className="px-6 py-4">
                {category.slug}
              </td>
              <td className="px-6 py-4">
                {category.posts.length}
              </td>
              <td className="px-6 py-4 flex items-center justify-end gap-2">
                <button
                  className="btn-rounded"
                  onClick={() => navigate(`${location.pathname}?editCategory=${category._id}`)}
                >
                  <MdModeEdit />
                </button>
                <button
                  className="btn-rounded-delete"
                  onClick={() => navigate(`${location.pathname}?deleteCategory=${category._id}`)}
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
      <AddCategory />
      <EditCategory />
      <DeleteCategory />
    </>
  )
}
