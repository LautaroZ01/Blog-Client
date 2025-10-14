import AuthPhoto from "@/components/auth/AuthPhoto";
import { AiFillMessage } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { getWriteInfo } from "@/API/WriterAPI";
import { formatAge } from "@/utils/formatUtil";
import SocialIcon from "@/components/icons/SocialIcon";
import CopyContact from "../contact/CopyContact";

export default function WriterModal() {
    const navigate = useNavigate();
    const toggleClose = () => navigate(location.pathname, { replace: true })

    const queryParams = new URLSearchParams(location.search)
    const writerId = queryParams.get('writerId')!

    const { data, isLoading } = useQuery({
        queryKey: ['writerInfo', writerId],
        queryFn: () => getWriteInfo(writerId)
    })

    if (!writerId) return null

    if (isLoading) return 'Cargando...'

    if (data) return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <article className="bg-white p-6 rounded-lg lg:min-w-2xl menu-animation">
                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <AuthPhoto photo={data.photo} name={data.name} size="big" />
                            <Link to='/chat/conversation' className="absolute -bottom-1 -right-1 btn-rounded z-10">
                                <AiFillMessage size={24} />
                            </Link>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="font-semibold text-xl">
                                {data.name} {data.lastname} {' '}
                                <small className="text-gray-500 ">({data.nickname})</small>
                            </h2>
                            <small className="text-gray-500">
                                {data.email}
                            </small>
                        </div>
                    </div>
                    <button
                        onClick={toggleClose}
                        type="button"
                        className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200 rounded-full p-1 hover:bg-gray-100"
                    >
                        <IoClose className="text-xl" />
                    </button>
                </header>
                <section className="mt-6 p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">Biografia</h3>
                        <div className="space-x-4 font-bold">
                            {data.birthdate && <small className="px-2 py-1 rounded-full bg-accent-400/10 text-accent-400">{formatAge(data.birthdate)} años</small>}
                            {data.country && <small className="px-2 py-1 rounded-full bg-primary-500/10 text-primary-500">{data.country}</small>}
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="mt-2 max-w-[75ch]">
                            {data.bio}
                        </p>
                    </div>
                    <div className="flex items-center gap-4 mt-8">
                        <div className="mt-2 flex items-center gap-2">
                            {data.socialNetworks && Object.entries(data.socialNetworks).map(([key, value]) => (
                                <a key={key} href={value.url} target="_blank" rel="noopener noreferrer" className="link-social">
                                    <SocialIcon name={value.type} size="small" />
                                </a>
                            ))}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                            {data.contacts && Object.entries(data.contacts).map(([key, value]) => (
                                <CopyContact key={key} contact={value} isActive={false}/>
                            ))}
                        </div>
                    </div>
                </section>
            </article>
        </div>
    )
}
