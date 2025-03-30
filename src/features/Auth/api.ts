import { backend, type MutationResponse } from '$shared/api';
import { createMutation } from '@tanstack/svelte-query';
import type {
	LoginEmailRequest,
	LoginEmailResponse,
	RegisterForm,
	RegisterRequest,
	RegisterResponse,
} from './types';
import { validateLoginEmailForm, validateRegisterForm } from './internal';

const loginMutationFn = async (
	formData: LoginEmailRequest,
): Promise<LoginEmailResponse | Record<string, string>> => {
	const validationResult = validateLoginEmailForm(formData);

	if ('status' in validationResult && validationResult.status === 'OK') {
		return await fetch(backend('/login'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData),
		})
			.then((data) => data.json())
			.then((data) =>
				data?.status === 200
					? (data as unknown as RegisterResponse)
					: 'errors' in data
						? (data.errors as Record<string, string>)
						: { global: 'Неизвестная ошибка, попробуйте позже' },
			);
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

const registerMutationFn = async (
	formData: RegisterForm,
): Promise<RegisterResponse | Record<string, string>> => {
	const validationResult = validateRegisterForm(formData);

	if ('status' in validationResult && validationResult.status === 'OK') {
		const { confirmPassword: _, ...rest } = formData;
		return await fetch(backend('/register'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(rest as RegisterRequest),
		})
			.then((data) => data.json())
			.then((data) =>
				data?.status === 200
					? (data as unknown as RegisterResponse)
					: 'errors' in data
						? (data.errors as Record<string, string>)
						: { global: 'Неизвестная ошибка, попробуйте позже' },
			);
	} else {
		return validationResult;
	}
};

export const register = (
	formData: RegisterForm,
): MutationResponse<RegisterRequest, RegisterResponse | Record<string, string>> => {
	return createMutation({
		mutationKey: ['auth', 'login'],
		mutationFn: () => registerMutationFn(formData),
	});
};
