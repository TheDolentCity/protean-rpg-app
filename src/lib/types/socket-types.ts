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

export interface CreateMessageEvent {
	roomId: string;
	message: Message;
}

export interface MessageCreatedEvent {
	roomId: string;
	message: Message;
}

export interface UpdateUserEvent {
	id: string;
	roomId: string;
	username: string;
	color: string;
}

export interface UserUpdatedEvent {
	id: string;
	roomId: string;
	username: string;
	color: string;
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
	roomId: string;
	username: string;
	color: string;
}

export interface Message {
	color: string;
	text: string;
	createdBy: string;
	createdAt: Date;
}
