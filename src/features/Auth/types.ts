export interface LoginEmailRequest {
	email: string;
	password: string;
}

export interface LoginEmailResponse {
	status: number;
	message: string;
}

export interface RegisterRequest {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
}

export interface RegisterForm extends RegisterRequest {
	confirmPassword: string;
}

export interface RegisterResponse {
	status: number;
	message: string;
}
