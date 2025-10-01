import { UserDashboard } from "@/types/type"
import Modal from "@/components/ui/Modal"
import AuthPhoto from "@/components/auth/AuthPhoto"
import EditUserDashboardForm from "./EditUserDashboardForm"
import { useState } from "react"
import { changeUserStatus } from "@/API/UserAPI"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import ComentList from "@/components/post/comment/ComentList"
import { formatAge } from "@/utils/formatUtil"
import { roleUsers, userProvider, userStatus } from "@/locales/es"
import { roleColor, statusColor } from "@/utils/dashboardUtil"
import SocialIcon from "@/components/icons/SocialIcon"
import { Author } from "@/types/userType"

type UserDetailModalProps = {
    user: UserDashboard
}

export default function UserDetailModal({ user }: UserDetailModalProps) {
    const [isRole, setIsRole] = useState(false)
    const [changeInfo, setChangeInfo] = useState({
        info: true,
        social: false,
        comments: false
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: changeUserStatus,
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['usersDashboard'] })
            queryClient.invalidateQueries({ queryKey: ['userDetail', user._id] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const author: Author = {
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        role: user.role
    }

    return (
        <Modal title="Detalle de usuario" isUserModal>
            <section className="min-w-2xl py-4 px-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <AuthPhoto photo={user.photo} name={user.name} size="semi-big" />
                        <div className="flex flex-col">
                            <h2 className="font-semibold">
                                {user.name} {user.lastname} {' '}
                                {user.nickname && <small className="text-gray-500 ">({user?.nickname})</small>}
                            </h2>
                            <small className="text-gray-500">
                                {user.email}
                            </small>
                        </div>
                    </div>
                    <button className="btn-secundary" onClick={() => mutate(user._id)}>
                        {user.status === 'suspended' || user.status === 'inactive' ? 'Habilitar' : 'Suspender'}
                    </button>
                </div>

                <div className="user-detail-box">
                    <div className="flex items-center gap-4 font-semibold mb-8">
                        <button className={`${changeInfo.info ? 'user-detail-btn-active' : 'user-detail-btn-not-active'} cursor-pointer`} onClick={() => setChangeInfo({ info: true, social: false, comments: false })}>Informacion</button>
                        {(user.role == 'writer' &&
                            <button className={`${changeInfo.social ? 'user-detail-btn-active' : 'user-detail-btn-not-active'} cursor-pointer`} onClick={() => setChangeInfo({ info: false, social: true, comments: false })}>Redes Sociales</button>
                        )}
                        <button className={`${changeInfo.comments ? 'user-detail-btn-active' : 'user-detail-btn-not-active'} cursor-pointer`} onClick={() => setChangeInfo({ info: false, social: false, comments: true })}>Comentarios</button>
                    </div>
                    {changeInfo.info && (
                        <>
                            <div className="user-detail-content insert-animation">
                                <div>
                                    <strong>Rol</strong>
                                    <small className={`badget-dashboard ${roleColor[user.role]}`}>{roleUsers[user.role]}</small>
                                </div>
                                <div>
                                    <strong>Estado</strong>
                                    <small className={`badget-dashboard ${statusColor[user.status]}`}>{userStatus[user.status]}</small>
                                </div>
                            </div>
                            <div className="user-detail-content insert-animation">
                                <div>
                                    <strong>Edad</strong>
                                    <p>{user.birthdate ? formatAge(user.birthdate) : 'N/A'}</p>
                                </div>
                                <div>
                                    <strong>Pais</strong>
                                    <p>{user.country ? user.country : 'N/A'}</p>
                                </div>
                            </div>
                            <div className="user-detail-content insert-animation">
                                <div>
                                    <strong>Registrado en</strong>
                                    <p>{userProvider[user.provider]}</p>
                                </div>
                                <div>
                                    <strong>Cantidad de comentarios</strong>
                                    <p>{user.comments.length}</p>
                                </div>
                            </div>
                            {user.bio && <div className="text-gray-500 flex flex-col gap-4 insert-animation max-w-[65ch]">
                                <strong>Bio</strong>
                                <p>{user.bio}</p>
                            </div>}
                        </>
                    )}
                    {changeInfo.social && user.socialNetworks && (
                        <div className="user-detail-content insert-animation">

                            <div className="flex flex-col gap-2 w-full">
                                <strong>Redes Sociales</strong>
                                {user.socialNetworks.length > 0 ? user.socialNetworks.map(socialNetwork => (
                                    <a
                                        href={socialNetwork.url}
                                        target="_blank"
                                        key={socialNetwork._id}
                                        className="capitalize flex items-center pr-4 border-b border-transparent hover:border-primary-400 transition-colors duration-pro"
                                    >
                                        <div className="flex flex-col">
                                            <p>{socialNetwork.name}</p>
                                            <small>{socialNetwork.type}</small>
                                        </div>
                                        <SocialIcon name={socialNetwork.type} size="small" />
                                    </a>
                                )) : (
                                    <p className="text-center">No hay redes sociales</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <strong>Contactos</strong>
                                {user.contacts.length > 0 ? user.contacts.map(contact => (
                                    <div
                                        key={contact._id}
                                        className="flex items-center pr-4 transition-colors duration-pro"
                                    >
                                        <div className="flex flex-col">
                                            <p>{contact.name}</p>
                                            <small>{contact.type}</small>
                                        </div>
                                        <SocialIcon name={contact.type} size="small" />
                                    </div>
                                )) : (
                                    <p className="text-center">No hay contactos</p>
                                )}
                            </div>
                        </div>
                    )}
                    {changeInfo.comments && (
                        <div className="insert-animation overflow-y-auto max-h-[300px]">
                            {user.comments.length > 0 ? (
                                <ComentList comments={user.comments} author={author} isUser={true} />
                            ) : (
                                <p className="text-center">No hay comentarios</p>
                            )}

                        </div>
                    )}
                </div>
                <button className="btn-primary w-full" onClick={() => setIsRole(!isRole)}>Modificar rol</button>
                {isRole && <EditUserDashboardForm userId={user._id} role={user.role} setIsRole={setIsRole} />}
            </section>
        </Modal>
    )
}
