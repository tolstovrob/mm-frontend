import { z } from 'zod';
import type { LoginEmailRequest, RegisterForm } from './types';

const loginSchema = z.object({
	email: z.string().email('Некорректный адрес').nonempty('Это обязательное поле'),
	password: z.string().nonempty('Это обязательное поле'),
});

export const validateLoginEmailForm = (formData: LoginEmailRequest): Record<string, string> => {
	const result = loginSchema.safeParse(formData);

	if (!result.success) {
		const errors: Record<string, string> = {};
		result.error.errors.forEach((err) => (errors[err.path[0]] = err.message));
		return errors;
	}

	return { status: 'OK' };
};

const registerSchema = z
	.object({
		email: z.string().email('Некорректный адрес').nonempty('Это обязательное поле'),
		firstName: z.string().nonempty('Это обязательное поле'),
		lastName: z.string().nonempty('Это обязательное поле'),
		password: z.string().nonempty('Это обязательное поле'),
		confirmPassword: z.string().nonempty('Это обязательное поле'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	});

export const validateRegisterForm = (formData: RegisterForm): Record<string, string> => {
	const result = registerSchema.safeParse(formData);

	if (!result.success) {
		const errors: Record<string, string> = {};
		result.error.errors.forEach((err) => (errors[err.path[0]] = err.message));
		return errors;
	}

	return { status: 'OK' };
};
