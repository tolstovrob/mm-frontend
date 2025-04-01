import { createQuery } from '@tanstack/svelte-query';
import { backend, type QueryResponse } from '$shared/api';
import type { ICourse, ICourseCredentials } from './types';

// TODO(tolstovrob): paginate courses
export const fetchCourses = (filter: string): QueryResponse<ICourseCredentials[]> => {
	return createQuery({
		queryKey: ['courses', 'fetch'],
		queryFn: async () => {
			return await fetch(backend('/courses' + (filter !== '' ? `?filter=${filter}` : ''))).then(
				(data) => data.json() as unknown as ICourseCredentials[],
			);
		},
	});
};

export const fetchCourseById = (id: number): QueryResponse<ICourse> => {
	return createQuery({
		queryKey: ['course', 'fetch', 'id'],
		queryFn: async () => {
			return await fetch(backend(`/courses/${id}`)).then(
				(data) => data.json() as unknown as ICourse,
			);
		},
	});
};
