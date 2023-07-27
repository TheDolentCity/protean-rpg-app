/** CORE EVENTS */
export interface CreateRoomEvent {
	roomId: string;
	username: string;
}

export interface RoomCreatedEvent {
	roomId: string;
	user: User;
}

export interface JoinRoomEvent {
	roomId: string;
	username: string;
}

export interface RoomJoinedEvent {
	roomId: string;
	user: User;
	members: User[];
}

export interface UpdateMembersEvent {
	members: User[];
}

/** ERROR EVENTS */
export interface InvalidDataEvent {
	message: string;
}

export interface RoomNotFoundEvent {
	message: string;
	roomId: string;
}

/** MODELS */
export interface User {
	id: string;
	username: string;
	roomId: string;
}

export interface Message {
	username: string;
	text: string;
	time: number;
}
