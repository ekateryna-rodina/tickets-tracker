DO $$ BEGIN PERFORM 'TicketTypes'::regtype;
EXCEPTION
WHEN undefined_object THEN CREATE TYPE TicketTypes AS ENUM ('task', 'defect');
END $$;
DO $$ BEGIN PERFORM 'TicketPriority'::regtype;
EXCEPTION
WHEN undefined_object THEN CREATE TYPE TicketPriority AS ENUM ('critical', 'high', 'medium', 'low', 'undefined');
END $$;
DO $$ BEGIN PERFORM 'Roles'::regtype;
EXCEPTION
WHEN undefined_object THEN CREATE TYPE Roles AS ENUM (
    'superadmin',
    'organization',
    'admin',
    'superuser',
    'user'
);
END $$;
CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) CONSTRAINT unq_usr UNIQUE NOT NULL,
    password VARCHAR NOT NULL
);
CREATE TABLE IF NOT EXISTS user_role(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    user_role Roles
);
CREATE TABLE IF NOT EXISTS organization(
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) CONSTRAINT unq_org UNIQUE NOT NULL,
    created_at timestamp without time zone,
    logo bytea
);
create function now_utc() returns timestamp as $$
select now() at time zone 'utc';
$$ language sql;
ALTER TABLE ONLY organization
ALTER COLUMN created_at
SET DEFAULT now_utc();
CREATE TABLE IF NOT EXISTS user_organization(
    user_id INTEGER PRIMARY KEY REFERENCES users,
    organization_id INTEGER REFERENCES organization
);
CREATE TABLE IF NOT EXISTS project(
    project_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    organization_id INTEGER REFERENCES organization ON DELETE CASCADE,
    created_at timestamp without time zone
);
ALTER TABLE ONLY project
ALTER COLUMN created_at
SET DEFAULT now_utc();
CREATE TABLE IF NOT EXISTS project_user(
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    project_id INTEGER REFERENCES project ON DELETE CASCADE,
    PRIMARY KEY(user_id, project_id)
);
CREATE OR REPLACE FUNCTION insert_user_with_role(
        email_ varchar(100),
        password_ varchar,
        role roles
    ) RETURNS table(
        user_id int,
        email varchar(100),
        password varchar,
        user_role roles
    ) AS $$
DECLARE new_user_id int;
BEGIN
INSERT INTO users (email, password)
VALUES ($1, $2);
new_user_id := (
    SELECT users.user_id
    FROM users
    WHERE users.email = $1
);
INSERT INTO user_role (user_id, user_role)
VALUES (new_user_id, $3::roles);
RETURN QUERY
select users.user_id as user_id,
    users.email as email,
    users.password as password,
    user_role.user_role as user_role
from users
    left join user_role on users.user_id = user_role.user_id
where users.user_id = new_user_id;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION get_user_by_id(id integer) RETURNS table(
        user_id int,
        email varchar(100),
        user_role roles
    ) AS $$ BEGIN RETURN QUERY
select users.user_id as user_id,
    users.email as email,
    user_role.user_role as user_role
from users
    left join user_role on users.user_id = user_role.user_id
where users.user_id = $1;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION get_organization_by_user_id(id integer) RETURNS table(
        organization_id int,
        name varchar,
        email varchar(100),
        created_at timestamp without time zone,
        logo bytea
    ) AS $$ BEGIN RETURN QUERY
select organization.organization_id,
    organization.name,
    organization.email,
    organization.created_at,
    organization.logo
from user_organization
    left join organization on user_organization.organization_id = organization.organization_id
where user_id = $1;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION get_projects_by_organization_id(id_ integer) RETURNS table(
        project_id int,
        name varchar,
        organization_id int
    ) AS $$ BEGIN RETURN QUERY
select project.organization_id,
    project.project_id,
    project.name
from project
where project.organization_id = $1;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION get_projects_by_user_id(id_ integer) RETURNS table(
        project_id int,
        name varchar,
        organization_id int,
        created_at timestamp without time zone
    ) AS $$ BEGIN RETURN QUERY
select project_user.project_id,
    project.name,
    project.organization_id,
    project.created_at
from project_user
    INNER JOIN project on project.project_id = project_user.project_id
where project_user.user_id = $1;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION get_project_by_id(id_ integer) RETURNS table(
        project_id int,
        name varchar,
        organization_id int,
        created_at timestamp without time zone
    ) AS $$ BEGIN RETURN QUERY
select *
from project
where project.project_id = $1;
END;
$$ LANGUAGE plpgsql;