import {
  length,
  maxLength,
  minLength,
  object,
  string,
  toTrimmed,
} from "valibot";

export const CreateRoomSchema = object({
  username: string([
    minLength(2, "Username must be at least 2 characters"),
    maxLength(32, "Username cannot be more than 32 characters."),
  ]),
  roomId: string([
    toTrimmed(),
    length(21, "Room ID must be exactly 21 characters."),
  ]),
});

export const JoinRoomSchema = object({
  username: string([
    minLength(2, "Username must be at least 2 characters"),
    maxLength(32, "Username cannot be more than 32 characters."),
  ]),
  roomId: string([
    toTrimmed(),
    length(21, "Room ID must be exactly 21 characters."),
  ]),
});

export const MessageSchema = object({
  username: string([
    minLength(2, "Username must be at least 2 characters"),
    maxLength(32, "Username cannot be more than 32 characters."),
  ]),
  text: string([toTrimmed(), minLength(1, "Text cannot be empty.")]),
});
