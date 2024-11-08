import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import pkg from 'pg';
import { fileURLToPath } from 'url';
import cors from 'cors';
import axios from 'axios';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import OpenAI from 'openai';
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

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

// -------------------------------------------------------------------------------------------------
//OPEN AI end-point 
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.get('/altText/:eventId', async (request, response) => {
    const { eventId } = request.params;

    if (!eventId) {
        return response.status(400).json({ error: 'Event ID is required.' });
    }

    try {
        const result = await pool.query('SELECT eventDescription FROM EVENTS WHERE eventId = $1', [eventId]);

        if (result.rows.length === 0) {
            return response.status(404).json({ error: 'No event found with the given ID.' });
        }

        const description = result.rows[0].eventdescription;
        // console.log(description) debudgging persons 
        //OPEN AI IMPLEMENTATION
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant."
                },
                {
                    role: "user",
                    content: `Create a one-line description with the following description terms: ${description} please try to make it as clinical a possible, so limit the flowery language`,
                },
            ],
        });

        const altText = completion.choices[0].message.content;
        response.status(200).json({ altText });
    } catch (error) {
        console.error('Error retrieving alt text:', error);
        response.status(500).json({ error: 'Error retrieving alt text.' });
    }
});

// -------------------------------------------------------------------------------------------------
const upload = multer({
    storage: multer.memoryStorage(),  // Store file directly in memory
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Google Vision API client setup
const visionClient = new ImageAnnotatorClient({
    keyFilename: path.join(__dirname, 'autopopulate.json'),
});

app.post('/uploadPhoto', upload.single('file'), async (request, response) => {
    const file = request.file;
    const fileName = `${Date.now()}-${file.originalname}`;
    const fileExtension = path.extname(fileName).toLowerCase();

    // Set the correct content type based on file extension
    let contentType;
    switch (fileExtension) {
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.pdf':
            contentType = 'application/pdf';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'application/octet-stream';
            break;
    }

    try {
        // Upload the file directly to S3
        const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `uploads/${fileName}`,
            Body: file.buffer, // Use file buffer directly
            ContentType: contentType,
        };

        const command = new PutObjectCommand(uploadParams);
        const s3Response = await s3Client.send(command);
        console.log('File uploaded to S3 successfully:', s3Response);

        // Analyze the uploaded image with Google Vision
        const [visionResult] = await visionClient.labelDetection(file.buffer);
        const labels = visionResult.labelAnnotations || [];

        // If labels are detected, process them
        const labelsDescriptions = labels.length > 0 
            ? labels.map(label => label.description).join(', ')
            : '';

        // Insert event into your database with S3 file URL and labels
        const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
        const eventResult = await pool.query(
            'INSERT INTO events (eventPhoto, eventDescription) VALUES ($1, $2) RETURNING *',
            [fileUrl, labelsDescriptions]
        );

        return response.status(201).json(eventResult.rows[0]);
    } catch (error) {
        console.error('Error processing upload:', error);
        return response.status(500).json({ error: 'Error processing the upload.' });
    }
});

app.put('/editEvents/:eventId', async (req, res) => {
    const { eventId } = req.params;
    const { userId, date, location, eventType, eventDescription, eventTitle, eventAltText, eventGroup } = req.body;

    // Validate the date input
    if (!date || isNaN(Date.parse(date))) {
        return res.status(400).json({ message: 'Invalid date input. Please provide a valid date.' });
    }

    try {
        const result = await pool.query(
            `UPDATE Events SET userId = $1, date = $2, location = $3, eventType = $4, eventDescription = $5, eventTitle = $6, eventAltText = $7, eventGroup = $8
            WHERE eventId = $9`,
            [userId, date, location, eventType, eventDescription, eventTitle, eventAltText, eventGroup, eventId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Event not found or not updated' });
        }

        const updatedEvent = await pool.query(`SELECT * FROM Events WHERE eventId = $1`, [eventId]);
        return res.json(updatedEvent.rows[0]);
    } catch (error) {
        console.error('Error updating event:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// -------------------------------------------------------------------------------------------------
//API GET to the NewsAPI
app.get('/news/romance', async (request, response) => {
    const url = `https://newsapi.org/v2/everything?q=romance&pageSize=3&apiKey=${process.env.NEWS_API_KEY}`;

    try {
        const result = await axios.get(url);
        const data = await result.data.articles;
        return response.json(data);
    } catch (error) {
        console.error('Error fetching news:', error);
        return response.status(500).json({ error: 'Error fetching news from News API' });
    }
});
// -------------------------------------------------------------------------------------------------
// API GET Users Table
app.get('/checkUser/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query('SELECT EXISTS(SELECT 1 FROM users WHERE user_id = $1)', [userId]);
        const exists = result.rows[0].exists;
        res.json({ exists });
    } catch (error) {
        console.error('Error checking user existence:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/newUser', async (request, response) => {
    const { userId } = request.body;

    if (!userId) {
        return response.status(400).json({ error: "User ID is required." });
    }

    try {
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE userId = $1',
            [userId]
        );

        if (existingUser.rows.length > 0) {
            return response.status(200).json({ message: "User already exists. No action taken." });
        }

        const result = await pool.query(
            'INSERT INTO users (userId) VALUES ($1) RETURNING *',
            [userId]
        );

        response.status(201).json(result.rows[0]);

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

app.put('/editEvents/:userId/:eventId', async (request, response) => {
    const userId = request.params.userId;
    const eventId = request.params.eventId;
    const { date, location, eventType, eventDescription, eventTitle, eventPhoto, eventGroup } = request.body;

    try {
        const result = await pool.query(
            'UPDATE events SET date = $1, location = $2, eventType = $3, eventDescription = $4, eventTitle = $5, eventPhoto = $6, eventGroup =$7 WHERE eventId = $8 AND userId = $9 RETURNING *',
            [date, location, eventType, eventDescription, eventTitle, eventPhoto, eventGroup, eventId, userId]
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

app.delete('/deleteEvent/:userId/:eventId', async (request, response) => {
    const { userId, eventId } = request.params;

    try {
        await pool.query('DELETE FROM userevents WHERE eventid = $1', [eventId]);

        const result = await pool.query(
            'DELETE FROM events WHERE eventId = $1 AND userId = $2 RETURNING *',
            [eventId, userId]
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
app.get('/userEventsTable/:userId', async (request, response) => {
    const userId = request.params.userId;

    try {
        const result = await pool.query('SELECT * FROM userevents WHERE userId = $1', [userId]);
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
                e.eventPhoto,
                e.eventAltText, 
                e.eventGroup
            FROM Events e
            WHERE e.eventId = $1`,
            [eventId]
        );

        if (eventDetails.rows.length === 0) {
            return response.status(404).json({ message: 'Event not found.' });
        }

        const insertUserEvent = await pool.query(
            `INSERT INTO UserEvents (userId, eventId, date, location, eventType, eventDescription, eventTitle, eventPhoto, eventAltText, eventGroup)
            SELECT $1, $2, e.date, e.location, e.eventType, e.eventDescription, e.eventTitle, e.eventPhoto, e.eventAltText, e.eventGroup
            FROM Events e
            WHERE e.eventId = $2
            RETURNING *`,
            [userId, eventId]
        );

        response.status(201).json(insertUserEvent.rows[0]);

    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});


app.delete('/deleteUserEvent/:userId/:eventId', async (request, response) => {
    const { userId, eventId } = request.params;


    try {
        const result = await pool.query(
            'DELETE FROM UserEvents WHERE eventId = $1 AND userId = $2 RETURNING *',
            [eventId, userId]

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