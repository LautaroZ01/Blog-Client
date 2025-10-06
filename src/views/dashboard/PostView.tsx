import { getPostDashboard, getPostsStats } from "@/API/PostAPI"
import Header from "@/components/dashboard/Header"
import Table from "@/components/dashboard/Table"
import { Column, PostFilter, postStatusSchema } from "@/types/postType"
import { useMutation, useQuery } from "@tanstack/react-query"
import { FaPlus, FaComments, FaEye, FaHeart, FaFilePdf } from "react-icons/fa"
import { MdDelete, MdModeEdit } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"
import { formatDate } from "@/utils/formatUtil"
import { postStatus } from "@/locales/es"
import DeletePostModal from "@/components/dashboard/post/DeletePostModal"
import CommentListByPostId from "@/components/dashboard/post/comment/CommentListByPostId"
import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { FilterForm } from "@/components/ui/FilterForm"
import Pagination from "@/components/ui/Pagination"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "react-toastify"
import { generatePostReportPDF } from "@/utils/generatePostReportPDF"

export default function PostView() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: user } = useAuth()

  const colsPosts: Column[] = [
    { label: 'Titulo' },
    { label: 'Categoria' },
    { label: 'Interacciones' },
    { label: 'Estado' },
  ]

  const defaultValues: PostFilter = useMemo(
    () => ({
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "",
      tag: searchParams.get("tag") || "",
      status: searchParams.get("status") || "",
      writer: searchParams.get("writer") || "",
      page: parseInt(searchParams.get("page") || "1", 10)
    }),
    [searchParams]
  )

  const [filter, setFilter] = useState<PostFilter>(defaultValues)

  const { data, isLoading } = useQuery({
    queryKey: ['postsDashboard', filter],
    queryFn: () => getPostDashboard(filter),
    retry: false
  })

  const statusColor = {
    draft: 'bg-yellow-100 text-yellow-800',
    published: 'bg-green-100 text-green-800',
    archived: 'bg-red-100 text-red-800'
  }

  const onSubmit = (data: PostFilter) => {
    const params: Record<string, string> = {}

    if (data.search) params.search = data.search
    if (data.category) params.category = data.category
    if (data.tag) params.tag = data.tag
    if (data.status) params.status = data.status
    if (data.writer) params.writer = data.writer

    setSearchParams(params)

    setFilter({
      ...data,
      search: data.search || '',
      category: data.category || '',
      tag: data.tag || '',
      status: data.status || '',
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

  const { mutate } = useMutation({
    mutationFn: getPostsStats,
    onSuccess: (data) => {
      if (!data) return
      generatePostReportPDF(data)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleGenerateReport = () => {
    mutate(filter)
  }

  if (isLoading) return 'Cargando...'


  if (data && user) return (
    <>
      <Header
        title="Articulos"
        subtitleA="Esta es la vista de articulos,"
        subtitleB="aquí puede administrar los articulos."
      >
        <div className="flex items-center gap-4">
          <button
            onClick={handleGenerateReport}
            className="btn-secundary flex items-center gap-2"
          >
            <FaFilePdf />
            Generar informe
          </button>
          {user.role === 'writer' && <Link
            to='/dashboard/post/create'
            className="btn-primary flex items-center gap-2"
          >
            <FaPlus />
            Agregar
          </Link>}
        </div>
      </Header>

      <FilterForm<PostFilter>
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        placeholder="Buscar articulo..."
      >
        {(register) => (
          <>
            <div>
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
            <div>
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
            <div>
              <label htmlFor="status"><small>Estado</small></label>
              <select id="status" {...register("status")} className="select-filter">
                <option value="">Todos</option>
                {postStatusSchema.options.map((status) => (
                  <option key={status} value={status}>
                    {postStatus[status]}
                  </option>
                ))}
              </select>
            </div>
            {user?.role === "admin" && (
              <div>
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
            )}
          </>
        )}

      </FilterForm>

      <Table columns={colsPosts} >
        {data.posts.map((post, index) => (
          <tr className="bg-white border-b border-gray-200" key={index}>
            <td className="px-6 py-4">
              {index += 1}
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex flex-col gap-2">
              <Link to={`/post/${post.slug}`} className="hover:text-primary-400 transition-colors duration-pro">{post.title}</Link>
              <small className="text-gray-500">
                {post.createdAt && formatDate(post.createdAt?.toString())}
              </small>
            </th>
            <td className="px-6 py-4">
              {post.category.name}
            </td>
            <td className="px-6 py-4 mt-6 flex items-center gap-4">
              <Link to={`/dashboard/post?postId=${post._id}`}>
                <span className="text-gray-500 flex items-center gap-2 hover:text-accent-200 transition-colors duration-pro">
                  <FaComments className="" />
                  {post.comments.length}
                </span>
              </Link>
              <span className="flex items-center gap-2">
                <FaHeart className="text-gray-500" />
                {post.likes.length}
              </span>
              <span className="flex items-center gap-2">
                <FaEye className="text-gray-500" />
                {post.viewCount}
              </span>
            </td>
            <td className="px-6 py-4">
              <small className={`${statusColor[post.status]} badget-dashboard`}>
                {postStatus[post.status]}
              </small>
            </td>
            <td className="px-6 py-4 flex items-center justify-end gap-2">
              {user.role === 'writer' && <Link
                to={`/dashboard/post/edit/${post._id}`}
                className="btn-rounded"
              >
                <MdModeEdit />
              </Link>}
              <button
                className="btn-rounded-delete"
                onClick={() => navigate(`${location.pathname}?deletePost=${post._id}`)}
              >
                <MdDelete />
              </button>
            </td>
          </tr>
        ))}
      </Table>

      <Pagination
        page={data.pagination.page}
        totalPages={data.pagination.totalPages}
        onPageChange={handlePageChange}
      />
      <DeletePostModal />
      <CommentListByPostId />
    </>
  )
}
