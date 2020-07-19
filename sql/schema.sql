CREATE SCHEMA api_limiter;

-- table for each API call

CREATE TABLE api_limiter.api_calls (
    id SERIAL PRIMARY KEY,
    _date TIMESTAMP,
    _endpoint VARCHAR(500),
    success BOOLEAN,
    user_requested SERIAL NOT NULL,
    FOREIGN KEY(user_requested) REFERENCES api_limiter.users(id)
);

-- API data that users are fetching

-- companies
CREATE TABLE api_limiter.companies (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(200),
    company_suffix VARCHAR(200),
    suffix VARCHAR(200),
    catch_phrase VARCHAR(500),
    company_image VARCHAR(500),
    address_street VARCHAR(200),
    address_state VARCHAR(200)
);

-- products
CREATE TABLE api_limiter.products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(500),
    department VARCHAR(200),
    product_image VARCHAR(200),
    color VARCHAR(200),
    product_material VARCHAR(500),
    product_adj VARCHAR(200),
    price INT
);