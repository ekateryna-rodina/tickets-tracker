import createConnectionPool, { ConnectionPool, sql } from "@databases/pg";
import dotenv from "dotenv";
import { app } from "./app";
import { IProject } from "./contracts/project";
import { IUser } from "./contracts/user";

let db: ConnectionPool;
declare global {
  namespace Express {
    interface Request {
      currentUser?: IUser;
      project: IProject;
    }
  }
}
dotenv.config({ path: "var.env" });
const start = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be defined");
  }
  const { DATABASE_URL } = process.env;
  console.log(DATABASE_URL);
  try {
    // create db connection pool
    db = createConnectionPool({
      connectionString: DATABASE_URL,
      bigIntMode: "bigint",
    });
    // dispose db connection
    process.once("SIGTERM", () => {
      db.dispose().catch((ex: any) => {
        console.error(ex);
      });
    });
  } catch (error) {
    throw new Error("Cannot connect to  the database");
  }

  app.listen(5000, () => {
    console.log("listening on port 5000");
  });
  process.on("SIGINT", function () {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
    process.exit();
  });
};

start();
export { db, sql };

// export default { db, sql };
