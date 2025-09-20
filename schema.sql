CREATE DATABASE contentdb;
USE contentdb;

CREATE TABLE content (
    id INT PRIMARY KEY, 
    title VARCHAR(255) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE
);

CREATE TABLE content_genres (
    content_id INT,
    genre_id INT,
    PRIMARY KEY(content_id, genre_id),
    FOREIGN KEY(content_id) REFERENCES content(id),
    FOREIGN KEY(genre_id) REFERENCES genres(id)
);

CREATE TABLE streaming_services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE
);

CREATE TABLE movie_sources (
    content_id INT,
    service_id INT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(content_id, service_id),
    FOREIGN KEY(content_id) REFERENCES content(id),
    FOREIGN KEY(service_id) REFERENCES streaming_services(id)
);
