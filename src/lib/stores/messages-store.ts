import type { Message } from '$lib/types/socket-types';
import { writable, type Writable } from 'svelte/store';

export const messages: Writable<Message[] | null> = writable();
