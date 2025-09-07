import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ModalDashboard from "../ModalDashboard"
import { deleteTag, getTagByIdDashboard } from "@/API/TagAPI"
import { toast } from "react-toastify"
import { Navigate, useLocation, useNavigate } from "react-router-dom"

export default function DeleteTag() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const tagId = queryParams.get('deleteTag')!

    const { data, isError } = useQuery({
        queryKey: ['tagDelete', tagId],
        queryFn: () => getTagByIdDashboard(tagId),
        retry: false,
        enabled: !!tagId
    })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteTag,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate(location.pathname, { replace: true })
            queryClient.invalidateQueries({ queryKey: ['tagsDashboard'] })
            queryClient.invalidateQueries({ queryKey: ['tagDelete', tagId] })
        }
    })

    const handleDeleteTag = () => {
        mutate(tagId)
    }

    if (!tagId) return null

    if (isError) return <Navigate to='/' />

    if (data) return (
        <ModalDashboard title="Eliminar etiqueta" >
            <div className="flex flex-col gap-4 mt-4 p-2">
                <h2 className="font-bold text-lg text-gray-800">¿Estas seguro de eliminar la etiqueta {data.name}?</h2>
                <p className="text-sm text-gray-500">Esta accion no se puede deshacer</p>
                <div className="flex justify-end gap-4 mt-4">
                    <button onClick={() => navigate(location.pathname, { replace: true })} className="btn-secundary-delete">Cancelar</button>
                    <button onClick={handleDeleteTag} className="btn-primary-delete">Eliminar</button>
                </div>
            </div>
        </ModalDashboard>
    )
}
