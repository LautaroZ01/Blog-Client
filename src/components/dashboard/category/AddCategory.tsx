import type { CategoryFormType } from "@/types/postType"
import { useForm } from "react-hook-form"
import CategoryForm from "./CategoryForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addCategory } from "@/API/CategoryAPI"
import { toast } from "react-toastify"
import { useLocation, useNavigate } from "react-router-dom"
import ModalDashboard from "../ModalDashboard"

export default function AddCategory() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const isOpen = queryParams.get('addCategory')

    const defaultValues: CategoryFormType = {
        name: "",
        description: ""
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: addCategory,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['categoriesDashboard'] })
            navigate(location.pathname, { replace: true })
            reset()
        }
    })

    const handleAddCategory = (formData: CategoryFormType) => mutate(formData)

    if (!isOpen) return null

    return (
        <ModalDashboard title="Nueva categoria" >
            <form
                onSubmit={handleSubmit(handleAddCategory)}
                className="flex flex-col gap-4 w-full max-w-2xl mx-auto mt-4"

            >
                <CategoryForm register={register} errors={errors} />
                <div className="flex justify-end mt-4">
                    <button className="btn-primary">Agregar</button>
                </div>
            </form>
        </ModalDashboard>
    )
}
