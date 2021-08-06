import { db, sql } from "..";
import { Board } from "../../../common/contracts/board";
import { dbEntityToObject } from "../utils/dbHelpers";
const createBoard = async (name: string): Promise<Board | null> => {
  if (!name) {
    throw new Error("Name is required");
  }
  try {
    const boardResponse = await db.query(
      sql`SELECT * FROM insert_board(${name}::varchar)`
    );
    if (!boardResponse || !boardResponse[0]) return null;
    let obj = dbEntityToObject<Board>(boardResponse[0]);
    return obj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateBoard = async (
  boardId: number,
  name: string
): Promise<Board | null> => {
  if (!name || !boardId) {
    throw new Error("Board id and name are required");
  }
  try {
    const boardResponse = await db.query(
      sql`UPDATE board SET name = ${name} WHERE board_id = ${boardId} RETURNING *`
    );
    if (!boardResponse || !boardResponse[0]) return null;
    let obj = dbEntityToObject<Board>(boardResponse[0]);
    return obj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { createBoard, updateBoard };
