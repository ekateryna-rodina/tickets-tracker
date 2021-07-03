CREATE DATABASE issuestrackerdb;
CREATE TYPE TicketTypes AS ENUM ('task', 'defect');
CREATE TYPE TicketPriority AS ENUM ('critical', 'high', 'medium', 'low', 'undefined');
CREATE TYPE Roles AS ENUM (
    'superadmin',
    'organization',
    'admin',
    'manager',
    'user'
);
CREATE TABLE user_role(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user (user_id) NOT NULL,
    user_role Roles
) CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) CONSTRAINT unq_usr UNIQUE NOT NULL,
    password VARCHAR NOT NULL
) CREATE TABLE organization(
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) CONSTRAINT unq_org UNIQUE NOT NULL,
    created_at timestamp without time zone default (now() at time zone 'utc'),
    logo bytea
) CREATE TABLE user_organization(
    user_id INTEGER PRIMARY KEY REFERENCES users,
    organization_id INTEGER REFERENCES organization
) CREATE TABLE project(
    project_id SERIAL PRIMARY KEY,
    name VARCHAR(100)
) CREATE TABLE project_organization(
    project_id INTEGER PRIMARY KEY REFERENCES project,
    organization_id INTEGER REFERENCES organization
) CREATE TABLE project_user(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    project_id INTEGER REFERENCES project
) CREATE TABLE ticket(
    ticket_id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    story text NOT NULL,
    ticket_type TicketTypes NOT NULL,
    ticket_priority TicketPriority NOT NULL,
    date_created datetime DEFAULT now(),
    creator_id INTEGER REFERENCES users (user_id) NOT NULL,
    estimated_time datetime,
    backlog_id INTEGER REFERENCES backlog (backlog_id) NOT NULL,
) CREATE TYPE new_user_with_role_type AS (
    user_id varchar,
    email varchar,
    password varchar,
    user_role roles
);
-- WORKING!
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
DROP FUNCTION insert_user_with_role(character varying, character varying, roles)
select *
from insert_user_with_role(
        'ma@ma.p'::varchar(100),
        '1'::varchar,
        'admin'::roles
    );
-- WORKING!
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
-- WORKING!
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
-- WORKING!
CREATE OR REPLACE FUNCTION get_projects_by_organization_id(id_ integer) RETURNS table(
        project_id int,
        name varchar,
        organization_id int
    ) AS $$ BEGIN RETURN QUERY
select project_organization.organization_id,
    project.project_id,
    project.name
from project
    left join project_organization on project_organization.project_id = project.project_id
where project_organization.organization_id = $1;
END;
$$ LANGUAGE plpgsql;
-- WORKING!
CREATE OR REPLACE FUNCTION get_projects_by_user_id(id_ integer) RETURNS table(
        project_id int,
        name varchar
    ) AS $$ BEGIN RETURN QUERY
select *
from project_user
where user_id = $1;
END;
$$ LANGUAGE plpgsql;
-- WORKING!
CREATE OR REPLACE FUNCTION get_project_by_id(id_ integer) RETURNS table(
        project_id int,
        name varchar
    ) AS $$ BEGIN RETURN QUERY
select *
from project
where project_id = $1;
END;
$$ LANGUAGE plpgsql;