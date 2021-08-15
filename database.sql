CREATE DATABASE "len-u-car";

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username varchar(20),
    password varchar(60),
    full_name varchar(60),
    email varchar(60),
    avatar varchar(60),
    user_type varchar(20),
    mobile int,
    identification_card varchar(60),
    driving_license varchar(60),
);

CREATE TABLE cars (
    cars_id SERIAL,
    brand varchar(60),
    model varchar(60),
    type varchar(60),
    passenger_capacity int,
    transmission varchar(20),
    price_per_day int,
    mileage varchar(60),
    engine_type varchar(60),
    key_features varchar(60),
    key_rules varchar(300),
    status varchar(60),
    pick_up_point varchar(300),
    user_id int,
)

CREATE TABLE car_images (
    images_id SERIAL,
    cloudinary_id varchar(30),
    secure_url varchar(300),
    cars_id int
)

-- CREATE TABLE car_rental_event (
--     event_id SERIAL,
--     rating: int,
--     review: varchar(300),
--     cars_id int
-- )