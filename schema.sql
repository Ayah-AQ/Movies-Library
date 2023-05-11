	CREATE TABLE if not exists movie (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    comments VARCHAR(1000)
);