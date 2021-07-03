import express, { NextFunction, Request, Response } from "express";
import { createUser } from "../controllers/userController";
const router = express.Router();
router.post(
  "/api/users",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role } = req.body;
    try {
      let newUser = await createUser({ email, password, role });
      console.log(newUser);
      res.json(newUser);
    } catch (error) {
      console.log(error);
      next();
    }
  }
);

export { router as createUserRoute };
