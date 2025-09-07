import { TagFormType } from "@/types/postType"
import ModalDashboard from "../ModalDashboard"
import TagForm from "./TagForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { addTag } from "@/API/TagAPI"
import { toast } from "react-toastify"

export default function AddTag() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const isOpen = queryParams.get('addTag')

    const defaultValues: TagFormType = {
        name: ""
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: addTag,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['tagsDashboard'] })
            navigate(location.pathname, { replace: true })
            reset()
        }
    })

    const handleAddTag = (formData: TagFormType) => mutate(formData)

    if (!isOpen) return null

    return (
        <ModalDashboard title="Nueva etiqueta" >
            <form
                onSubmit={handleSubmit(handleAddTag)}
                className="flex flex-col gap-4 w-full max-w-2xl mx-auto mt-4"

            >
                <TagForm register={register} errors={errors} />
                <div className="flex justify-end mt-4">
                    <button className="btn-primary">Agregar</button>
                </div>
            </form>
        </ModalDashboard>
    )
}
