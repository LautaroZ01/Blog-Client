import { Link, NavLink } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import AuthPhoto from "../auth/AuthPhoto";
import ArrowBack from "../ui/ArrowBack";
import { Conversations, MessageConversation } from "@/types/chatType";
import { useSocket } from "@/hooks/useSocket";
import { useAuth } from "@/hooks/useAuth";
import socket from "@/lib/socket";
import { Sesion } from "@/types/userType";

type ConversationsListProps = {
    conversations: Conversations;
};

export default function ConversationsList({ conversations: initialConversations }: ConversationsListProps) {
    const [conversations, setConversations] = useState<Conversations>(initialConversations);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { onlineUsers, isLoading: isSocketLoading } = useSocket();
    const { data: authData, isLoading: isAuthLoading } = useAuth();

    useEffect(() => {
        const handleUpdateConversationList = (data: { conversationId: string, lastMessage: MessageConversation }) => {
            const { conversationId, lastMessage } = data;
            console.log(lastMessage)
            setConversations(prev =>
                prev.map(conv =>
                    conv._id === conversationId
                        ? { ...conv, messages: [...conv.messages, lastMessage.sender.toString() === authData?._id.toString() ? { ...lastMessage, isRead: true } : lastMessage] }
                        : conv
                )
            );
        };

        const handleMessageRead = (messageId: string) => {
            setConversations(prev =>
                prev.map(conv => ({
                    ...conv,
                    messages: conv.messages.map(msg =>
                        msg._id === messageId ? { ...msg, isRead: true } : msg
                    ),
                }))
            );
        };

        const handleMessagesMarkedAsRead = (data: { conversationId: string, messageIds: string[] }) => {
            const { conversationId, messageIds } = data;
            setConversations(prev =>
                prev.map(conv =>
                    conv._id === conversationId
                        ? {
                            ...conv,
                            messages: conv.messages.map(msg =>
                                messageIds.includes(msg._id.toString()) ? { ...msg, isRead: true } : msg
                            ),
                        }
                        : conv
                )
            );
        };

        socket.on('messagesMarkedAsRead', handleMessagesMarkedAsRead);
        socket.on('messageRead', handleMessageRead);
        socket.on('updateConversationList', handleUpdateConversationList);

        return () => {
            socket.off('updateConversationList', handleUpdateConversationList);
            socket.off('messageRead', handleMessageRead);
            socket.off('messagesMarkedAsRead', handleMessagesMarkedAsRead);
        };
    }, [authData]);

    const unreadCounts = useMemo(() => {
        return conversations.reduce((counts, conversation) => {
            const unreadMessages = conversation.messages.filter(
                message => !message.isRead && message.sender.toString() !== authData?._id.toString()
            );
            counts[conversation._id] = unreadMessages.length;
            return counts;
        }, {} as { [key: string]: number });
    }, [conversations, authData]);

    const filteredConversations = useMemo(() => {
        return conversations.filter(conversation => {
            const participant = conversation.participants[0];
            return participant?.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [conversations, searchTerm]);

    if (isSocketLoading || isAuthLoading) return <p>Cargando...</p>;

    if (authData) return (
        <div className="flex flex-col gap-2 lg:gap-0 min-w-full lg:min-w-80 bg-white p-2 overflow-y-auto">
            <div className="flex items-center justify-between gap-2 md:mb-4">
                <ArrowBack />
                <h1 className="h1-style">Chat</h1>
                <Link to="/chat/new-chat" className="btn-rounded">
                    <FaPlus />
                </Link>
            </div>

            <div className="flex items-center justify-center lg:hidden my-4">
                <button className="btn-primary" onClick={() => setIsOpen(!isOpen)}>
                    Ver más
                </button>
            </div>

            <SearchForm isOpen={isOpen} searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <ConversationList
                conversations={filteredConversations}
                unreadCounts={unreadCounts}
                onlineUsers={onlineUsers}
                searchTerm={searchTerm}
                isOpen={isOpen}
                authData={authData}
            />
        </div>
    );
}

const SearchForm = ({ isOpen, searchTerm, onSearchChange }: {
    isOpen: boolean;
    searchTerm: string;
    onSearchChange: (term: string) => void;
}) => (
    <form
        onSubmit={(e) => e.preventDefault()}
        className={`${isOpen ? 'flex' : 'hidden'} lg:flex items-center justify-center gap-4 w-full lg:max-w-96 border border-gray-300 rounded-md`}
    >
        <input
            type="text"
            placeholder="Busca a una persona aquí..."
            className="w-full p-2 focus:outline-none autofill:bg-white autofill:text-gray-800"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
        />
        <button type="submit" className="text-gray-500 py-2 px-4 border-l border-gray-300 cursor-pointer">
            <FiSearch />
        </button>
    </form>
);

const ConversationList = ({ conversations, unreadCounts, onlineUsers, searchTerm, isOpen, authData }: {
    conversations: Conversations;
    unreadCounts: { [key: string]: number };
    onlineUsers: string[];
    searchTerm: string;
    isOpen: boolean;
    authData: Sesion;
}) => (
    <div className={`${conversations.length ? 'block' : 'hidden'} lg:block overflow-y-auto my-4`}>
        {conversations.length > 0 ? (
            conversations.map(conversation => {
                const participant = conversation.participants[0];
                const unreadCount = unreadCounts[conversation._id] || 0;
                const lastMessage = conversation.messages[conversation.messages.length - 1];

                return (
                    <NavLink
                        key={conversation._id}
                        to={`/chat/conversation/${conversation._id}`}
                        className={({ isActive }) =>
                            `p-2 rounded flex items-center gap-4 lg:flex ${isActive ? "shadow-lg bg-primary-50" : ""}
                        ${isOpen ? 'flex' : 'hidden'}
                        `
                        }
                    >
                        <div className="relative">
                            <AuthPhoto photo={participant.photo} name={participant.name} size="small" />
                            <div className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-accent-50 ${onlineUsers.includes(participant._id) ? 'bg-accent-300' : 'bg-gray-400'}`}></div>
                        </div>
                        <div className="flex flex-col gap-1 grow">
                            <p className="font-semibold text-gray-700">{participant.name}</p>
                            <div className="flex items-center justify-between">
                                <p className={`${lastMessage && !lastMessage.isRead && lastMessage.sender.toString() !== authData._id.toString() ? 'text-black font-bold' : 'text-gray-500'} text-sm line-clamp-1 max-w-[40ch]`}>
                                    {lastMessage ? lastMessage.text : "Aún no hay mensajes"}
                                </p>
                                {unreadCount > 0 && (
                                    <div className="bg-accent-100 text-accent-50 rounded-full px-2 py-1 text-xs font-bold">
                                        {unreadCount}
                                    </div>
                                )}
                            </div>
                        </div>
                    </NavLink>
                );
            })
        ) : (
            <p className="text-gray-500 text-center p-4">
                No se encontraron resultados para "{searchTerm}".
            </p>
        )}
    </div>
);