import HeaderAuth from "@/components/auth/HeaderAuth"
import NewPasswordToken from "@/components/auth/NewPasswordToken"
import NewPasswordForm from "@/components/auth/NewPasswordForm"
import { ConfirmToken } from "@/types/userType"
import { useState } from "react"

export default function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const [isValidToken, setIsValidToken] = useState(false)

    return (
        <>
            <HeaderAuth
                title="Nueva Contraseña"
                text="Ingresa el codigo que recibiste"
                strongText="por email"
            />

            {!isValidToken ? <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} /> :
                <NewPasswordForm token={token} />}

        </>
    )
}
