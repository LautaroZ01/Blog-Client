import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import HeaderAuth from "@/components/auth/HeaderAuth";
import { ConfirmToken } from '@/types/userType';
import { useState } from 'react';
import { confirmAccount } from '@/API/AuthAPI';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

export default function ConfirmAccountView() {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const navigate = useNavigate()

    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate('/auth/login')
        }
    })

    const handleComplete = (token: ConfirmToken['token']) => mutate({ token })

    return (
        <>
            <HeaderAuth
                title="Confirma tu Cuenta"
                text='Ingresa el código que recibiste'
                strongText='por e-mail'
            />

            <form
                className="min-w-full md:min-w-xl max-w-full mx-auto"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>

                <div className="flex justify-center gap-5">
                    <PinInput otp value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="size-10 p-3 rounded-lg border border-gray-300 placeholder-white" />
                        <PinInputField className="size-10 p-3 rounded-lg border border-gray-300 placeholder-white" />
                        <PinInputField className="size-10 p-3 rounded-lg border border-gray-300 placeholder-white" />
                        <PinInputField className="size-10 p-3 rounded-lg border border-gray-300 placeholder-white" />
                        <PinInputField className="size-10 p-3 rounded-lg border border-gray-300 placeholder-white" />
                        <PinInputField className="size-10 p-3 rounded-lg border border-gray-300 placeholder-white" />
                    </PinInput>
                </div>

            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/request-code'
                    className="text-center text-gray-500 font-normal"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
    )
}
