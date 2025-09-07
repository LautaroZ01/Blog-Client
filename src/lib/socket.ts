import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL, {
    autoConnect: false,
    query: {}
});

export default socket;