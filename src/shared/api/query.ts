import {
	QueryClient,
	type CreateMutationResult,
	type QueryObserverResult,
} from '@tanstack/svelte-query';
import type { Readable } from 'svelte/store';

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
export type QueryResponse<T> = Readable<QueryObserverResult<T, Error>>;

/**
 * @template TRequest data you send to server
 * @template TResponse data you get back from server
 * @example MutationResponse<EntityResponse> // simple usage
 * @example MutationResponse<EntityResponse, { id: number }, { prev: EntityResponse }> // with
 */
export type MutationResponse<TRequest, TResponse> = CreateMutationResult<
	TResponse,
	Error,
	TRequest,
	unknown
>;
