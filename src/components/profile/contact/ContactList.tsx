import { Contact } from "@/types/userType"
import ContactItem from "./ContactItem"
import { FaPlus } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import AddContactModal from "./AddContactModal"

type ContactListProps = {
    contacts: Contact[]
}

export default function ContactList({ contacts }: ContactListProps) {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const isAddPath = queryParams.get('addContact')!
    const navigate = useNavigate()

    const [isAdd, setIsAdd] = useState(isAddPath ? true : false)

    useEffect(() => {
        if (isAddPath) {
            setIsAdd(true)
        } else {
            setIsAdd(false)
        }
    }, [isAddPath])

    const toggleAdd = () => {
        if (isAddPath) {
            navigate(location.pathname, { replace: true });
        } else {
            navigate(`${location.pathname}?addContact=true`)
        }
    }

    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-700">Contactos</h2>
                <button
                    className="btn-rounded"
                    onClick={toggleAdd}
                >
                    <FaPlus />
                </button>
            </div>
            {contacts.length > 0 ? (
                <div className="grid grid-cols-3">
                    {contacts.map(contact => (
                        <ContactItem key={contact._id} contact={contact} />
                    ))}
                </div>
            ) :
                <p className="p-4 text-gray-600 text-center">No tienes contactos, ¡Pulsa en el boton de agregar para hacerlo! 😎</p>
            }

            {isAdd && <AddContactModal />}
        </>
    )
}
