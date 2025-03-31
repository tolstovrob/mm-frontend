export interface IUserCredentials {
	id: number;
	email: string;
	lastName: string;
	firstName: string;
	patronymic: string;
	avatarURL: string;
}

export interface IUser extends IUserCredentials {}
