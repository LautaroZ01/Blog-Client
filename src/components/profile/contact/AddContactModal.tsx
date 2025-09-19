import { addContact } from "@/API/WriterAPI"
import Modal from "@/components/ui/Modal"
import { ContactFormType } from "@/types/userType"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ContactForm from "./ContactForm"

export default function AddContactModal() {
    const defaultValues: ContactFormType = {
        type: undefined,
        name: ''
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues })

    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const toggleClose = () => navigate(location.pathname, { replace: true })

    const { mutate } = useMutation({
        mutationFn: addContact,
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

    const handleAdd = (formData: ContactFormType) => mutate(formData)

    return (
        <Modal title='Agregar contacto'>
            <form
                onSubmit={handleSubmit(handleAdd)}
                className='px-2 lg:min-w-md mt-4 space-y-4'
            >
                <ContactForm register={register} errors={errors} />

                <div className='p-2 flex items-center justify-end gap-2 mt-4'>
                    <button className='btn-secundary' type='button' onClick={toggleClose}>Cancelar</button>
                    <input type="submit" className='btn-primary' value={'Agregar'} />
                </div>

            </form>
        </Modal>
    )
}
