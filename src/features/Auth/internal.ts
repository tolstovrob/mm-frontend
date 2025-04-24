import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email('Некорректный адрес').nonempty('Это обязательное поле'),
	password: z.string().nonempty('Это обязательное поле'),
});

export const registerSchema = z
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
