const TBlockType = {
	TEXT: 'text',
	MARKDOWN: 'markdown',
} as const;

export type TBlockType = (typeof TBlockType)[keyof typeof TBlockType];

interface IBlockData {
	[key: string]: number | boolean | string | string[] | IBlockData;
}

export { type IBlockData };

export interface IBlock {
	blockType: TBlockType;
	data: IBlockData;
	courseId: number;
}
