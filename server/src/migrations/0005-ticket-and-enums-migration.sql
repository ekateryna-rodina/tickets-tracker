DO $$ BEGIN PERFORM 'TicketStatus'::regtype;
EXCEPTION
WHEN undefined_object THEN CREATE TYPE TicketStatus AS ENUM (
    'inProgress',
    'codeReview',
    'testing',
    'reopened',
    'done',
    'stuck',
    'requiresDiscussion'
);
END $$;
DO $$ BEGIN PERFORM 'TicketType'::regtype;
EXCEPTION
WHEN undefined_object THEN CREATE TYPE TicketType AS ENUM ('defect', 'task');
END $$;
DO $$ BEGIN PERFORM 'Priority'::regtype;
EXCEPTION
WHEN undefined_object THEN CREATE TYPE Priority AS ENUM (
    'critical',
    'high',
    'medium',
    'low'
);
END $$;
CREATE TABLE IF NOT EXISTS attachment(
    file_id SERIAL PRIMARY KEY,
    ticket_id INTEGER REFERENCES backlog,
    name VARCHAR,
    content bytea,
    icon bytea,
    uploaded_at timestamp without time zone default now_utc()
);
CREATE TABLE IF NOT EXISTS ticket(
    ticket_id SERIAL PRIMARY KEY,
    backlog_id INTEGER REFERENCES backlog ON DELETE
    SET NULL,
        creator_id INTEGER REFERENCES users(user_id) ON DELETE
    SET NULL,
        name VARCHAR(255) NOT NULL,
        type TicketType NOT NULL,
        created_at timestamp without time zone,
        estimated_at timestamp without time zone DEFAULT NULL,
        completed_at timestamp without time zone DEFAULT NULL,
        description varchar,
        status TicketStatus NOT NULL,
        priority Priority,
        environment varchar,
        branch varchar
);
ALTER TABLE ticket
ALTER COLUMN created_at
SET DEFAULT now_utc();
CREATE OR REPLACE FUNCTION get_ticket_by_id(id_ integer) RETURNS table(
        ticket_id int,
        backlog_id int,
        creator_id int,
        name varchar,
        type TicketType,
        created_at timestamp,
        estimated_at timestamp without time zone,
        completed_at timestamp without time zone,
        description varchar,
        status TicketStatus,
        priority Priority,
        environment varchar,
        branch varchar
    ) AS $$ BEGIN RETURN QUERY
select *
from ticket
where ticket.ticket_id = $1;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION insert_ticket(
        backlog_id_ integer,
        creator_id_ integer,
        name_ varchar,
        type_ TicketType,
        status_ TicketStatus,
        priority_ Priority,
        environment_ varchar,
        branch_ varchar,
        estimated_at_ timestamp without time zone default null,
        description_ varchar default null
    ) RETURNS table(
        ticket_id int,
        backlog_id int,
        creator_id int,
        name varchar,
        type TicketType,
        created_at timestamp,
        estimated_at timestamp without time zone,
        completed_at timestamp without time zone,
        description varchar,
        status TicketStatus,
        priority Priority,
        environment varchar,
        branch varchar
    ) AS $$ BEGIN
INSERT INTO ticket (
        backlog_id,
        creator_id,
        name,
        type,
        status,
        priority,
        environment,
        branch,
        estimated_at,
        description
    )
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
RETURN QUERY
select *
from ticket
where ticket.backlog_id = $1
    and ticket.name = $3;
END;
$$ LANGUAGE plpgsql;
-- CREATE OR REPLACE FUNCTION delete_ticket(id_ integer) RETURNS int AS $$ BEGIN
-- DELETE FROM ticket
-- where ticket.ticket_id = $1;
-- RETURN id_;
-- END;
-- $$ LANGUAGE plpgsql;