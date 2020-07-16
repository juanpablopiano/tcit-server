CREATE DATABASE tcit;

CREATE TABLE post
(
    post_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255)
);
