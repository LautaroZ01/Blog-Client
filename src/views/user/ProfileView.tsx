import { getProfile } from "@/API/UserAPI"
import AuthPhoto from "@/components/auth/AuthPhoto"
import EditBtn from "@/components/profile/EditBtn"
import EditProfileForm from "@/components/profile/EditProfileForm"
import ProfileInfo from "@/components/profile/ProfileInfo"
import UploadPhotoModal from "@/components/profile/UploadPhotoModal"
import Writer from "@/components/profile/writer/Writer"
import { roleUsers } from "@/locales/es"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { MdModeEdit } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom"

export default function ProfileView() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const isEditPath = queryParams.get('editProfile')!
    const isModalPath = queryParams.get('photoModal')!

    const [isEdit, setIsEdit] = useState(isEditPath ? true : false)
    const [isModal, setIsModal] = useState(isModalPath ? true : false)
    const navigate = useNavigate()

    useEffect(() => {
        if (isEditPath) {
            setIsEdit(true);
        } else {
            setIsEdit(false)
        }
    }, [isEditPath]);

    useEffect(() => {
        if (isModalPath) {
            setIsModal(true);
        } else {
            setIsModal(false)
        }
    }, [isModalPath]);

    const toggleEdit = () => {
        if (isEditPath) {
            navigate(location.pathname, { replace: true });
        } else {
            navigate(`${location.pathname}?editProfile=true`)
        }
    };

    const toggleModal = () => {
        if (isModalPath) {
            navigate(location.pathname, { replace: true });
        } else {
            navigate(`${location.pathname}?photoModal=true`)
        }
    };

    const { data, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile
    })

    if (isLoading) return 'Cargando...'

    if (data) return (
        <main className="container-blog space-y-4">
            <section className="flex items-center gap-4 border border-gray-200 p-4 rounded-lg">
                <div className="relative">
                    <AuthPhoto photo={data.photo} name={data.name} size="big" />
                    <button
                        type="button"
                        onClick={toggleModal}
                        className="cursor-pointer absolute -bottom-1 -right-1 bg-accent-100 rounded-full p-2 hover:bg-accent-200 transition-colors duration-pro"
                    >
                        <MdModeEdit />
                    </button>
                </div>
                <div className="space-y-0.5">
                    <h2 className="font-bold text-xl text-gray-700">{data.name} {data.lastname && data.lastname}</h2>
                    <p className="text-gray-500">{roleUsers[data.role]}</p>
                    <p className="font-bold text-gray-500">{data.email}</p>
                </div>
            </section>

            <section className="border border-gray-200 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-700">Informacion personal</h3>
                    <EditBtn editFuntion={toggleEdit} />
                </div>
                <div className="flex flex-wrap md:flex-nowrap p-2 mt-4">
                    {!isEdit ? <ProfileInfo data={data} /> : <EditProfileForm data={data} />}
                </div>
            </section>

            {data.role === 'writer' &&
                <section className="border border-gray-200 p-4 rounded-lg">
                    <Writer />
                </section>
            }

            {isModal && <UploadPhotoModal />}
        </main>
    )
}
