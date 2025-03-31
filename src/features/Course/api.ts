import { createQuery } from '@tanstack/svelte-query';
import { backend, type QueryResponse } from '$shared/api';
import type { ICourseCredentials } from './types';

export const allCourses = (): QueryResponse<ICourseCredentials[]> => {
	return createQuery({
		queryKey: ['course', 'all'],
		queryFn: async () => {
			return await fetch(backend('/courses')).then(
				(data) => data.json() as unknown as ICourseCredentials[],
			);
		},
	});
};
