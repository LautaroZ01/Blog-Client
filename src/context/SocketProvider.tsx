import { useEffect, useState } from "react";
import socket from "@/lib/socket";
import { SocketContext } from "./SocketContext";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        socket.on('getOnlineUsers', (users: string[]) => {
            setOnlineUsers(users);
            setIsLoading(false);
        });

        return () => {
            socket.off('getOnlineUsers');
        };
    }, []);

    return (
        <SocketContext.Provider value={{ onlineUsers, isLoading, setOnlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};