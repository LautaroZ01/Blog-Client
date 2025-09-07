import { deleteContact } from "@/API/WriterAPI";
import Modal from "@/components/ui/Modal";
import { Contact } from "@/types/userType"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type DeleteContactModalProps = {
  contact: Contact
}

export default function DeleteContactModal({ contact }: DeleteContactModalProps) {
  const navigate = useNavigate();
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const idContact = queryParams.get('deleteContact')!

  const toggleClose = () => navigate(location.pathname, { replace: true })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteContact,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['socialProfile'] })
      toast.success(data)
      navigate(location.pathname, { replace: true });
    }
  })

  const handleDelete = () => {
    mutate(idContact)
  }

  return (
    <Modal title="Elimina tu contact">
      <section className="p-4 text-center">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">
          ¿Estas seguro que quieres eliminar <span className="capitalize">{contact.type}</span> ?
        </h4>

        <p className="text-gray-600 mb-6 max-w-[40ch] mx-auto">
          Esta acción eliminará permanentemente el contacto <span className="font-medium capitalize">{contact.type}</span> y no se podrá deshacer.
        </p>

      </section>

      <footer className="flex p-2 items-center justify-end gap-2">
        <button
          onClick={toggleClose}
          className="btn-secundary-delete"
        >Cancelar</button>
        <button
          onClick={handleDelete}
          className="btn-primary-delete"
        >Eliminar</button>
      </footer>
    </Modal>
  )
}
