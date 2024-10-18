CREATE DATABASE DateSpot;

CREATE TABLE Users (
    userId SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE Events (
    eventId SERIAL PRIMARY KEY,
    userId INT REFERENCES Users(userId),
    date DATE NOT NULL,
    location VARCHAR(255),
    eventType VARCHAR(255),
    eventDescription TEXT NOT NULL,
    eventTitle VARCHAR(255),
    eventPhoto BYTEA
);

CREATE TABLE UserEvents (
    userEventId SERIAL PRIMARY KEY,
    userId INT REFERENCES Users(userId),
    eventId INT REFERENCES Events(eventId),
    date DATE,
    location VARCHAR(255),
    eventType VARCHAR(255),
    eventDescription TEXT,
    eventTitle VARCHAR(255),
    eventPhoto VARCHAR(255)
);

INSERT INTO Users (username, password, firstName, lastName, email)
VALUES ('mai', 'maifantastic', 'Mai', 'M.', 'ttmai@my.loyno.edu');

INSERT INTO Events (date, location, eventType, eventDescription, eventTitle, eventPhoto)
VALUES ('2024-11-13', 'Brooklyn', 'Comedy Show', 'A fun comedy show', 'Live, Laugh, Love', '/Photos/Comedy_show.jpg');

INSERT INTO UserEvents (date, location, eventType, eventDescription, eventTitle, eventPhoto)
VALUES ('2024-11-13', 'Brooklyn', 'Comedy Show', 'A fun comedy show', 'Live, Laugh, Love', '/Photos/Comedy_show.jpg');
