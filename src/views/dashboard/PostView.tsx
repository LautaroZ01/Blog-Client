import { getPostDashboard } from "@/API/PostAPI"
import Header from "@/components/dashboard/Header"
import Table from "@/components/dashboard/Table"
import { Pagination } from "@/components/ui/Pagination"
import { SearchComponent } from "@/components/ui/SeachComponent"
import { usePagination } from "@/hooks/usePagination"
import { useSearch } from "@/hooks/useSearch"
import { Column } from "@/types/postType"
import { ITEMS_PER_PAGE } from "@/utils/dashboardUtil"
import { useQuery } from "@tanstack/react-query"
import { FaPlus, FaComments, FaEye, FaHeart } from "react-icons/fa"
import { MdDelete, MdModeEdit } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"
import { formatDate } from "@/utils/formatUtil"
import { postStatus } from "@/locales/es"
import DeletePostModal from "@/components/dashboard/post/DeletePostModal"
import CommentListByPostId from "@/components/dashboard/post/comment/CommentListByPostId"

export default function PostView() {
  const navigate = useNavigate()
  const colsPosts: Column[] = [
    { label: 'Titulo' },
    { label: 'Categoria' },
    { label: 'Interacciones' },
    { label: 'Estado' },
  ]

  const { data, isLoading } = useQuery({
    queryKey: ['postsDashboard'],
    queryFn: getPostDashboard,
    retry: false
  })

  const { searchTerm, setSearchTerm, filteredData } = useSearch(
    data || [],
    ['title']
  );

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
  } = usePagination(filteredData, ITEMS_PER_PAGE);

  const statusColor = {
    draft: 'bg-yellow-100 text-yellow-800',
    published: 'bg-green-100 text-green-800',
    archived: 'bg-red-100 text-red-800'
  }

  if (isLoading) return 'Cargando...'


  if (data && paginatedItems) return (
    <>
      <section>
        <Header
          title="Articulos"
          subtitleA="Esta es la vista de articulos,"
          subtitleB="aquí puede administrar los articulos."
        >
          <Link
            to='/dashboard/post/create'
            className="btn-primary flex items-center gap-2"
          >
            <FaPlus />
            Agregar
          </Link>
        </Header>

        <SearchComponent
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchFields={['Titulo']}
          placeholder="Buscar articulo..."
        />

        <Table columns={colsPosts} >
          {paginatedItems.map((post, index) => (
            <tr className="bg-white border-b border-gray-200" key={index}>
              <td className="px-6 py-4">
                {index += 1}
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex flex-col gap-2">
                {post.title}
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
                <Link
                  to={`/dashboard/post/edit/${post._id}`}
                  className="btn-rounded"
                >
                  <MdModeEdit />
                </Link>
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
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      </section>
      <DeletePostModal />
      <CommentListByPostId />
    </>
  )
}
