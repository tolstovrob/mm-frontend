import { createQuery } from '@tanstack/svelte-query';
import { backend, type QueryResponse } from '$shared/api';
import type { ICourseCredentials } from './types';

// TODO(tolstovrob): paginate courses
export const fetchCourses = (filter: string): QueryResponse<ICourseCredentials[]> => {
	return createQuery({
		queryKey: ['course', 'fetch'],
		queryFn: async () => {
			return await fetch(backend('/courses' + (filter !== '' ? `?filter=${filter}` : ''))).then(
				(data) => data.json() as unknown as ICourseCredentials[],
			);
		},
	});
};
