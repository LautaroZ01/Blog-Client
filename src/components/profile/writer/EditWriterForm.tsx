import { updateExtraInformation } from "@/API/WriterAPI"
import ErrorMessage from "@/components/ui/ErrorMessage"
import { Writer, WriterForm } from "@/types/userType"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

type EditWriterFormProps = {
    data: Writer
}

export default function EditWriterForm({ data }: EditWriterFormProps) {
    const initialValues: WriterForm = {
        nickname: data.nickname,
        bio: data.bio
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate } = useMutation({
        mutationFn: updateExtraInformation,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (message) => {
            toast.success(message)
            queryClient.invalidateQueries({ queryKey: ['witerInfo'] })
            navigate(
                location.pathname,
                { replace: true }
            );
        }
    })

    const handleUpdate = (formData: WriterForm) => mutate(formData)

    return (
        <form
            className="w-full space-y-4"
            noValidate
            onSubmit={handleSubmit(handleUpdate)}
        >
            <div className="container-responsive-profile">
                <div className="container-profile">
                    <label htmlFor="nickname" className="label-profile">Apodo</label>
                    <input
                        type="text"
                        id="nickname"
                        className="input-profile"
                        placeholder="Escribe tu apodo"
                        {...register("nickname", {
                            required: "El Apodo del escritor es obligatorio",
                        })}
                    />
                    {errors.nickname && (
                        <ErrorMessage>{errors.nickname.message}</ErrorMessage>
                    )}
                </div>
                <div className="container-profile">
                    <label htmlFor="bio" className="label-profile">Bio</label>
                    <textarea
                        id="bio"
                        cols={70}
                        rows={10}
                        className="input-profile max-w-[70ch] w-full"
                        placeholder="Escribe tu bios"
                        {...register("bio", {
                            required: "La bio del escritor es obligatorio",
                        })}
                    ></textarea>
                    {errors.bio && (
                        <ErrorMessage>{errors.bio.message}</ErrorMessage>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-end w-full">
                <input
                    type="submit"
                    value='Guardar'
                    className="btn-primary"
                />
            </div>
        </form>
    )
}
