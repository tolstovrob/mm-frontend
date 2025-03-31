export interface ILoginRequest {
	email: string;
	password: string;
}

export interface ILoginForm extends ILoginRequest {}

export interface ILoginResponse {
	status: number;
	message: string;
}

export interface IRegisterRequest {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
}

export interface IRegisterForm extends IRegisterRequest {
	confirmPassword: string;
}

export interface IRegisterResponse {
	status: number;
	message: string;
}
