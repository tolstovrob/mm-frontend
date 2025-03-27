/**
 * Creates and returns a full server route to specific endpoint
 *
 * @param endpoint which you need to get full route to,
 * DO START IT WITH `/` (not `posts`, but `/posts`)
 * @returns complete route on server
 */
export const backend = (endpoint: string): string =>
	`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}${endpoint}`;
