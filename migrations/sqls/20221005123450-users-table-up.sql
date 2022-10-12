CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password_hash VARCHAR(100)
);