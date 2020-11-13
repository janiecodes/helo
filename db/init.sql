CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    profile_pic TEXT
);


CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(45),
    img TEXT,
    CONTENT TEXT,
    author_id INTEGER REFERENCES users(user_id)
);

ALTER TABLE users
ALTER password
SET DATA TYPE TEXT;