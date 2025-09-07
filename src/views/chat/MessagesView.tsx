import { getMessagesOfConversation } from "@/API/ChatAPI";
import AuthPhoto from "@/components/auth/AuthPhoto";
import MessagesList from "@/components/chat/messages/MessagesList";
import SendMessageForm from "@/components/chat/messages/SendMessageForm";
import { useAuth } from "@/hooks/useAuth";
import { useSocket } from "@/hooks/useSocket";
import socket from "@/lib/socket";
import type { Message, Messages } from "@/types/chatType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export default function MessagesView() {
    const { conversationId } = useParams();
    const [messages, setMessages] = useState<Messages>([]);
    const { data: user, isLoading: isUserLoading } = useAuth();
    const { onlineUsers, isLoading: loadingConnected } = useSocket();
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ['conversation', conversationId],
        queryFn: () => getMessagesOfConversation(conversationId || ''),
        retry: 1
    });

    useEffect(() => {
        if (data) {
            setMessages(data.messages);
            queryClient.invalidateQueries({ queryKey: ['conversationsList'] })
        }
    }, [data, queryClient]);

    useEffect(() => {
        if (conversationId) {
            socket.emit('joinConversation', conversationId);
    
            const handleReceiveMessage = (message: Message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
    
                if (message.sender._id !== user?._id) {
                    socket.emit('markMessageAsRead', conversationId, message._id);
                }
            };
    
            socket.on('newMessage', handleReceiveMessage);
    
            return () => {
                socket.emit('leaveConversation', conversationId);
                socket.off('newMessage', handleReceiveMessage);
            };
        }
    }, [conversationId, messages, user]);

    if (isLoading && isUserLoading && loadingConnected) return 'Cargando...';

    if (user) {
        if (conversationId) {
            return (
                <div className="flex flex-col w-full min-h-[calc(100vh-180px)] max-h-[calc(100vh-180px)] lg:min-h-full lg:max-h-full">
                    {data?.receiver && (
                        <div className="flex items-center justify-between px-2">
                            <div className="px-4 py-6 border-b border-gray-200 flex items-center gap-4">
                                <div className="relative">
                                    <AuthPhoto photo={data.receiver.photo} name={data.receiver.name} size="normal" />
                                    <div className={`absolute -bottom-0.5 -right-0.5 size-4 rounded-full border-2 border-accent-50 ${onlineUsers.includes(data.receiver._id) ? 'bg-accent-300' : 'bg-gray-400'}`}></div>
                                </div>
                                <div className="hidden sm:block">
                                    <h2 className="font-bold text-gray-700">{data.receiver.name} {data.receiver.lastname}</h2>
                                    <p className="text-gray-400 text-sm">{data.receiver.email}</p>
                                </div>
                            </div>

                            <Link to={'/chat/conversation'} className="btn-rounded" >
                                <IoClose />
                            </Link>
                        </div>
                    )}
                    <div className="flex grow flex-col w-full overflow-hidden bg-gray-100 rounded-b-lg">
                        <MessagesList messages={messages} userId={user._id} />
                        <SendMessageForm conversationId={conversationId} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex items-start justify-center w-full">
                    <p className="text-center px-10 py-2 rounded-lg shadow-md my-4 bg-accent-50 text-gray-500 text-sm">¡Selecciona una conversación y empieza a chatear! 👍</p>
                </div>
            );
        }
    }
}