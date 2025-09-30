import { checkPassword } from "@/API/AuthAPI";
import { deleteUser } from "@/API/UserAPI";
import InputContainer from "@/components/auth/InputContainer";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Modal from "@/components/ui/Modal";
import { CheckPasswordForm } from "@/types/userType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { MdFingerprint } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function DeleteUserModal() {
  const navigate = useNavigate()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const userId = queryParams.get('deleteUser')!

  const defaultValues: CheckPasswordForm = {
    password: ''
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CheckPasswordForm>({ defaultValues })

  const queryClient = useQueryClient()

  const checkUserPasswordMutation = useMutation({
    mutationFn: checkPassword,
    onError: (error) => toast.error(error.message)

  })

  const deleteUserMutate = useMutation({
    mutationFn: deleteUser,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Usuario eliminado correctamente')
      queryClient.invalidateQueries({ queryKey: ['usersDashboard'] })
      navigate(location.pathname, { replace: true })
      reset()
    }
  })

  const handleForm = async (formData: CheckPasswordForm) => {
    await checkUserPasswordMutation.mutateAsync(formData)
    await deleteUserMutate.mutateAsync(userId)
  }

  const closeModal = () => {
    navigate(location.pathname, { replace: true })
  }

  if(!userId) return null

  return (
    <Modal title="Eliminar usuario">
      <p className="font-bold p-2 text-gray-500">Confirma la eliminación del usuario {''}
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
