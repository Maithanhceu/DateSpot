import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import axios from 'axios';
import fs from 'fs';
import multer from 'multer';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import { ImageAnnotatorClient } from '@google-cloud/vision';


const { Pool } = pkg;
const PORT = 1113;

const app = express();
app.use(express.json()); 
app.use(cors());

const pool = new Pool({
    user: 'thanhmai',
    host: 'localhost',
    database: 'date_spot',
    port: 5432,
});

// -------------------------------------------------------------------------------------------------
// A POST Request to Google Vision 

const __dirname = path.resolve(); // Get the current directory path

// Create the Photos directory if it doesn't exist
const photosPath = path.join(__dirname, 'Photos');
if (!fs.existsSync(photosPath)) {
    fs.mkdirSync(photosPath);
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, photosPath); 
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

const client = new ImageAnnotatorClient({
    keyFilename: path.join(__dirname, 'autopopulate.json'), 
});

// Endpoint to handle file upload and Google Vision API analysis
app.post('/upload', upload.single('file'), async (request, response) => {
    if (!request.file) {
        return response.status(400).json({ error: 'No file uploaded.' });
    }

    const filePath = path.join(photosPath, request.file.filename); 
    console.log('File saved at:', filePath);

    try {
        // Use the Vision API to perform label detection on the uploaded image
        const [result] = await client.labelDetection(filePath);
        
        // Log the entire result for debugging
        console.log(JSON.stringify(result, null, 2));
        
        const labels = result.labelAnnotations; // Access the label annotations
    
        // Check if any labels were returned
        if (labels && labels.length > 0) {
            // Extract descriptions and scores
            const labelsList = labels.map(label => ({
                description: label.description,
            }));
            
            // Create a JSON object with the file name and labels
            const jsonData = {
                fileName: request.file.filename,
                labels: labelsList,
            };
            
            // Write the JSON data to a file
            const jsonFilePath = path.join(photosPath, `${request.file.filename}.json`);
            fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
    
            response.status(200).json({ message: 'File uploaded and analyzed successfully!', labels: labelsList });
        } else {
            response.status(200).json({ message: 'File uploaded, but no labels were detected.', labels: [] });
        }
    } catch (error) {
        console.error('Error analyzing image with Google Vision:', error);
        response.status(500).json({ error: 'Error analyzing the image.' });
    }
});



// -------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------
//API GET to the NewsAPI
app.get('/news/romance', async (requst, response) => {
    const url = `https://newsapi.org/v2/everything?q=romance&apiKey=${process.env.NEWS_API_KEY}`;

    try {
        const response = await axios.get(url);

        // Send the articles back in the response
        return response.json(response.data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        return res.status(500).json({ error: 'Error fetching news from News API' });
    }
});
// -------------------------------------------------------------------------------------------------
// API GET Users Table
app.get('/usersTable', async (request, response) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        response.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/newUser', async (request, response) => {
    const { username, password, firstname, lastname, email } = request.body;

    if (!username || !password || !firstname || !lastname || !email) {
        return response.status(400).json({ error: "Please enter all the necessary information, thank you!" });
    }

    try {
        const result = await pool.query(
            'INSERT INTO users (username, password, firstname, lastname, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [username, password, firstname, lastname, email]
        );

        response.status(201).json(result.rows[0]);

    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/updateUser/:userId', async (request, response) => {
    const userId = request.params.userId;
    const { username, password, firstname, lastname, email } = request.body;

    if (!username || !password || !firstname || !lastname || !email) {
        return response.status(400).json({ error: "Please provide all necessary fields." });
    }

    try {
        const result = await pool.query(
            'UPDATE users SET username = $1, password = $2, firstname = $3, lastname = $4, email = $5 WHERE userId = $6 RETURNING *',
            [username, password, firstname, lastname, email, userId]
        );

        if (result.rowCount === 0) {
            return response.status(404).json({ error: "User not found." });
        }

        response.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/deleteUser/:userId', async (request, response) => {
    const userId = request.params.userId;

    try {
        const result = await pool.query(
            'DELETE FROM users WHERE userId = $1 RETURNING *',
            [userId]
        );

        if (result.rowCount === 0) {
            return response.status(404).json({ error: 'User not found' });
        }

        response.status(204).send(); 
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// -------------------------------------------------------------------------------------------------
//Events Table 
app.get('/events', async (request, response) => {
    try {
        const result = await pool.query('SELECT * FROM events');
        response.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/addNewEvent', async (request, response) => {
    const { date, location, eventType, eventDescription, eventTitle, eventPhoto } = request.body;

    if (!date || !location || !eventType || !eventDescription || !eventTitle || !eventPhoto) {
        return response.status(400).json({ error: "Please provide all necessary event details." });
    }

    try {
        const result = await pool.query(
            'INSERT INTO events (date, location, eventType, eventDescription, eventTitle, eventPhoto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [date, location, eventType, eventDescription, eventTitle, eventPhoto]
        );

        response.status(201).json(result.rows[0]);

    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/editEvents/:creatorId/:eventId', async (request, response) => {
    const creatorId = request.params.creatorId;
    const eventId = request.params.eventId;
    const { date, location, eventType, eventDescription, eventTitle, eventPhoto } = request.body;

    if (!date || !location || !eventType || !eventDescription || !eventTitle || !eventPhoto) {
        return response.status(400).json({ error: "All fields are required." });
    }

    try {
        const result = await pool.query(
            'UPDATE events SET date = $1, location = $2, eventType = $3, eventDescription = $4, eventTitle = $5, eventPhoto = $6 WHERE eventId = $7 AND creatorId = $8 RETURNING *',
            [date, location, eventType, eventDescription, eventTitle, eventPhoto, eventId, creatorId]
        );

        if (result.rowCount === 0) {
            return response.status(404).json({ error: 'Event not found or you do not have permission to edit this event.' });
        }

        response.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/deleteEvent/:creatorId/:eventId', async (request, response) => {
    const creatorId = request.params.creatorId;
    const eventId = request.params.eventId;

    try {
        const result = await pool.query(
            'DELETE FROM events WHERE eventId = $1 AND creatorId = $2 RETURNING *',
            [eventId, creatorId]
        );

        if (result.rowCount === 0) {
            return response.status(404).json({ error: 'Event not found or you do not have permission to delete this event.' });
        }

        response.status(204).send(); 
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// -------------------------------------------------------------------------------------------------
//User Events Table 
app.get('/userEventsTable', async (request, response) => {
    try {
        const result = await pool.query('SELECT * FROM userevents');
        response.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/register', async (request, response) => {
    const { userId, eventId } = request.body;

    if (!userId || !eventId) {
        return response.status(400).json({ error: 'User ID and Event ID are required.' });
    }

    try {
        const registrationCheck = await pool.query(
            'SELECT * FROM UserEvents WHERE userId = $1 AND eventId = $2',
            [userId, eventId]
        );

        if (registrationCheck.rows.length > 0) {
            return response.status(400).json({ message: 'User is already registered for this event.' });
        }

        const eventDetails = await pool.query(
            `SELECT 
                e.eventId,
                e.date,
                e.location,
                e.eventType,
                e.eventDescription,
                e.eventTitle,
                e.eventPhoto
            FROM Events e
            WHERE e.eventId = $1`,
            [eventId]
        );

        if (eventDetails.rows.length === 0) {
            return response.status(404).json({ message: 'Event not found.' });
        }

        const insertUserEvent = await pool.query(
            `INSERT INTO UserEvents (userId, eventId, date, location, eventType, eventDescription, eventTitle, eventPhoto)
            SELECT $1, $2, e.date, e.location, e.eventType, e.eventDescription, e.eventTitle, e.eventPhoto
            FROM Events e
            WHERE e.eventId = $2
            RETURNING *`,
            [userId, eventId]
        );

        response.status(201).json(insertUserEvent.rows[0]);

    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/deleteUserEvent/:userEventId', async (request, response) => {
    const userEventId = request.params.userEventId; 

    try {
        const result = await pool.query(
            'DELETE FROM UserEvents WHERE userEventId = $1 RETURNING *', 
            [userEventId]
        );

        if (result.rowCount === 0) {
            return response.status(404).json({ error: 'User event registration not found.' });
        }

        return response.status(204).send(); 
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
