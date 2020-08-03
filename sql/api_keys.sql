CREATE TABLE api_limiter.api_keys (
    id SERIAL PRIMARY KEY,
    create_at TIMESTAMP default NOW(),
    membership_tier VARCHAR(100) NOT NULL,
    api_key VARCHAR(40) NOT NULL,
    uuid VARCHAR(40) NOT NULL,
    user_associated INT NOT NULL,
    FOREIGN KEY(user_associated) REFERENCES api_limiter.users(id)
);