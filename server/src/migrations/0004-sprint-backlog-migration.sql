CREATE TABLE IF NOT EXISTS sprint(
    sprint_id SERIAL PRIMARY KEY,
    started_at timestamp without time zone,
    ended_at timestamp without time zone,
    name VARCHAR,
    efficiency INT
);
CREATE TABLE IF NOT EXISTS backlog(
    backlog_id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES project ON DELETE CASCADE,
    creator_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE
    SET NULL,
        name VARCHAR(255) NOT NULL,
        sprint_id INTEGER NULL REFERENCES sprint(sprint_id) DEFAULT NULL,
        created_at timestamp without time zone,
        estimated_at timestamp without time zone DEFAULT NULL,
        ended_at timestamp without time zone DEFAULT NULL,
        description varchar
);
ALTER TABLE backlog
ALTER COLUMN created_at
SET DEFAULT now_utc();
CREATE TABLE IF NOT EXISTS backlog_file(
    file_id SERIAL PRIMARY KEY,
    backlog_id INTEGER REFERENCES backlog,
    name VARCHAR,
    content bytea,
    uploaded_at timestamp without time zone default now_utc()
);
CREATE OR REPLACE FUNCTION get_backlog_by_id(id_ integer) RETURNS table(
        backlog_id int,
        project_id int,
        creator_id int,
        name varchar,
        sprint_id int,
        estimated_at timestamp without time zone,
        ended_at timestamp without time zone,
        description varchar
    ) AS $$ BEGIN RETURN QUERY
select *
from backlog_id
where backlog.backlog_id = $1;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION insert_backlog(
        project_id_ int,
        creator_id_ int,
        name_ varchar,
        description_ varchar,
        sprint_id_ int default null,
        estimated_at_ timestamp without time zone default null
    ) RETURNS table(
        backlog_id int,
        project_id int,
        creator_id int,
        name varchar,
        sprint_id int,
        estimated_at timestamp without time zone,
        created_at timestamp without time zone,
        ended_at timestamp without time zone,
        description varchar
    ) AS $$ BEGIN
INSERT INTO backlog (
        project_id,
        creator_id,
        name,
        description,
        sprint_id,
        estimated_at
    )
VALUES ($1, $2, $3, $4, $5, $6);
RETURN QUERY
select *
from backlog
where backlog.project_id = $1
    and backlog.name = $3;
END;
$$ LANGUAGE plpgsql;