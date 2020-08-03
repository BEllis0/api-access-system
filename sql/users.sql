-- users

CREATE TABLE api_limiter.users (
    id SERIAL PRIMARY KEY,
    date_added TIMESTAMP default NOW(),
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    username VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    email_address VARCHAR(200) NOT NULL,
    membership_tier VARCHAR(50) default 'free',
    api_key VARCHAR(200) UNIQUE,
    total_calls INT,
    alotted_calls INT
);