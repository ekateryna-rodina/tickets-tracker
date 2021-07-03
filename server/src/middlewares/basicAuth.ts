import { NextFunction, Request, Response } from "express";
import { Roles } from "../utils/roleEnum";

const authUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    res.status(403);
    return res.send("Please log in into system");
  }

  next();
};

const authRole = (role: Roles) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.currentUser?.role !== role) {
      res.status(401);
      return res.send("Not allowed");
    }
    next();
  };
};

export { authUser, authRole };
