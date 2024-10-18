-- Create the Users table
CREATE TABLE Users (
    userId SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255)
);

-- Create the Events table
CREATE TABLE Events (
    eventId SERIAL PRIMARY KEY,
    creatorId INT REFERENCES Users(userId),
    date DATE NOT NULL,
    location VARCHAR(255),
    eventType VARCHAR(255),
    eventDescription TEXT NOT NULL,
    eventTitle VARCHAR(255),
    eventPhoto VARCHAR(255)
);

-- Create the UserEvents table with additional event detail columns
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

-- Insert example data into Users and Events tables, and link them in UserEvents
WITH inserted_user AS (
    INSERT INTO Users (username, password, firstName, lastName, email)
    VALUES ('mai', 'maifantastic', 'Mai', 'M.', 'ttmai@my.loyno.edu')
    RETURNING userId
),
inserted_event AS (
    INSERT INTO Events (creatorId, date, location, eventType, eventDescription, eventTitle, eventPhoto)
    SELECT userId, '2024-11-13', 'Brooklyn', 'Comedy Show', 'A fun comedy show', 'Live, Laugh, Love', '/Comedy_show.jpg'
    FROM inserted_user
    RETURNING eventId, date, location, eventType, eventDescription, eventTitle, eventPhoto
)
INSERT INTO UserEvents (userId, eventId, date, location, eventType, eventDescription, eventTitle, eventPhoto)
SELECT inserted_user.userId, inserted_event.eventId, inserted_event.date, inserted_event.location, 
       inserted_event.eventType, inserted_event.eventDescription, inserted_event.eventTitle, inserted_event.eventPhoto
FROM inserted_user, inserted_event;
