CREATE OR REPLACE FUNCTION insert_organization(
        email_ varchar(100),
        name_ varchar(100),
        created_at_ timestamp without time zone,
        logo_ bytea
    ) RETURNS table(
        organization_id integer,
        email varchar(100),
        name varchar(100),
        created_at timestamp without time zone,
        logo bytea
    ) AS $$ BEGIN
INSERT INTO organization (email, name, created_at, logo)
VALUES ($1, $2, $3, $4);
RETURN QUERY
SELECT *
FROM organization
WHERE email = $1;
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
WHERE organization_id = $1;
END;
$$ LANGUAGE plpgsql;