import { z } from 'zod';
import type { ILoginForm, IRegisterForm } from './types';

const loginSchema = z.object({
	email: z.string().email('Некорректный адрес').nonempty('Это обязательное поле'),
	password: z.string().nonempty('Это обязательное поле'),
});

export const validateLoginForm = (formData: ILoginForm): Record<string, string> => {
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
		lastName: z.string().nonempty('Это обязательное поле'),
		firstName: z.string().nonempty('Это обязательное поле'),
		patronymic: z.string(),
		password: z.string().nonempty('Это обязательное поле'),
		confirmPassword: z.string().nonempty('Это обязательное поле'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	});

export const validateRegisterForm = (formData: IRegisterForm): Record<string, string> => {
	const result = registerSchema.safeParse(formData);

	if (!result.success) {
		const errors: Record<string, string> = {};
		result.error.errors.forEach((err) => (errors[err.path[0]] = err.message));
		return errors;
	}

	return { status: 'OK' };
};
