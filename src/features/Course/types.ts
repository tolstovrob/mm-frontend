import type { IUserCredentials } from '$features/User';

export interface ICourseMeta {
	id: number;
	discipline: {
		id: number;
		name: string;
		icon: string;
	};
	name: string;
	teachers: IUserCredentials[];
}

export interface ICourse extends ICourseMeta {
	blockIds: number[];
	description?: string;
}

export interface IFetchCoursesRequest {
	filter?: string;
	page: number;
}
