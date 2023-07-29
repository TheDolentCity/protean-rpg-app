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

export interface CreateMessageEvent {
	roomId: string;
	message: Message;
}

export interface MessageCreatedEvent {
	roomId: string;
	message: Message;
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
	text: string;
	createdBy: string;
	createdAt: Date;
}
