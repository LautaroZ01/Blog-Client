import { getAllUsers } from "@/API/UserAPI"
import { Column } from "@/types/postType"
import { usePagination } from "@/hooks/usePagination"
import { useQuery } from "@tanstack/react-query"
import { ITEMS_PER_PAGE, roleColor, statusColor } from "@/utils/dashboardUtil"
import { Link } from "react-router-dom"
import { FaComments } from "react-icons/fa"
import Header from "@/components/dashboard/Header"
import { Pagination } from "@/components/ui/Pagination"
import Table from "@/components/dashboard/Table"
import { MdDelete, MdModeEdit } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { IoShareSocialSharp } from "react-icons/io5"
import { RiContactsBookFill } from "react-icons/ri";
import AuthPhoto from "@/components/auth/AuthPhoto"
import UserDetail from "@/components/dashboard/user/UserDetail"
import { roleUsers, userStatus } from "@/locales/es"
import DeleteUserModal from "@/components/dashboard/user/DeleteUserModal"
import { UserFilter, userRoles, userStatusSchema } from "@/types/userType"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { FiSearch } from "react-icons/fi"
import Filter from "@/components/ui/Filter"

export default function UserView() {
  const navigate = useNavigate()

  const colsUsers: Column[] = [
    { label: 'Nombre' },
    { label: 'Rol' },
    { label: 'Estado' },
    { label: 'Interacciones' }
  ]

  const defaultValues: UserFilter = {
    role: '',
    status: '',
    search: ''
  }

  const [filter, setFilter] = useState<UserFilter>(defaultValues)

  const { data, isLoading } = useQuery({
    queryKey: ['usersDashboard', filter],
    queryFn: () => getAllUsers(filter)
  })

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
  } = usePagination(data || [], ITEMS_PER_PAGE);

  const { register, handleSubmit } = useForm<UserFilter>({
    defaultValues
  })

  const onSubmit = handleSubmit((data) => {
    setFilter({
      ...data,
      role: data.role || '',
      status: data.status || '',
      search: data.search || ''
    })
  })

  if (isLoading) return 'Cargando...'

  if (data && paginatedItems) return (
    <>
      <Header
        title="Usuarios"
        subtitleA="Esta es la vista de usuarios,"
        subtitleB="aquí puede administrar los usuarios."
      >
        <></>
      </Header>

      <form onSubmit={onSubmit} className="flex gap-2 justify-end w-full">
        <div className="mb-4 flex flex-col gap-2 justify-center items-end grow">
          <div className="lg:flex items-center justify-center w-full lg:max-w-lg border border-gray-300 rounded-md">
            <input
              type="text"
              placeholder="Buscar usuario..."
              id="search"
              {...register('search')}
              className="w-full focus:outline-none p-2 autofill:bg-white autofill:text-gray-800"
            />
            <button type="submit" className="text-gray-500 py-2 px-4 border-l border-gray-300 cursor-pointe">
              <FiSearch />
            </button>
          </div>
        </div>
        <Filter>
          <div className="flex gap-4 items-end">
            <div>
              <label htmlFor="role"><small>Rol</small></label>
              <select
                id="role"
                {...register('role')}
                className="select-filter"
              >
                <option value="">Todos</option>
                {userRoles.map((role) => (
                  <option key={role} value={role}>
                    {roleUsers[role]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="status"><small>Estado</small></label>
              <select
                id="status"
                {...register('status')}
                className="select-filter"
              >
                <option value="">Todos</option>
                {userStatusSchema.options.map((status) => (
                  <option key={status} value={status}>
                    {userStatus[status]}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-secundary">Filtrar</button>
          </div>
        </Filter>
      </form>

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
                to={`/dashboard/user?detailUser=${user._id}`}
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
      <DeleteUserModal />
    </>
  )
}
