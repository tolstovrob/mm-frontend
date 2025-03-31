import { backend, type MutationResponse } from '$shared/api';
import { createMutation } from '@tanstack/svelte-query';
import type {
	ILoginRequest,
	ILoginResponse,
	ILoginForm,
	IRegisterForm,
	IRegisterRequest,
	IRegisterResponse,
} from './types';
import { validateLoginForm, validateRegisterForm } from './internal';

const loginMutationFn = async (
	formData: ILoginForm,
): Promise<ILoginResponse | Record<string, string>> => {
	const controller = new AbortController();
	const validationResult = validateLoginForm(formData);

	if ('status' in validationResult && validationResult.status === 'OK') {
		const timeout = setTimeout(
			() => {
				controller.abort('Превышено время ожидания');
			},
			import.meta.env.VITE_SERVER_RESPONSE_TIMEOUT_MS ?? 10000,
		);

		const response = await fetch(backend('/login'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData as ILoginRequest),
			signal: controller.signal,
		})
			.then((data) => {
				clearTimeout(timeout);
				return data.json();
			})
			.then((data) =>
				data?.status === 200
					? (data as ILoginResponse)
					: 'errors' in data
						? (data.errors as Record<string, string>)
						: { global: 'Неизвестная ошибка, попробуйте позже' },
			);

		return response;
	} else {
		return validationResult;
	}
};

export const login = (
	formData: ILoginForm,
): MutationResponse<ILoginRequest, ILoginResponse | Record<string, string>> => {
	return createMutation({
		mutationKey: ['auth', 'login'],
		mutationFn: () => loginMutationFn(formData),
	});
};

const registerMutationFn = async (
	formData: IRegisterForm,
): Promise<IRegisterResponse | Record<string, string>> => {
	const controller = new AbortController();
	const validationResult = validateRegisterForm(formData);

	if ('status' in validationResult && validationResult.status === 'OK') {
		const timeout = setTimeout(
			() => {
				controller.abort('Превышено время ожидания');
			},
			import.meta.env.VITE_SERVER_RESPONSE_TIMEOUT_MS ?? 10000,
		);

		const { confirmPassword: _, ...rest } = formData;
		return await fetch(backend('/register'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(rest as IRegisterRequest),
			signal: controller.signal,
		})
			.then((data) => {
				clearTimeout(timeout);
				return data.json();
			})
			.then((data) =>
				data?.status === 200
					? (data as IRegisterResponse)
					: 'errors' in data
						? (data.errors as Record<string, string>)
						: { global: 'Неизвестная ошибка, попробуйте позже' },
			);
	} else {
		return validationResult;
	}
};

export const register = (
	formData: IRegisterForm,
): MutationResponse<IRegisterRequest, IRegisterResponse | Record<string, string>> => {
	return createMutation({
		mutationKey: ['auth', 'login'],
		mutationFn: () => registerMutationFn(formData),
	});
};
