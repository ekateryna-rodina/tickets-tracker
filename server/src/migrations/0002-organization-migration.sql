CREATE OR REPLACE FUNCTION insert_organization(
        email_ varchar(100),
        name_ varchar(100),
        logo_ bytea
    ) RETURNS table(
        organization_id integer,
        email varchar(100),
        name varchar(100),
        created_at timestamp,
        logo bytea
    ) AS $$ BEGIN
INSERT INTO organization (email, name, logo)
VALUES ($1, $2, $3);
RETURN QUERY
select *
from organization
where organization.email = $1;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION get_organization_by_id(id int) RETURNS table(
        organization_id integer,
        email varchar(100),
        name varchar(100),
        created_at timestamp without time zone,
        logo bytea
    ) AS $$ BEGIN RETURN QUERY
SELECT *
FROM organization
WHERE organization.organization_id = $1;
END;
$$ LANGUAGE plpgsql;