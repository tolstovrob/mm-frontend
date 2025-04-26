import { createQuery } from '@tanstack/svelte-query';
import { abortableFetch, backend, type QueryResponse } from '$shared/api';
import type { IBlockResponse } from './types';

export const fetchBlockById = (id: string): QueryResponse<IBlockResponse> => {
	return createQuery({
		queryKey: ['block', 'fetch', 'id'],
		queryFn: async () =>
			abortableFetch<IBlockResponse>(backend(`/blocks/${id}`), {
				headers: {
					'Content-Type': 'application/json',
				},
			}),
	});
};

// NOTE(tolstovrob): need to be tested on actual API. Try partially insert invalid ids!
export const fetchBlocksByIds = (ids: string[]): QueryResponse<IBlockResponse[]> => {
	return createQuery({
		queryKey: ['blocks', 'fetch', 'ids'],
		queryFn: async () => {
			return await Promise.all(
				ids.map((id) =>
					abortableFetch<IBlockResponse>(backend(`/blocks/${id}`), {
						headers: {
							'Content-Type': 'application/json',
						},
					}),
				),
			);
		},
	});
};
