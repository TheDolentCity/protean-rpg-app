import { readable, writable, type Readable, type Writable } from 'svelte/store';
import { io, Socket } from 'socket.io-client';

// const SERVER_URI = import.meta.env.PROD
// 	? import.meta.env.VITE_PROD_SOCKETS_URI
// 	: import.meta.env.VITE_DEV_SOCKETS_URI;
// console.log(SERVER_URI);

// let ws: Socket | null = null;
// export const socket: Readable<Socket | null> = readable(null, (set) => {
// 	if (import.meta.hot) {
// 		if (!import.meta.hot.data.wsocket) {
// 			ws = io(SERVER_URI, { transports: ['websocket'] });
// 			import.meta.hot.data.wsocket = ws;
// 		} else {
// 			ws = import.meta.hot.data.wsocket;
// 		}
// 	} else if (!ws) {
// 		ws = io(SERVER_URI, { transports: ['websocket'] });
// 	}
// });

export const creatingRoom: Writable<boolean> = writable(false);
export const joiningRoom: Writable<boolean> = writable(false);
