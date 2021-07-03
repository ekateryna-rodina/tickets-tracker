import { NextFunction, Request, Response } from "express";
import { IProject } from "../contracts/project";
import { getProjectById } from "../controllers/projectController";
const setProject = async (req: Request, res: Response, next: NextFunction) => {
  const { projectId } = req.params;
  if (projectId != null) {
    const project: IProject | null | undefined = await getProjectById(
      projectId
    );
    if (!project) {
      res.status(404);
      return res.send("Project not found");
    }
    req.project = project;
  }

  next();
};

export { setProject };