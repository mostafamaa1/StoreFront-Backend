CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(50),
    user_id integer REFERENCES users(id) ON DELETE SET NULL
);