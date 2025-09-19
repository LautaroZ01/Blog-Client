import { Contact } from "@/types/userType"
import { toast } from "react-toastify"

type BtnCopyContactProps = {
    contact: Contact['name']
    children: React.ReactNode
    className?: string
}

export default function BtnCopyContact({ contact, children, className = '' }: BtnCopyContactProps) {

    const copyContact = () => {
        navigator.clipboard.writeText(contact)
        toast.success(`Contacto ${contact} copiado`)
    }

    return (
        <button onClick={copyContact} className={`${className} cursor-pointer`}>
            {children}
        </button>
    )
}
