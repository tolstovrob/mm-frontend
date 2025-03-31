import type { IUserCredentials } from '$features/User';

export interface ICourseCredentials {
	id: number;
	icon: string;
	title: string;
	teachers: IUserCredentials[];
}
