CREATE SCHEMA api_limiter;

-- users

CREATE TABLE api_limiter.users (
    id SERIAL PRIMARY KEY,
    date_added TIMESTAMP,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    email_address VARCHAR(200) NOT NULL,
    membership_tier VARCHAR(50) default 'free',
    total_calls INT,
    alotted_calls INT
);

-- table for each API call

CREATE TABLE api_limiter.api_calls (
    id SERIAL PRIMARY KEY,
    _date TIMESTAMP,
    _endpoint VARCHAR(500),
    success BOOLEAN,
    user_requested SERIAL NOT NULL,
    FOREIGN KEY(user_requested) REFERENCES api_limiter.users(id)
);