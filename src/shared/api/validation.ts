import type { z, ZodSchema } from 'zod';
import type { IValidationError } from './error';

export const validateData = <TSchema extends ZodSchema, TInput = z.input<TSchema>>(
	schema: TSchema,
	data: TInput,
): z.infer<TSchema> => {
	const result = schema.safeParse(data);

	if (!result.success) {
		const error: IValidationError = {
			code: 'VALIDATION_ERROR',
			message: 'Проверьте правильность введённых данных',
			issues: result.error.issues,
		};
		throw error;
	}

	return result.data;
};
