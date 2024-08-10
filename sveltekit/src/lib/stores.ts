import { writable } from 'svelte/store';

export const darkMode = writable(localStorage.getItem('color-theme') === 'dark');