import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { createUser } from "../controllers/userController";
const router = express.Router();
router.post(
  "/api/users",
  [
    body("email").not().isEmpty().withMessage("Email is required"),
    body("password").not().isEmpty().withMessage("Password is required"),
    body("role").not().isEmpty().withMessage("Role is required"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, role } = req.body;
    try {
      let newUser = await createUser({ email, password, role });
      res.json(newUser);
    } catch (error) {
      console.log(error);
      next();
    }
  }
);

export { router as createUserRoute };
