import { backend, type MutationResponse } from '$shared/api';
import { createMutation } from '@tanstack/svelte-query';
import type { LoginEmailRequest, LoginEmailResponse } from './types';

export const login = (
	formData: LoginEmailRequest,
): MutationResponse<LoginEmailRequest, LoginEmailResponse> => {
	return createMutation({
		mutationKey: ['auth', 'login'],
		mutationFn: async () =>
			await fetch(backend('/login'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			}).then((data) => data.json() as unknown as LoginEmailResponse),
	});
};
