import { deleteCateogry, getCategoryByIdDashboard } from "@/API/CategoryAPI"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ModalDashboard from "../ModalDashboard"

export default function DeleteCategory() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const categoryId = queryParams.get('deleteCategory')!

    const { data, isError } = useQuery({
        queryKey: ['categoryDelete', categoryId],
        queryFn: () => getCategoryByIdDashboard(categoryId),
        retry: false,
        enabled: !!categoryId
    })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteCateogry,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate(location.pathname, { replace: true })
            queryClient.invalidateQueries({ queryKey: ['categoriesDashboard'] })
            queryClient.invalidateQueries({ queryKey: ['categoryDelete', categoryId] })
        }
    })

    const handleDeleteCategory = () => {
        mutate(categoryId)
    }

    if (!categoryId) return null

    if (isError) return <Navigate to='/' />

    if(data) return (
        <ModalDashboard title="Eliminar categoria" >
            <div className="flex flex-col gap-4 mt-4 p-2">
                <h2 className="font-bold text-lg text-gray-800">¿Estas seguro de eliminar la categoria {data.name}?</h2>
                <p className="text-sm text-gray-500">Esta accion no se puede deshacer</p>
                <div className="flex justify-end gap-4 mt-4">
                    <button onClick={() => navigate(location.pathname, { replace: true })} className="btn-secundary-delete">Cancelar</button>
                    <button onClick={handleDeleteCategory} className="btn-primary-delete">Eliminar</button>
                </div>
            </div>
        </ModalDashboard>
    )
}
