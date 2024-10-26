-- Create the database if it does not exist
CREATE DATABASE IF NOT EXISTS DateSpot;

-- Use the created database
USE DateSpot;

-- Create Users table
CREATE TABLE Users (
    userId VARCHAR(255) PRIMARY KEY
);

-- Create Events table with eventId as a SERIAL INTEGER
CREATE TABLE Events (
    eventId SERIAL PRIMARY KEY, -- SERIAL will auto-generate unique integer values
    userId VARCHAR(255) REFERENCES Users(userId),
    date DATE,
    location VARCHAR(255),
    eventType VARCHAR(255),
    eventDescription TEXT,
    eventTitle VARCHAR(255),
    eventPhoto VARCHAR(255),
    eventAltText VARCHAR(255),
    eventGroup VARCHAR(255)
);

-- Create UserEvents table with all required information
CREATE TABLE UserEvents (
    userEventId SERIAL PRIMARY KEY,
    userId VARCHAR(255) REFERENCES Users(userId),
    eventId INT REFERENCES Events(eventId), -- Adjusting to INT to reference the SERIAL eventId
    date DATE,
    location VARCHAR(255),
    eventType VARCHAR(255),
    eventDescription TEXT,
    eventTitle VARCHAR(255),
    eventPhoto VARCHAR(255),
    eventAltText VARCHAR(255),
    eventGroup VARCHAR(255)
);

