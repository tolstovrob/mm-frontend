import { z } from 'zod';
import type { LoginEmailRequest } from './types';

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
