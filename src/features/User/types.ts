export interface IUserCredentials {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	avatarURL: string;
}

export interface IUser extends IUserCredentials {}
