import { MOCKS_ENABLED, type BaseURL, type ErrorResponse, type Response } from '../../response';

export const defaultBaseURL: BaseURL = {
	protocol: 'http',
	domain: 'localhost',
	port: 8000,
	get url() {
		return `${this.protocol}://${this.domain}:${this.port}`;
	},
};

export abstract class IRESTClient {
	private static _instance: IRESTClient | null;
	public debug: boolean;
	public baseURL: BaseURL;

	public constructor(baseURL?: BaseURL) {
		this.debug = MOCKS_ENABLED;
		this.baseURL = baseURL ?? defaultBaseURL;
	}

	public static instance<T extends IRESTClient>(this: new () => T) {
		if (!IRESTClient._instance) IRESTClient._instance = new this();
		return IRESTClient._instance as T;
	}

	protected async get<T>(
		endpoint: string,
		params?: Record<string, string>,
	): Promise<Response<T> | ErrorResponse> {
		if (!endpoint.startsWith('/'))
			throw new Error('API ERROR: Endpoint must start with slash. E.x. `/hello`');

		return fetch(this.baseURL.url, params)
			.then((data) => data.json() as unknown as Response<T>)
			.catch((error) => ({ status: 500, message: error as string }) as ErrorResponse);
	}

	protected async post<T, V>(
		endpoint: string,
		data: T,
		params?: Record<string, string>,
	): Promise<Response<V> | ErrorResponse> {
		if (!endpoint.startsWith('/'))
			throw new Error('API ERROR: Endpoint must start with slash. E.x. `/hello`');

		return fetch(this.baseURL.url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			...params,
		})
			.then((data) => data.json() as unknown as Response<V>)
			.catch((error) => ({ status: 500, message: error as string }) as ErrorResponse);
	}

	protected async put<T, V>(
		endpoint: string,
		data: T,
		params?: Record<string, string>,
	): Promise<Response<V> | ErrorResponse> {
		if (!endpoint.startsWith('/'))
			throw new Error('API ERROR: Endpoint must start with slash. E.x. `/hello`');

		return fetch(this.baseURL.url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			...params,
		})
			.then((data) => data.json() as unknown as Response<V>)
			.catch((error) => ({ status: 500, message: error as string }) as ErrorResponse);
	}

	protected async delete<T>(
		endpoint: string,
		params?: Record<string, string>,
	): Promise<Response<T> | ErrorResponse> {
		if (!endpoint.startsWith('/'))
			throw new Error('API ERROR: Endpoint must start with slash. E.x. `/hello`');

		return fetch(this.baseURL.url, {
			method: 'DELETE',
			...params,
		})
			.then((data) => data.json() as unknown as Response<T>)
			.catch((error) => ({ status: 500, message: error as string }) as ErrorResponse);
	}
}
