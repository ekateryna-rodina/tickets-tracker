import { NextFunction, Request, Response } from "express";
import { getUserById } from "../controllers/userController";
const setUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  if (userId != null) {
    const user = await getUserById(userId);
    if (user) {
      req.currentUser = user;
    }
  }

  next();
};

export { setUser };
