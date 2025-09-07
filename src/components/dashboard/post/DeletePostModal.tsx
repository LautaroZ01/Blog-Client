import { checkPassword } from "@/API/AuthAPI";
import { deletePost } from "@/API/PostAPI";
import InputContainer from "@/components/auth/InputContainer";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Modal from "@/components/ui/Modal";
import { CheckPasswordForm } from "@/types/userType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { MdFingerprint } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function DeletePostModal() {
    const defaultValues: CheckPasswordForm = {
        password: ''
    }

    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const postId = queryParams.get('deletePost')!

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })

    const checkUserPasswordMutation = useMutation({
        mutationFn: checkPassword,
        onError: (error) => toast.error(error.message)

    })

    const deletePostMutation = useMutation({
        mutationFn: deletePost,
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
            toast.success('Publicación eliminada correctamente')
            queryClient.invalidateQueries({ queryKey: ['postsDashboard'] })
            navigate(location.pathname, { replace: true })
        }
    })

    const queryClient = useQueryClient()

    const handleForm = async (formData: CheckPasswordForm) => {
        await checkUserPasswordMutation.mutateAsync(formData)
        await deletePostMutation.mutateAsync(postId)
    }

    const closeModal = () => {
        navigate(location.pathname, { replace: true })
    }

    if (!postId) return null
    return (
        <Modal title='Eliminar publicación'>

            <p className="font-bold p-2 text-gray-500">Confirma la eliminación del articulo {''}
                <span className="text-primary-400">colocando tu constraseña</span>
            </p>


            <form onSubmit={handleSubmit(handleForm)} className="flex flex-col min-w-lg my-2">
                <InputContainer>
                    <div className="form-data">
                        <MdFingerprint className="text-gray-500 size-5" />
                        <input
                            type="password"
                            placeholder="Escribe tu contraseña"
                            className="input-data"
                            {...register("password", {
                                required: "La contraseña es obligatorio",
                            })}
                        />
                    </div>

                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </InputContainer>
                <div className="flex justify-end gap-4 mt-6">
                    <button type="button" className="btn-secundary-delete" onClick={closeModal}>Cancelar</button>
                    <input type="submit" className="btn-primary-delete" value={'Eliminar'} />
                </div>
            </form>
        </Modal>
    )
}
