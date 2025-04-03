import type { IUserCredentials } from '$features/User';

/** NOTE(tolstovrob): Course anatomy: CourseItems groups into CourseGroups, which controls whether the items are allowed or not.  */

export interface ICourseItemCredentials {
	id: number;
	title: string;
	type: 'info' | 'upload' | 'select' | 'quiz' | 'file';
	state: 'allowed' | 'not-allowed' | 'hidden';
	/* NOTE(tolstovrob): 
		info for block of theory
		upload for files
		select for... select as you guessed
		quiz for... quiz, yeah
		file for files, youre right
	*/
}

export interface ICourseItem extends ICourseItemCredentials {}

export interface ICourseGroup {
	id: number;
	title: string;
	items: ICourseItemCredentials[];
}

export interface ICourseCredentials {
	id: number;
	icon: string;
	title: string;
	teachers: IUserCredentials[];
}

export interface ICourse extends ICourseCredentials {
	description: string;
	groups: ICourseGroup[];
}
