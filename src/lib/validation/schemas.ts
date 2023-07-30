import { length, maxLength, minLength, object, startsWith, string, toTrimmed } from 'valibot';

export const CreateRoomSchema = object({
	username: string([
		minLength(2, 'Username must be at least 2 characters'),
		maxLength(32, 'Username cannot be more than 32 characters.')
	]),
	roomId: string([toTrimmed(), length(21, 'Room ID must be exactly 21 characters.')])
});

export const JoinRoomSchema = object({
	username: string([
		minLength(2, 'Username must be at least 2 characters'),
		maxLength(32, 'Username cannot be more than 32 characters.')
	]),
	roomId: string([toTrimmed(), length(21, 'Room ID must be exactly 21 characters.')])
});

export const UpdateUserSchema = object({
	roomId: string([toTrimmed(), length(21, 'Room ID must be exactly 21 characters.')]),
	username: string([
		minLength(2, 'Username must be at least 2 characters'),
		maxLength(32, 'Username cannot be more than 32 characters.')
	]),
	color: string([
		startsWith('#', "HEX color must start with '#'."),
		length(7, 'HEX string must be seven characters long.')
	])
});

export const CreateMessageSchema = object({
	message: object({
		text: string([
			minLength(1, 'Text must be at least 1 characters'),
			maxLength(256, 'Text cannot be more than 256 characters.')
		]),
		createdBy: string([
			minLength(2, 'Created by must be at least 2 characters'),
			maxLength(32, 'Created by cannot be more than 32 characters.')
		])
	})
});
