import type { Messages } from "@/types/chatType"
import { User } from "@/types/userType"
import MessageItem from "./MessageItem"
import { useEffect, useRef } from "react"

type MessagesListProps = {
    messages: Messages,
    userId: User['_id']
}

export default function MessagesList({ messages, userId }: MessagesListProps) {
    // 1. Crear una referencia para el contenedor de mensajes
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // 2. Desplazar el scroll al final cuando se actualicen los mensajes
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]); // Se ejecuta cada vez que `messages` cambia

    return (
        <div ref={messagesContainerRef} className="grow flex flex-col overflow-y-auto rounded-lg gap-2 px-10">
            {messages.length > 0 ? (
                messages.map((message) => (
                    message.sender && (
                        <MessageItem message={message} userId={userId} key={message._id} />
                    )
                ))
            ) : (
                <div className="flex items-end justify-center h-full">
                    <p className="text-center px-10 py-2 rounded-lg shadow-md my-4 bg-accent-50 text-gray-500 text-sm">Aún no hay mensajes. ¡Sé el primero en enviar uno! 😃</p>
                </div>
            )}
        </div>
    )
}
