import { createQuery } from '@tanstack/svelte-query';
import { backend, type QueryResponse } from '$shared/api';
import type { IUserCredentials } from './types';

export const session = (): QueryResponse<IUserCredentials> => {
	return createQuery({
		queryKey: ['user', 'session'],
		queryFn: async () => {
			return await fetch(backend('/session')).then(
				(data) => data.json() as unknown as IUserCredentials,
			);
		},
	});
};
