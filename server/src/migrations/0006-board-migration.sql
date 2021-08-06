CREATE TABLE IF NOT EXISTS board(
    board_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE
);
ALTER TABLE board
ALTER COLUMN created_at
SET DEFAULT now_utc();
CREATE OR REPLACE FUNCTION insert_board(name_ varchar,) RETURNS table(
        board_id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE
    ) AS $$ BEGIN
INSERT INTO board (name)
VALUES ($1)
RETURNING *;
-- RETURN QUERY
-- select *
-- from 
-- where project.name = $1
--     and project.organization_id = $2;
END;
$$ LANGUAGE plpgsql;