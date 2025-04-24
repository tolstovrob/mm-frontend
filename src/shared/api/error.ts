import { z } from 'zod';

type TError = 'VALIDATION_ERROR' | 'HTTP_ERROR' | 'INTERNAL_ERROR';

/**
 * Interface for all app errors
 * @field `code`: code of error
 * @field `message`: human-readable error description
 */
export type IAppError = {
	code: TError;
	message: string;
};

export interface IValidationError extends IAppError {
	code: 'VALIDATION_ERROR';
	issues: z.ZodIssue[];
}

export interface IHTTPError extends IAppError {
	code: 'HTTP_ERROR';
	status: number;
}

export interface IInternalError extends IAppError {
	code: 'INTERNAL_ERROR';
	status: number;
}

export type IAnyAppError = IAppError & unknown;
