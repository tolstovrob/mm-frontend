import {
	QueryClient,
	type CreateMutationResult,
	type QueryObserverResult,
} from '@tanstack/svelte-query';
import type { Readable } from 'svelte/store';
import type { IAnyAppError, IHTTPError, IInternalError } from './error';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 5,
		},
	},
});

/**
 * @template T data you receive at the end
 */
export type QueryResponse<T> = Readable<QueryObserverResult<T, IAnyAppError>>;

/**
 * @template TRequest data you send to server
 * @template TResponse data you get back from server
 * @example MutationResponse<EntityResponse> // simple usage
 * @example MutationResponse<EntityResponse, { id: number }, { prev: EntityResponse }> // with
 */
export type MutationResponse<TRequest, TResponse> = CreateMutationResult<
	TResponse,
	IAnyAppError,
	TRequest,
	unknown
>;

/**
 * Custom wrapper for fetch requests with abort controller and custom errors integrations
 * @template TResponse data you will get from server
 * Arguments same as fetch, except for `defaultAbortTimeMs` - it stands for default abort timeout
 */
export const abortableFetch = async <TResponse>(
	url: string,
	options: RequestInit = {},
	defaultAbortTimeMs: number = 15000,
): Promise<TResponse> => {
	const controller = new AbortController();
	const timer = setTimeout(
		() => controller.abort(),
		import.meta.env.VITE_SERVER_RESPONSE_TIMEOUT_MS ?? defaultAbortTimeMs,
	);

	try {
		const response = await fetch(url, { ...options, signal: controller.signal });

		if (!response.ok) {
			throw {
				code: 'HTTP_ERROR',
				message: response.statusText,
				status: response.status,
			} satisfies IHTTPError;
		}

		return (await response.json()) as TResponse;
	} catch (error) {
		if ((error as Error).name === 'AbortError') {
			throw {
				code: 'HTTP_ERROR',
				message: (error as Error).message,
				status: 408,
			} satisfies IHTTPError;
		} else {
			throw {
				code: 'INTERNAL_ERROR',
				message: (error as Error).message,
				status: 500,
			} satisfies IInternalError;
		}
	} finally {
		clearTimeout(timer);
	}
};
