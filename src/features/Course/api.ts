import { createQuery } from '@tanstack/svelte-query';
import { backend, type QueryResponse } from '$shared/api';
import type { ICourse, ICourseCredentials } from './types';

// TODO(tolstovrob): paginate courses
export const fetchCourses = (filter: string): QueryResponse<ICourseCredentials[]> => {
	return createQuery({
		queryKey: ['courses', 'fetch'],
		queryFn: async () => {
			const controller = new AbortController();
			const timeout = setTimeout(
				() => {
					controller.abort('Превышено время ожидания');
				},
				import.meta.env.VITE_SERVER_RESPONSE_TIMEOUT_MS ?? 10000,
			);
			return await fetch(backend('/courses' + (filter !== '' ? `?filter=${filter}` : '')), {
				signal: controller.signal,
			}).then((data) => {
				clearTimeout(timeout);
				return data.json() as unknown as ICourseCredentials[];
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
				return data.json() as unknown as ICourseCredentials[];
			});
		},
	});
};
