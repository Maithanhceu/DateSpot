import request from 'supertest';
import app from '../server'; 
import fs from 'fs';
import path from 'path';
const { Pool } = require('pg');
const mockPool = new Pool(); 

// Mock the vision client
jest.mock('@google-cloud/vision', () => {
    return {
        ImageAnnotatorClient: jest.fn().mockImplementation(() => {
            return {
                labelDetection: jest.fn().mockResolvedValue([
                    {
                        labelAnnotations: [
                            { description: 'Cat' },
                            { description: 'Animal' }
                        ]
                    }
                ])
            };
        })
    };
});

// Mock the Pool from the pg module
jest.mock('pg', () => {
    const mPool = {
        query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
});

describe('test POST Request for endpoint /uploadPhoto', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should upload a photo and return event details', async () => {
        // Prepare a mock file for upload
        const filePath = path.join(__dirname, 'test-image.jpg');

        // Create a dummy image file (using Buffer to simulate binary content)
        fs.writeFileSync(filePath, Buffer.from('dummy image content', 'utf-8')); 

        // Mock the database query response
        mockPool.query.mockResolvedValue({
            rows: [{ eventPhoto: '/test-image.jpg', eventDescription: 'Cat, Animal' }]
        });

        // Make the POST request to the endpoint
        const response = await request(app)
            .post('/uploadPhoto')
            .attach('file', filePath); 

        fs.unlinkSync(filePath);

        // Check the response
        expect(response.status).toBe(201); 
        expect(response.body).toHaveProperty('eventPhoto'); 
        expect(response.body).toHaveProperty('eventDescription'); 
        expect(response.body.eventPhoto).toBe('/test-image.jpg'); 
        expect(response.body.eventDescription).toBe('Cat, Animal'); 
    });

    it('should handle uploads with no labels detected and return 500', async () => {
        // Adjust the mock to simulate no labels detected
        const visionClient = require('@google-cloud/vision').ImageAnnotatorClient;
        visionClient.mockImplementation(() => {
            return {
                labelDetection: jest.fn().mockResolvedValue([{ labelAnnotations: [] }])
            };
        });

        // Prepare a mock file for upload
        const filePath = path.join(__dirname, 'test-image-no-labels.jpg');

        fs.writeFileSync(filePath, Buffer.from('image content', 'utf-8'));

        // Mock the database query to throw an error
        mockPool.query.mockRejectedValue(new Error('Database query failed'));

        // Make the POST request to the endpoint
        const response = await request(app)
            .post('/uploadPhoto')
            .attach('file', filePath); // Attach the mock file

        // Cleanup: Remove the created test file
        fs.unlinkSync(filePath);

        // Check the response
        expect(response.status).toBe(500); 
        expect(response.body).toEqual({ error: 'Error processing the upload.' });
    });
});
