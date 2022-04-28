CREATE TABLE public.users (
    id serial PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    nama VARCHAR(255),
    token VARCHAR(255)
);