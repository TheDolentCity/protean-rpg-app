import {
	array,
	length,
	maxLength,
	minLength,
	object,
	startsWith,
	string,
	toTrimmed
} from 'valibot';

/**
 * -----------------------------------------------------------------------
 * Model Schemas ---------------------------------------------------------
 * -----------------------------------------------------------------------
 */
export const RoomIdSchema = string([
	toTrimmed(),
	length(21, 'Room ID must be exactly 21 characters.')
]);

export const UsernameSchema = string([
	minLength(2, 'Username must be at least 2 characters'),
	maxLength(32, 'Username cannot be more than 32 characters.')
]);

export const ColorSchema = string([
	startsWith('#', "HEX color must start with '#'."),
	length(7, 'HEX string must be seven characters long.')
]);

export const MessageSchema = object({
	text: string([
		minLength(1, 'Text must be at least 1 characters'),
		maxLength(256, 'Text cannot be more than 256 characters.')
	]),
  createdBy: string([
    minLength(1, "Created by must not be empty."),
  ]),
});

export const UserSchema = object({
	roomId: RoomIdSchema,
	username: UsernameSchema,
	color: ColorSchema
});

/**
 * -----------------------------------------------------------------------
 * Room Schemas ----------------------------------------------------------
 * -----------------------------------------------------------------------
 */
export const CreateRoomSchema = object({
	roomId: RoomIdSchema,
	username: UsernameSchema
});

export const JoinRoomSchema = object({
	roomId: RoomIdSchema,
	username: UsernameSchema
});

/**
 * -----------------------------------------------------------------------
 * App State Schemas -----------------------------------------------------
 * -----------------------------------------------------------------------
 */
export const RequestAppStateSchema = object({
	roomId: RoomIdSchema
});

export const AppStatePreparedSchema = object({
	roomId: RoomIdSchema,
	members: array(UserSchema),
	messages: array(MessageSchema)
});

/**
 * -----------------------------------------------------------------------
 * User Schemas ----------------------------------------------------------
 * -----------------------------------------------------------------------
 */
export const UpdateUserSchema = object({
	roomId: RoomIdSchema,
	username: UsernameSchema,
	color: ColorSchema
});

/**
 * -----------------------------------------------------------------------
 * Message Schemas -------------------------------------------------------
 * -----------------------------------------------------------------------
 */
export const CreateMessageSchema = object({
	message: MessageSchema
});
