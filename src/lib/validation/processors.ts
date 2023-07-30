import type {
	CreateMessageEvent,
	CreateRoomEvent,
	JoinRoomEvent,
	UpdateUserEvent
} from '$lib/types/socket-types';
import {
	CreateMessageSchema,
	CreateRoomSchema,
	JoinRoomSchema,
	UpdateUserSchema
} from '$lib/validation/schemas';

import { ValiError } from 'valibot';

export function validCreateRoom(event: CreateRoomEvent) {
	try {
		return CreateRoomSchema.parse(event);
	} catch (error) {
		if (error instanceof ValiError) {
			console.debug(error);
		}
	}
}

export function validJoinRoom(event: JoinRoomEvent) {
	try {
		return JoinRoomSchema.parse(event);
	} catch (error) {
		if (error instanceof ValiError) {
			console.debug(error);
		}
	}
}

export function validUpdateUser(event: UpdateUserEvent) {
	try {
		return UpdateUserSchema.parse(event);
	} catch (error) {
		if (error instanceof ValiError) {
			console.debug(error);
		}
	}
}

export function validCreateMessage(event: CreateMessageEvent) {
	try {
		return CreateMessageSchema.parse(event);
	} catch (error) {
		if (error instanceof ValiError) {
			console.debug(error);
		}
	}
}
