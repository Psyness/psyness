CREATE ROLE psynessadmin NOLOGIN;
CREATE USER psyness WITH PASSWORD 'mast3r';
GRANT psynessadmin TO psyness;
CREATE DATABASE psyness_users;