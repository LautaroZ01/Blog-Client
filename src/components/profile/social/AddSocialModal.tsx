import { addSocialNetwork } from '@/API/WriterAPI';
import Modal from '@/components/ui/Modal'
import { SocialNetworkForm } from '@/types/userType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SocialFrom from './SocialFrom';

export default function AddSocialModal() {
    const defaultValues: SocialNetworkForm = {
        type: undefined,
        name: '',
        url: ''
    }

    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const toggleClose = () => navigate(location.pathname, { replace: true })

    const { mutate } = useMutation({
        mutationFn: addSocialNetwork,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['socialProfile']})
            toast.success(data)
            reset()
            navigate(location.pathname, { replace: true });
        }
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues })

    const handleAdd = (formData: SocialNetworkForm) => mutate(formData)

    return (
        <Modal title='Agregar red social'>
            <form
                onSubmit={handleSubmit(handleAdd)}
                className='px-2 min-w-md mt-4 space-y-4'
            >
                <SocialFrom register={register} errors={errors} />

                <div className='p-2 flex items-center justify-end gap-2 mt-4'>
                    <button className='btn-secundary' type='button' onClick={toggleClose}>Cancelar</button>
                    <input type="submit" className='btn-primary' value={'Agregar'} />
                </div>

            </form>
        </Modal>
    )
}
