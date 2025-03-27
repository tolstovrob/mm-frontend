/**
 * `api.ts` contains the core of the feature - main functions and actions, that are available outside the feature in the app.
 * It's powered by TanStack queries and mocks.ts
 * It would be better if you use some kind of special naming there, just not to be confused.
 * Functions, that are exported, mainly should return query types. Incapsulated should be mostly sync
 */

import { createQuery } from '@tanstack/svelte-query';
import { backend, type QueryResponse } from '$shared/api';

export const checkHealth = (): QueryResponse<{ message: string }> => {
	return createQuery({
		queryKey: ['health', 'good'],
		queryFn: async () => {
			return await fetch(backend('/api/health')).then(
				(data) => data.json() as unknown as { message: string },
			);
		},
	});
};
