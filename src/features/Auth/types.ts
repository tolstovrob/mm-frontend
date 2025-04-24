// WARN(tolstovrob): make sure that IRegisterResponse is correct on change
export interface ISessionResponse {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
	patronymic: string;
	role: string;
	createdAt: string;
}

export interface IRegisterRequest {
	email: string;
	firstName: string;
	lastName: string;
	patronymic: string;
	password: string;
}

export interface IRegisterForm extends IRegisterRequest {
	confirmPassword: string;
}

export type IRegisterResponse = ISessionResponse;

export interface ILogoutResponse {
	status: string;
}

export interface ILoginRequest {
	email: string;
	password: string;
}

export type ILoginForm = ILoginRequest;

export interface ILoginResponse {
	status: string;
}
