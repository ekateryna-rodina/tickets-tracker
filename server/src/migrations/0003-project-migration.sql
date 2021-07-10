CREATE OR REPLACE FUNCTION insert_project(
        name_ varchar,
        organization_id_ integer
    ) RETURNS table(
        project_id integer,
        name varchar,
        organization_id integer,
        created_at timestamp
    ) AS $$ BEGIN
INSERT INTO project (name, organization_id)
VALUES ($1, $2);
RETURN QUERY
select *
from project
where project.name = $1
    and project.organization_id = $2;
END;
$$ LANGUAGE plpgsql;