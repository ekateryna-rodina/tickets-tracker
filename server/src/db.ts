// moved tto migrations. This code is currently ignored.
import { ConnectionPool, sql } from "@databases/pg";
const createSchema = async (db: ConnectionPool) => {
  const run = async (db: ConnectionPool) => {
    await db.query(sql`
    DO $$ BEGIN
      PERFORM 'TicketTypes'::regtype;
    EXCEPTION
      WHEN undefined_object THEN
        CREATE TYPE TicketTypes AS ENUM ('task', 'defect');
    END $$;
    DO $$ BEGIN
      PERFORM 'TicketPriority'::regtype;
    EXCEPTION
      WHEN undefined_object THEN
        CREATE TYPE TicketPriority AS ENUM ('critical', 'high', 'medium', 'low', 'undefined');
    END $$;
    DO $$ BEGIN
      PERFORM 'Roles'::regtype;
    EXCEPTION
      WHEN undefined_object THEN
        CREATE TYPE Roles AS ENUM (
            'superadmin',
            'organization',
            'admin',
            'manager',
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
      user_id INTEGER REFERENCES users(user_id) NOT NULL,
      user_role Roles
  ); 
  CREATE TABLE IF NOT EXISTS organization(
      organization_id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) CONSTRAINT unq_org UNIQUE NOT NULL,
      created_at timestamp without time zone,
      logo bytea
  );
  CREATE TABLE IF NOT EXISTS user_organization(
      user_id INTEGER PRIMARY KEY REFERENCES users,
      organization_id INTEGER REFERENCES organization
  );
  CREATE TABLE IF NOT EXISTS project(
      project_id SERIAL PRIMARY KEY,
      name VARCHAR(100)
  ); 
  CREATE TABLE IF NOT EXISTS project_organization(
      project_id INTEGER PRIMARY KEY REFERENCES project,
      organization_id INTEGER REFERENCES organization
  ); 
  CREATE TABLE IF NOT EXISTS project_user(
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users,
      project_id INTEGER REFERENCES project
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
  select project_organization.organization_id,
      project.project_id,
      project.name
  from project
      left join project_organization on project_organization.project_id = project.project_id
  where project_organization.organization_id = $1;
  END;
  $$ LANGUAGE plpgsql;
  CREATE OR REPLACE FUNCTION get_projects_by_user_id(id_ integer) RETURNS table(
          project_id int,
          name varchar
      ) AS $$ BEGIN RETURN QUERY
  select *
  from project_user
  where user_id = $1;
  END;
  $$ LANGUAGE plpgsql;
  CREATE OR REPLACE FUNCTION get_project_by_id(id_ integer) RETURNS table(
          project_id int,
          name varchar
      ) AS $$ BEGIN RETURN QUERY
  select *
  from project
  where project_id = $1;
  END;
  $$ LANGUAGE plpgsql;
  `);

    await db.dispose();
  };

  run(db).catch((err: any) => {
    console.error(err);
    process.exit(1);
  });
};

export { createSchema };
