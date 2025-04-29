import type { IUserCredentials } from '$features/User';

export interface ICourseResponse {
	id: number;
	discipline: {
		id: number;
		name: string;
		icon: string;
	};
	name: string;
	teachers: IUserCredentials[];
	blockIds: number[];
	description?: string;
}
