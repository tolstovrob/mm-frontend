import {
	QueryClient,
	type MutationObserverResult,
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
 * @param T data you receive at the end
 */
export type QueryResponse<T> = Readable<QueryObserverResult<T, Error>>;

/**
 * @param TData data you receive at the end
 * @param TVariables mutation arguments. E.x. something you send to server
 * @param TContext abort context. Contains previous data
 * @example MutationResponse<EntityResponse> // simple usage
 * @example MutationResponse<EntityResponse, { id: number }, { prev: EntityResponse }> // with
 */
export type MutationResponse<TData, TVariables = void, TContext = unknown> = {
	mutate: (variables: TVariables) => void;
	mutateAsync: (variables: TVariables) => Promise<TData>;
	reset: () => void;
} & Readable<MutationObserverResult<TData, Error, TVariables, TContext>>;
