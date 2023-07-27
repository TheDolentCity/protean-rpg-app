import { io } from 'socket.io-client';

const SERVER_URI = import.meta.env.PROD
	? import.meta.env.PROD_SOCKETS_URI
	: import.meta.env.DEV_SOCKETS_URI;

export const socket = io(SERVER_URI, { transports: ['websocket'] });
