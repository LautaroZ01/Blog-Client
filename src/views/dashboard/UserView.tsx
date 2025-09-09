import { getAllUsers } from "@/API/UserAPI"
import { Column } from "@/types/postType"
import { usePagination } from "@/hooks/usePagination"
import { useQuery } from "@tanstack/react-query"
import { ITEMS_PER_PAGE, roleColor, statusColor } from "@/utils/dashboardUtil"
import { Link, useSearchParams } from "react-router-dom"
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
import { useMemo, useState } from "react"
import { FilterForm } from "@/components/ui/FilterForm"

export default function UserView() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const colsUsers: Column[] = [
    { label: 'Nombre' },
    { label: 'Rol' },
    { label: 'Estado' },
    { label: 'Interacciones' }
  ]

  const defaultValues: UserFilter = useMemo(
    () => ({
      role: searchParams.get("role") || "",
      status: searchParams.get("status") || "",
      search: searchParams.get("search") || "",
    }),
    [searchParams]
  )

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

  const onSubmit = (data: UserFilter) => {
    const params: Record<string, string> = {}

    if (data.role) params.role = data.role
    if (data.status) params.status = data.status
    if (data.search) params.search = data.search

    setSearchParams(params)
    
    setFilter({
      ...data,
      role: data.role || '',
      status: data.status || '',
      search: data.search || ''
    })
  }

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

      <FilterForm<UserFilter>
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        placeholder="Buscar usuario..."
      >
        {(register) => (
          <>
            <div>
              <label htmlFor="role"><small>Rol</small></label>
              <select id="role" {...register("role")} className="select-filter">
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
              <select id="status" {...register("status")} className="select-filter">
                <option value="">Todos</option>
                {userStatusSchema.options.map((status) => (
                  <option key={status} value={status}>
                    {userStatus[status]}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </FilterForm>

      <Table columns={colsUsers}>
        {paginatedItems.length > 0 ? paginatedItems.map((user, index) => (
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

        )) : (
          <tr>
            <td colSpan={5} className="text-center py-4">
              No hay usuarios
            </td>
          </tr>
        )}
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
