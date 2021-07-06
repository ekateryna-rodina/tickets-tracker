import cors from "cors";
import express from "express";
import { IProject } from "./contracts/project";
import { IUser } from "./contracts/user";
import { setUser } from "./middlewares/setUser";
import { createUserRoute } from "./routes/createUser";

const app = express();
app.use(cors());
app.use(express.json());

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUser;
      project: IProject;
    }
  }
}

app.use(setUser);
// users
app.use(createUserRoute);
if (require.main === module) {
  app.listen(5000, () => {
    console.log("listening on port 5000");
  });
}

export { app };
