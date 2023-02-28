/* Create database */
DROP DATABASE IF EXISTS twitter;
CREATE DATABASE twitter;

DO $$
BEGIN
  IF NOT EXISTS(SELECT FROM pg_catalog.pg_roles WHERE rolname = 'dev') THEN 
    -- Create role with password and grant the appropriate permissions to that role
    CREATE ROLE dev WITH ENCRYPTED PASSWORD 'dev' LOGIN;
    ALTER ROLE dev CREATEDB;
  END IF;
END
$$;

GRANT ALL PRIVILEGES ON DATABASE twitter to dev;
