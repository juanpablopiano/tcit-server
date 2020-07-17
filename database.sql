CREATE DATABASE tcit;

CREATE TABLE post
(
    "postId" SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255)
);
