import { editSocialNetwork } from "@/API/WriterAPI"
import Modal from "@/components/ui/Modal"
import { SocialNetwork, SocialNetworkForm } from "@/types/userType"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import SocialFrom from "./SocialFrom"

type EditSocialModalProps = {
    social: SocialNetwork
}

export default function EditSocialModal({ social }: EditSocialModalProps) {
    const navigate = useNavigate();
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const idSocial = queryParams.get('editSocial')!

    const initialValues: SocialNetworkForm = {
        type: social.type,
        name: social.name,
        url: social.url
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: editSocialNetwork,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['socialProfile'] })
            toast.success(data)
            reset()
            navigate(location.pathname, { replace: true });
        }
    })

    const handleEdit = (formData: SocialNetworkForm) => {
        const data = {
            _id: idSocial,
            type: formData.type,
            name: formData.name,
            url: formData.url
        }

        mutate(data)

    }

    const toggleClose = () => navigate(location.pathname, { replace: true })

    return (
        <Modal title="Edita tu red social">
            <form
                onSubmit={handleSubmit(handleEdit)}
                className='px-2 min-w-md mt-4 space-y-4'
            >
                <SocialFrom register={register} errors={errors} />

                <div className='p-2 flex items-center justify-end gap-2 mt-4'>
                    <button className='btn-secundary' type='button' onClick={toggleClose}>Cancelar</button>
                    <input type="submit" className='btn-primary' value={'Guardar'} />
                </div>

            </form>
        </Modal>
    )
}
