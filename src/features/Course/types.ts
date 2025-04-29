import type { IUser } from '$entities/User';

export interface ICourseResponse {
	id: number;
	discipline: {
		id: number;
		name: string;
		icon: string;
	};
	name: string;
	teachers: IUser[];
	blockIds: number[];
	description?: string;
}
