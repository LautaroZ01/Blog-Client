import { getSocialProfile } from "@/API/WriterAPI"
import ContactList from "@/components/profile/contact/ContactList"
import SocialList from "@/components/profile/social/SocialList"
import { useAuth } from "@/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"

export default function SocialContactView() {
    const { data, isLoading } = useAuth()

    const { data: social, isLoading: isLoadingSocial } = useQuery({
        queryKey: ['socialProfile'],
        queryFn: getSocialProfile,
        retry: 1
    })

    if (isLoading || isLoadingSocial) return 'Cargando...'

    if (data?.role !== 'writer') return <Navigate to={'/user/profile'} />

    if (data && social) return (
        <section className="container-blog grid grid-cols-1 gap-4">
            <div>
                <SocialList socialList={social.socialNetworks} />
            </div>
            <div>
                <ContactList contacts={social.contacts} />
            </div>
        </section>
    )
}
