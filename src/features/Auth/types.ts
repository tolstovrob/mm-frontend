export interface LoginEmailRequest {
	email: string;
	password: string;
}

export interface LoginEmailResponse {
	status: number;
	message: string;
}
