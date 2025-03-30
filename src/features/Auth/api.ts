import { backend, type MutationResponse } from '$shared/api';
import { createMutation } from '@tanstack/svelte-query';
import type { LoginEmailRequest, LoginEmailResponse } from './types';
import { validateLoginEmailForm } from './internal';

const loginMutationFn = async (
	formData: LoginEmailRequest,
): Promise<LoginEmailResponse | Record<string, string>> => {
	const validationResult = validateLoginEmailForm(formData);

	if ('status' in validationResult && validationResult.status === 'OK') {
		return await fetch(backend('/login'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData),
		}).then((data) => data.json() as unknown as LoginEmailResponse);
	} else {
		return validationResult;
	}
};

export const login = (
	formData: LoginEmailRequest,
): MutationResponse<LoginEmailRequest, LoginEmailResponse | Record<string, string>> => {
	return createMutation({
		mutationKey: ['auth', 'login'],
		mutationFn: () => loginMutationFn(formData),
	});
};
