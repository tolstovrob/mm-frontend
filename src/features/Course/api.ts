import { createQuery } from '@tanstack/svelte-query';
import { abortableFetch, backend, type QueryResponse } from '$shared/api';
import type { ICourseResponse } from './types';

export const fetchCourseById = (id: string): QueryResponse<ICourseResponse> => {
	return createQuery({
		queryKey: ['course', 'fetch', 'id'],
		queryFn: async () =>
			abortableFetch<ICourseResponse>(backend(`/courses/${id}`), {
				headers: {
					'Content-Type': 'application/json',
				},
			}),
	});
};

export const fetchCourses = (page: number, filter: string): QueryResponse<ICourseResponse[]> => {
	const params = new URLSearchParams({
		page: page.toString(),
		filter: filter,
	});

	return createQuery({
		queryKey: ['course', 'fetch', 'id'],
		queryFn: async () =>
			abortableFetch<ICourseResponse>(backend(`/courses/?${params.toString()}`), {
				headers: {
					'Content-Type': 'application/json',
				},
			}),
	});
};
