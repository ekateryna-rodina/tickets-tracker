import { Pool } from "pg";
const pool = new Pool({
  user: "katerynarodina",
  password: "masterkarie",
  host: "localhost",
  port: 5432,
  database: "issuestrackerdb",
});

export default pool;
