/**
 * -----------------------------------------------------------------------
 * Model Types -----------------------------------------------------------
 * -----------------------------------------------------------------------
 */
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

/**
 * -----------------------------------------------------------------------
 * Room Event Types ------------------------------------------------------
 * -----------------------------------------------------------------------
 */
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

/**
 * -----------------------------------------------------------------------
 * App State Event Types -------------------------------------------------
 * -----------------------------------------------------------------------
 */
export interface RequestAppStateEvent {
	roomId: string;
	userId: string;
}

export interface PrepareAppStateEvent {
	roomId: string;
	userId: string;
}

export interface AppStatePreparedEvent {
	roomId: string;
	userId: string;
	members: User[];
	messages: Message[];
}

export interface AppStateRequestedEvent {
	roomId: string;
	members: User[];
	messages: Message[];
}

/**
 * -----------------------------------------------------------------------
 * Message Event Types ---------------------------------------------------
 * -----------------------------------------------------------------------
 */
export interface CreateMessageEvent {
	roomId: string;
	message: Message;
}

export interface MessageCreatedEvent {
	roomId: string;
	message: Message;
}

/**
 * -----------------------------------------------------------------------
 * User Event Types ------------------------------------------------------
 * -----------------------------------------------------------------------
 */
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

export interface MembersUpdatedEvent {
	members: User[];
}

/**
 * -----------------------------------------------------------------------
 * Error Event Types -----------------------------------------------------
 * -----------------------------------------------------------------------
 */
export interface InvalidDataEvent {
	message: string;
}

export interface RoomNotFoundEvent {
	message: string;
	roomId: string;
}
