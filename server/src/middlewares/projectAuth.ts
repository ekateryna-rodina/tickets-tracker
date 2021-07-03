import { NextFunction, Request, Response } from "express";
import { canAccessProject } from "../permissions/project";

const projectAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!canAccessProject(req.currentUser, req.project)) {
    res.status(401);
    return res.send("Project is not accessible");
  }
  next();
};

export { projectAuth };
