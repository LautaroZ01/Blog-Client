import type { CategoryFormType } from "@/types/postType"
import ModalDashboard from "../ModalDashboard"
import CategoryForm from "./CategoryForm"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { editCategory, getCategoryByIdDashboard } from "@/API/CategoryAPI"
import { toast } from "react-toastify"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function EditCategory() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const categoryId = queryParams.get('editCategory')!

    const { data, isError } = useQuery({
        queryKey: ['category', categoryId],
        queryFn: () => getCategoryByIdDashboard(categoryId),
        retry: false,
        enabled: !!categoryId
    })

    const defaultValues = {
        name: data?.name || '',
        description: data?.description || ''
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues })

    useEffect(() => {
        if (data) {
            reset({
                name: data.name,
                description: data.description || ''
            });
        }
    }, [data, reset]);

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: editCategory,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate(location.pathname, { replace: true })
            queryClient.invalidateQueries({ queryKey: ['categoriesDashboard'] })
            queryClient.invalidateQueries({ queryKey: ['category', categoryId] })
        }
    })

    const handleEditCategory = (formData: CategoryFormType) => {
        const data = {
            formData,
            categoryId
        }

        mutate(data)
    }

    if (!categoryId) return null

    if (isError) return <Navigate to='/' />

    return (
        <ModalDashboard title="Editar categoria" >
            <form
                onSubmit={handleSubmit(handleEditCategory)}
                className="flex flex-col gap-4 w-full max-w-2xl mx-auto mt-4"

            >
                <CategoryForm register={register} errors={errors} />
                <div className="flex justify-end mt-4">
                    <button className="btn-primary">Guardar</button>
                </div>
            </form>
        </ModalDashboard>
    )
}
