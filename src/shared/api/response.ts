export const MOCKS_ENABLED: boolean = true;

export interface BaseURL {
	protocol: string;
	domain: string;
	port: number;
	url: string;
}

export interface BaseResponse {
	status: number;
}

export type Response<T> = BaseResponse & T;

export type ErrorResponse = BaseResponse & { message: string };
