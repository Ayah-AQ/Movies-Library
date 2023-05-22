
	CREATE TABLE movies_db(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    comments VARCHAR(1000),
    overview VARCHAR(10485760),
    poster_path VARCHAR(10485760)
);

