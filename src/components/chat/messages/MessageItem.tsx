import AuthPhoto from "@/components/auth/AuthPhoto"
import { Message } from "@/types/chatType"
import { User } from "@/types/userType"
import { formatDate } from "@/utils/formatUtil"

type MessageItemProps = {
    message: Message,
    userId: User['_id']
}

export default function MessageItem({ message, userId }: MessageItemProps) {
    const isSender = message.sender._id === userId

    return (
        <div className={`flex gap-2 p-2 items-end insert-animation ${isSender ? 'flex-row-reverse' : ''} `}>
            <div className="hidden sm:block">
                <AuthPhoto photo={message.sender.photo} name={message.sender.name} size="small" />
            </div>
            <div className={`max-w-50 sm:max-w-96 lg:max-w-lg text-xs sm:text-sm lg:text-base text-wrap rounded-t-4xl text-gray-700 py-2 px-6 ${isSender ? 'bg-accent-50 rounded-bl-4xl' : 'bg-white rounded-br-4xl'}`}>
                <p>{message.text}</p>
            </div>
            <div className="flex h-full items-end text-gray-500">
                <small>{formatDate(message.createdAt.toString())}</small>
            </div>
        </div>
    )
}
