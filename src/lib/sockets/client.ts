import { io } from 'socket.io-client';

const SERVER_URI = import.meta.env.PROD
	? import.meta.env.VITE_PROD_SOCKETS_URI
	: import.meta.env.VITE_DEV_SOCKETS_URI;

console.log(SERVER_URI);

export const socket = io(SERVER_URI, { transports: ['websocket'] });
