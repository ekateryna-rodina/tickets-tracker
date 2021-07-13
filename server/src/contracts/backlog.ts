//contract for create and update,
// required fields are validated in controller
export interface IBacklogInput {
  projectId?: number;
  creatorId?: number;
  name?: string;
  sprintId?: number;
  estimatedAt?: string;
  endedAt?: string;
  description?: string;
  attachments?: [];
}

export interface IBacklogInfo extends IBacklogInput {
  backlogId: number;
  createdAt: string;
}
