import type { User } from '$lib/types/socket-types';
import { writable, type Writable } from 'svelte/store';

export const user: Writable<User | null> = writable();
