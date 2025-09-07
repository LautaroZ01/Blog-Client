import { createContext } from "react";

export const SocketContext = createContext<{
    onlineUsers: string[];
    isLoading: boolean;
    setOnlineUsers: (users: string[]) => void;
}>({
    onlineUsers: [],
    isLoading: false,
    setOnlineUsers: () => {}
});