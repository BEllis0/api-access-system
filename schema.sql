-- Drop if exists
DROP DATABASE IF EXISTS api_limiter;

-- Create db
CREATE DATABASE api_limiter;

USE api_limiter;

-- users

CREATE TABLE users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    date_added TIMESTAMP,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    email_address VARCHAR(200) NOT NULL,
    membership_tier VARCHAR(50) default 'free',
    total_calls INT,

);

-- table for each API call

CREATE TABLE api_calls (
    id SERIAL PRIMARY KEY,
    _date TIMESTAMP,
    _endpoint VARCHAR(500),
    success BOOLEAN,
    user_requested BIGINT NOT NULL,
    FOREIGN KEY(user_requested) REFERENCES users(id)
);