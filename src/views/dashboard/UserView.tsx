import { getAllUsers } from "@/API/UserAPI"
import { Column } from "@/types/postType"
import { usePagination } from "@/hooks/usePagination"
import { useSearch } from "@/hooks/useSearch"
import { useQuery } from "@tanstack/react-query"
import { ITEMS_PER_PAGE, roleColor, statusColor } from "@/utils/dashboardUtil"
import { Link } from "react-router-dom"
import { FaComments, FaPlus } from "react-icons/fa"
import Header from "@/components/dashboard/Header"
import { SearchComponent } from "@/components/ui/SeachComponent"
import { Pagination } from "@/components/ui/Pagination"
import Table from "@/components/dashboard/Table"
import { MdDelete, MdModeEdit } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { IoShareSocialSharp } from "react-icons/io5"
import { RiContactsBookFill } from "react-icons/ri";
import AuthPhoto from "@/components/auth/AuthPhoto"
import UserDetail from "@/components/dashboard/user/UserDetail"
import { roleUsers, userStatus } from "@/locales/es"

export default function UserView() {
  const navigate = useNavigate()

  const colsUsers: Column[] = [
    { label: 'Nombre' },
    { label: 'Rol' },
    { label: 'Estado' },
    { label: 'Interacciones' }
  ]

  const { data, isLoading } = useQuery({
    queryKey: ['usersDashboard'],
    queryFn: getAllUsers,
    retry: false
  })

  const { searchTerm, setSearchTerm, filteredData } = useSearch(
    data || [],
    ['name', 'email', 'lastname']
  );

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
  } = usePagination(filteredData, ITEMS_PER_PAGE);

  if (isLoading) return 'Cargando...'

  if (data && paginatedItems) return (
    <>
      <Header
        title="Usuarios"
        subtitleA="Esta es la vista de usuarios,"
        subtitleB="aquí puede administrar los usuarios."
      >
        <Link
          to='/dashboard/user/create'
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus />
          Agregar
        </Link>
      </Header>

      <SearchComponent
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchFields={['Nombre', 'Correo', 'Apellido']}
        placeholder="Buscar usuarios..."
      />

      <Table columns={colsUsers}>
        {paginatedItems.map((user, index) => (
          <tr className="bg-white border-b border-gray-200" key={index}>
            <td className="px-6 py-4">
              {index += 1}
            </td>

            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
              <Link 
              to={`/dashboard/user?detailUser=${user._id}`}
              className="flex items-center gap-2 hover:text-primary-500 transition-colors duration-pro"
              >
                <AuthPhoto photo={user.photo} name={user.name} size="normal" />
                <div className="flex flex-col">
                  {user.name} {user.lastname}
                  <small className="text-gray-500">
                    {user.email}
                  </small>
                </div>
              </Link>
            </th>

            <td className="px-6 py-4">
              <small className={`${roleColor[user.role]} badget-dashboard`}>
                {roleUsers[user.role]}
              </small>
            </td>

            <td className="px-6 py-4">
              <small className={`${statusColor[user.status]} badget-dashboard`}>
                {userStatus[user.status]}
              </small>
            </td>

            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <small className="flex items-center gap-2 text-gray-500">
                  <FaComments />
                  {user.comments.length}
                </small>

                {user.socialNetworks.length > 0 &&
                  <small className="flex items-center gap-2 text-gray-500">
                    <IoShareSocialSharp />
                    {user.socialNetworks.length}
                  </small>}

                {user.contacts.length > 0 &&
                  <small className="flex items-center gap-2 text-gray-500">
                    <RiContactsBookFill />
                    {user.contacts.length}
                  </small>}
              </div>
            </td>

            <td className="px-6 py-4 flex items-center justify-end gap-2">
              <Link
                to={`/dashboard/user/${user._id}`}
                className="btn-rounded"
              >
                <MdModeEdit />
              </Link>
              <button
                className="btn-rounded-delete"
                onClick={() => navigate(`${location.pathname}?deleteUser=${user._id}`)}
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

      <UserDetail />
    </>
  )
}
