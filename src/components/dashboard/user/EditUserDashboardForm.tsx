import { updateUserRole } from "@/API/UserAPI";
import InputContainer from "@/components/auth/InputContainer";
import { EditRoleForm, User, userRoles } from "@/types/userType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { GrConfigure } from "react-icons/gr";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { roleUsers } from "@/locales/es";

type EditUserDashboardFormProps = {
    userId: User['_id'],
    role: User['role'],
    setIsRole: (value: boolean) => void
}

export default function EditUserDashboardForm({ userId, role, setIsRole }: EditUserDashboardFormProps) {

    const defaultValues: EditRoleForm = {
        role: role
    }

    const { register, handleSubmit, formState: { errors } } = useForm<EditRoleForm>({ defaultValues })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateUserRole,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setIsRole(false)
            queryClient.invalidateQueries({ queryKey: ['usersDashboard'] })
            queryClient.invalidateQueries({ queryKey: ['userDetail', userId] })
        }
    })

    const onSubmit = (formData: EditRoleForm) => {
        const data = {
            userId,
            formData
        }
        mutate(data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <InputContainer>
                    <div className="form-data">
                        <GrConfigure className="text-gray-500 size-5" />
                        <select {...register('role')} id="role" className="input-data">

                            {userRoles.map((role: string) => (
                                <option key={role} value={role}>
                                    {roleUsers[role]}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.role && (
                        <ErrorMessage>{errors.role.message}</ErrorMessage>
                    )}

                </InputContainer>
                <div className="flex justify-end gap-2">
                    <button className="btn-secundary" onClick={() => setIsRole(false)}>Cancelar</button>
                    <button className="btn-primary">Guardar</button>
                </div>

            </form>
        </>
    )
}
