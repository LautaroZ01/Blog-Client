import { editContact } from "@/API/WriterAPI";
import Modal from "@/components/ui/Modal";
import { Contact, ContactFormType } from "@/types/userType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ContactForm from "./ContactForm";

type EditContactModalProps = {
    contact: Contact
}

export default function EditContactModal({ contact }: EditContactModalProps) {
    const navigate = useNavigate();
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const idContact = queryParams.get('editContact')!

    const initialValues: ContactFormType = {
        type: contact.type,
        name: contact.name
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: editContact,
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

    const handleEdit = (formData: ContactFormType) => {
        const data = {
            _id: idContact,
            type: formData.type,
            name: formData.name
        }

        mutate(data)

    }

    const toggleClose = () => navigate(location.pathname, { replace: true })

    return (
        <Modal title="Edita tu contacto">

            <form
                onSubmit={handleSubmit(handleEdit)}
                className='px-2 min-w-md mt-4 space-y-4'
            >
                <ContactForm register={register} errors={errors} />

                <div className='p-2 flex items-center justify-end gap-2 mt-4'>
                    <button className='btn-secundary' type='button' onClick={toggleClose}>Cancelar</button>
                    <input type="submit" className='btn-primary' value={'Guardar'} />
                </div>

            </form>
        </Modal>
    )
}
