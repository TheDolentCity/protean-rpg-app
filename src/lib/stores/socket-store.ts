import { writable, type Writable } from 'svelte/store';

export const creatingRoom: Writable<boolean> = writable(false);
export const joiningRoom: Writable<boolean> = writable(false);
export const requestingAppState: Writable<boolean> = writable(false);
