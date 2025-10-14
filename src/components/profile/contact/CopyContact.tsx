import SocialIcon from "@/components/icons/SocialIcon"
import { Contact } from "@/types/userType"
import { useState } from "react"
import { toast } from "react-toastify"

type CopyContactProps = {
    contact: Contact,
    isActive?: boolean
}

export default function CopyContact({ contact, isActive = true }: CopyContactProps) {
    const [isCopied, setIsCopied] = useState(false)

    const copyContact = () => {
        setIsCopied(true)
        toast.success('Contacto copiado')
        navigator.clipboard.writeText(contact.name)
        setTimeout(() => {
            setIsCopied(false)
        }, 1000)
    }
    
    return (
        <button onClick={copyContact} className="flex items-center gap-2 p-2 cursor-pointer">
            {isCopied ? (
                <SocialIcon name={"copy"} size="small" />
            ) : (
                <SocialIcon name={contact.type} size="small" />
            )}
            {isActive && (
                <span className="text-gray-500 font-semibold hover:text-primary-500 transition-colors duration-pro">{contact.name}</span>
            )}
        </button>
    )
}
