import { createQuery } from '@tanstack/svelte-query';
import { backend, type QueryResponse } from '$shared/api';
import type { IBlock } from './types';

export const fetchBlocksByIds = (ids: number[]): QueryResponse<IBlock[]> => {
	return createQuery({
		queryKey: ['fetch', 'block', 'id', 'many'],
		queryFn: async () => {
			return await Promise.all(
				ids.map((id) =>
					fetch(backend(`/blocks/${id}`)).then((data) => data.json() as unknown as IBlock[]),
				),
			);
		},
	});
};
