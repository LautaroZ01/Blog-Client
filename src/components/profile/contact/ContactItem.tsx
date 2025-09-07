import SocialIcon from "@/components/icons/SocialIcon"
import { Contact } from "@/types/userType"
import { useEffect, useState } from "react"
import { MdDelete, MdModeEdit } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom"
import EditContactModal from "./EditContactModal"
import DeleteContactModal from "./DeleteContactModal"

type ContactItemProps = {
    contact: Contact
}

export default function ContactItem({ contact }: ContactItemProps) {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const idContact = queryParams.get('editContact')
    const idContactDelete = queryParams.get('deleteContact')
    const isEditPath = Boolean(idContact)
    const isDeletePath = Boolean(idContactDelete)

    const navigate = useNavigate()

    const [isEdit, setIsEdit] = useState(isEditPath ? true : false)
    const [isDelete, setIsDelete] = useState(isDeletePath ? true : false)

    useEffect(() => {
        if (isEditPath) {
            setIsEdit(true)
        } else {
            setIsEdit(false)
        }
    }, [isEditPath])

    useEffect(() => {
        if (isDeletePath) {
            setIsDelete(true)
        } else {
            setIsDelete(false)
        }
    }, [isDeletePath])

    const toggleEdit = () => {
        if (isEditPath) {
            navigate(location.pathname, { replace: true });
        } else {
            navigate(`${location.pathname}?editContact=${contact._id}`)
        }
    }

    const toggleDelete = () => {
        if (isDeletePath) {
            navigate(location.pathname, { replace: true });
        } else {
            navigate(`${location.pathname}?deleteContact=${contact._id}`)
        }
    }


    return (
        <>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
                <div className="flex items-start justify-between relative z-10">
                    <div className="group-hover:text-primary-600 transition-colors duration-200">
                        <div className="flex items-center gap-3 mb-2">
                            <SocialIcon
                                name={contact.type}
                                size="small"
                            />
                            <h3 className="text-lg font-semibold text-gray-800 capitalize">{contact.name}</h3>
                        </div>
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                            {contact.type}
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-4 relative z-10">
                    <button
                        className="text-gray-400 cursor-pointer hover:text-red-600 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                        aria-label="Eliminar"
                        onClick={toggleDelete}
                    >
                        <MdDelete size={18} />
                    </button>
                    <button
                        className="text-gray-400 cursor-pointer hover:text-primary-600 transition-colors duration-200 p-2 rounded-full hover:bg-primary-50"
                        aria-label="Editar"
                        onClick={toggleEdit}
                    >
                        <MdModeEdit size={18} />
                    </button>
                </div>

                <div className="absolute -bottom-6 -left-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <SocialIcon name={contact.type} size='big' />
                </div>
            </div>

            {isEdit && idContact === contact._id && <EditContactModal contact={contact} />}
            {isDelete && idContactDelete === contact._id && <DeleteContactModal contact={contact} />}

        </>
    )
}
