import { getUserById } from "@/API/UserAPI"
import { useQuery } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"
import UserDetailModal from "./UserDetailModal"

export default function UserDetail() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const userId = queryParams.get('detailUser')!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['userDetail', userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId,
        retry: 1
    })

    if (isLoading) return 'Cargando...'

    if (isError) return 'Error al cargar el usuario'

    if (data) return (
        <UserDetailModal user={data} />
    )
}
