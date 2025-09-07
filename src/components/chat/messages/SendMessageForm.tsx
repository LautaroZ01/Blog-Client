import { sendMessage } from "@/API/ChatAPI";
import ErrorMessage from "@/components/ui/ErrorMessage";
import type { SendFormMessage, SendMessage } from "@/types/chatType"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import { FiSend } from "react-icons/fi";
import { toast } from "react-toastify";

type SendFormMessageProps = {
    conversationId: string
}

export default function SendMessageForm({ conversationId }: SendFormMessageProps) {
    const initialValues: SendFormMessage = {
        text: ""
    }

    const queryClient = useQueryClient()

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: sendMessage,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['conversationsList'] })
            reset()
        }
    })

    const handleForm = (formData: SendFormMessage) => {
        if (conversationId) {
            const messageForm: SendMessage = {
                conversationId,
                text: formData.text
            }
            mutate(messageForm)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(handleForm)}
            noValidate
            className="px-10 py-4"
        >
            {errors.text && (
                <ErrorMessage>{errors.text.message}</ErrorMessage>
            )}
            <div className="bg-white p-2 pr-4 rounded-md shadow-lg flex items-center gap-4">
                <input
                    id="text"
                    type="text"
                    placeholder="Envia tu mensaje"
                    className="input-data bg-gray-100 rounded-lg"
                    {...register("text", {
                        required: "El mensaje es obligatorio",
                    })}
                />

                <button type="submit" className="btn-rounded">
                    <FiSend className="size-4" />
                </button>
            </div>
        </form>
    )
}
