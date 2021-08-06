export interface IBoardInput {
  name: string;
}

export interface IBoardInfo {
  boardId: number;
  createdAt: string;
}

export type Board = IBoardInput & IBoardInfo;
