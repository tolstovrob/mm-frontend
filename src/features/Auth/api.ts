import {
	abortableFetch,
	backend,
	validateData,
	type MutationResponse,
	type QueryResponse,
} from '$shared/api';
import { createMutation, createQuery } from '@tanstack/svelte-query';
import type {
	ILoginRequest,
	ILoginResponse,
	ILoginForm,
	IRegisterForm,
	IRegisterRequest,
	IRegisterResponse,
	ISessionResponse,
} from './types';
import { loginSchema, registerSchema } from './internal';

export const login = (loginData: ILoginForm): MutationResponse<ILoginRequest, ILoginResponse> => {
	return createMutation({
		mutationKey: ['auth', 'login'],
		mutationFn: async () => {
			const loginRequest = validateData(loginSchema, loginData);

			return abortableFetch(backend('/login'), {
				method: 'POST',
				body: JSON.stringify(loginRequest),
			});
		},
	});
};

export const register = (
	registerData: IRegisterForm,
): MutationResponse<IRegisterRequest, IRegisterResponse> => {
	return createMutation({
		mutationKey: ['auth', 'register'],
		mutationFn: async () => {
			const { confirmPassword: _, ...registerRequest } = validateData(registerSchema, registerData);

			return abortableFetch(backend('/register'), {
				method: 'POST',
				body: JSON.stringify(registerRequest),
			});
		},
	});
};

export const session = (): QueryResponse<ISessionResponse> => {
	return createQuery({
		queryKey: ['auth', 'session'],
		queryFn: async () => {
			return abortableFetch(backend('/session'));
		},
	});
};
