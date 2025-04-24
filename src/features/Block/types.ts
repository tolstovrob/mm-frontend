const TBlockType = {
	TEXT: 'text',
	MARKDOWN: 'markdown',
} as const;

export type TBlockType = (typeof TBlockType)[keyof typeof TBlockType];

export interface IBlockData {
	[key: string]: unknown;
}

export interface IBlockResponse {
	courseId: string;
	blockType: TBlockType;
	data: IBlockData;
}
