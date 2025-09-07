import SocialIcon from "@/components/icons/SocialIcon"
import { SocialNetwork } from "@/types/userType"
import { useEffect, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import EditSocialModal from "./EditSocialModal";
import DeleteSocialModal from "./DeleteSocialModal";

type SocialItemProps = {
    social: SocialNetwork
}

export default function SocialItem({ social }: SocialItemProps) {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const idSocial = queryParams.get('editSocial')
    const idSocialDelete = queryParams.get('deleteSocial')
    const isEditPath = Boolean(idSocial)
    const isDeletePath = Boolean(idSocialDelete)
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
            document.body.style.overflow = 'auto';
        } else {
            navigate(`${location.pathname}?editSocial=${social._id}`)
            document.body.style.overflow = 'hidden';
        }
    }

    const toggleDelete = () => {
        if (isDeletePath) {
            navigate(location.pathname, { replace: true });
        } else {
            navigate(`${location.pathname}?deleteSocial=${social._id}`)
        }
    }

    return (
        <>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
                <div className="flex items-start justify-between relative z-10">
                    <a
                        href={social.url}
                        target="_blank"
                        className="group-hover:text-primary-600 transition-colors duration-200"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <SocialIcon
                                name={social.type}
                                size="small"
                            />
                            <h3 className="text-lg font-semibold text-gray-800 capitalize">{social.name}</h3>
                        </div>
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                            {social.type}
                        </span>
                    </a>
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
                    <SocialIcon name={social.type} size='big' />
                </div>
            </div>
            {isEdit && idSocial === social._id && <EditSocialModal social={social} />}
            {isDelete && idSocialDelete === social._id && <DeleteSocialModal social={social} />}

        </>
    )
}
