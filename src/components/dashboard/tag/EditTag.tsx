import { Navigate, useLocation, useNavigate } from "react-router-dom"
import ModalDashboard from "../ModalDashboard"
import TagForm from "./TagForm"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { editTag, getTagByIdDashboard } from "@/API/TagAPI"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { TagFormType } from "@/types/postType"

export default function EditTag() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const tagId = queryParams.get('editTag')!

    const { data, isError } = useQuery({
        queryKey: ['tag', tagId],
        queryFn: () => getTagByIdDashboard(tagId),
        retry: false,
        enabled: !!tagId
    })

    const defaultValues = {
        name: data?.name || ''
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues })

    useEffect(() => {
        if (data) {
            reset({
                name: data.name
            });
        }
    }, [data, reset]);

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: editTag,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate(location.pathname, { replace: true })
            queryClient.invalidateQueries({ queryKey: ['tagsDashboard'] })
            queryClient.invalidateQueries({ queryKey: ['tag', tagId] })
        }
    })

    const handleEditTag = (formData: TagFormType) => {
        const data = {
            formData,
            tagId
        }

        mutate(data)
    }

    if (!tagId) return null

    if (isError) return <Navigate to='/' />

    return (
        <ModalDashboard title="Editar etiqueta" >
            <form
                onSubmit={handleSubmit(handleEditTag)}
                className="flex flex-col gap-4 w-full max-w-2xl mx-auto mt-4"

            >
                <TagForm register={register} errors={errors} />
                <div className="flex justify-end mt-4">
                    <button className="btn-primary">Guardar</button>
                </div>
            </form>
        </ModalDashboard>
    )
}
