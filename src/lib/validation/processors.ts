import type {
	AppStatePreparedEvent,
	CreateMessageEvent,
	CreateRoomEvent,
	JoinRoomEvent,
	RequestAppStateEvent,
	UpdateUserEvent
} from '$lib/types/socket-types';
import {
	AppStatePreparedSchema,
	CreateMessageSchema,
	CreateRoomSchema,
	JoinRoomSchema,
	RequestAppStateSchema,
	UpdateUserSchema
} from '$lib/validation/schemas';

import { ValiError } from 'valibot';

/**
 * -----------------------------------------------------------------------
 * Room Processors -------------------------------------------------------
 * -----------------------------------------------------------------------
 */
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

/**
 * -----------------------------------------------------------------------
 * App State Processors --------------------------------------------------
 * -----------------------------------------------------------------------
 */
export function validRequestAppState(event: RequestAppStateEvent) {
	try {
		return RequestAppStateSchema.parse(event);
	} catch (error) {
		if (error instanceof ValiError) {
			console.debug(error);
		}
	}
}

export function validAppStatePrepared(event: AppStatePreparedEvent) {
	try {
		return AppStatePreparedSchema.parse(event);
	} catch (error) {
		if (error instanceof ValiError) {
			console.debug(error);
		}
	}
}

/**
 * -----------------------------------------------------------------------
 * User Processors -------------------------------------------------------
 * -----------------------------------------------------------------------
 */
export function validUpdateUser(event: UpdateUserEvent) {
	try {
		return UpdateUserSchema.parse(event);
	} catch (error) {
		if (error instanceof ValiError) {
			console.debug(error);
		}
	}
}

/**
 * -----------------------------------------------------------------------
 * Message Processors ----------------------------------------------------
 * -----------------------------------------------------------------------
 */
export function validCreateMessage(event: CreateMessageEvent) {
	try {
		return CreateMessageSchema.parse(event);
	} catch (error) {
		if (error instanceof ValiError) {
			console.debug(error);
		}
	}
}
