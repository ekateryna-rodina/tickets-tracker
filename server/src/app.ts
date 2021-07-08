import cors from "cors";
import express from "express";
import { setUser } from "./middlewares/setUser";
import { createUserRoute } from "./routes/createUser";

const app = express();
app.use(cors());
app.use(express.json());

app.use(setUser);
// users
app.use(createUserRoute);

export { app };
