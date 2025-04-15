import { createQuery } from '@tanstack/svelte-query';
import { backend, type QueryResponse } from '$shared/api';
import type { ICourse, ICourseMeta } from './types';

// TODO(tolstovrob): paginate courses
export const fetchCourses = (filter: string, page: number = 1): QueryResponse<ICourseMeta[]> => {
	return createQuery({
		queryKey: ['courses', 'fetch', 'filter', 'page'],
		queryFn: async () => {
			const controller = new AbortController();
			const timeout = setTimeout(
				() => {
					controller.abort('Превышено время ожидания');
				},
				import.meta.env.VITE_SERVER_RESPONSE_TIMEOUT_MS ?? 10000,
			);
			return await fetch(
				backend('/courses' + (filter !== '' ? `?filter=${filter}` : '') + `?page=${page}`),
				{
					signal: controller.signal,
				},
			).then((data) => {
				clearTimeout(timeout);
				return data.json() as unknown as ICourseMeta[];
			});
		},
	});
};

export const fetchCourseById = (id: number): QueryResponse<ICourse> => {
	return createQuery({
		queryKey: ['course', 'fetch', 'id'],
		queryFn: async () => {
			const controller = new AbortController();
			const timeout = setTimeout(
				() => {
					controller.abort('Превышено время ожидания');
				},
				import.meta.env.VITE_SERVER_RESPONSE_TIMEOUT_MS ?? 10000,
			);
			return await fetch(backend(`/courses/${id}`), { signal: controller.signal }).then((data) => {
				clearTimeout(timeout);
				return data.json() as unknown as ICourse;
			});
		},
	});
};
