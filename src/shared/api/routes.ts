/**
 * Creates and returns a full server route to specific endpoint. Something like http://127.168.0.1/api/v1/aboba
 *
 * @param endpoint which you need to get full route to,
 * DO START IT WITH `/` (not `posts`, but `/posts`)
 * @returns complete route on server
 */
export const backend = (endpoint: string, version: number = 1): string =>
	`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/v${version}${endpoint}`;

/**
 * Creates and returns a full server route to a static file
 *
 * @param filename full path of the file in /static. E.x. aboba/index.webp will return smth like this: http://localhost:3000/static/aboba/index.webp
 * @returns complete route on server
 */
export const staticfile = (filename: string): string =>
	`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/static/${filename}`;
