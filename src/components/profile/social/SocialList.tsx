import { SocialNetwork } from "@/types/userType"
import SocialItem from "./SocialItem"
import { FaPlus } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AddSocialModal from "./AddSocialModal"

type SocialListProps = {
    socialList: SocialNetwork[]
}

export default function SocialList({ socialList }: SocialListProps) {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const isAddPath = queryParams.get('addSocial')!
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
            navigate(`${location.pathname}?addSocial=true`)
        }
    }

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-700">Redes sociales</h2>
                <button
                    className="btn-rounded"
                    onClick={toggleAdd}
                >
                    <FaPlus />
                </button>
            </div>
            {socialList.length > 0 ? (
                <div className="grid lg:grid-cols-3">
                    {socialList.map(social => (
                        <SocialItem key={social._id} social={social} />
                    ))}
                </div>
            ):<p className="p-4 text-gray-600 text-center">No tienes redes sociales, ¡Pulsa en el boton de agregar para hacerlo! 😉</p>
            }

            {isAdd && <AddSocialModal />}
        </>
    )
}
