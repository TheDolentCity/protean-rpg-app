import type { CreateRoomEvent, JoinRoomEvent } from '$lib/types/socket-types';
import { CreateRoomSchema, JoinRoomSchema } from '$lib/validation/schemas';

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