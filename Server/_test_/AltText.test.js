import request from 'supertest';
import app from '../server'; 
import { Pool } from 'pg'; 
import { OpenAI } from 'openai';

process.env.OPENAI_API_KEY = 'FAKE_API_KEY';

jest.mock('openai', () => {
    return {
        OpenAI: jest.fn().mockImplementation(() => {
            return {
                chat: {
                    completions: {
                        create: jest.fn().mockResolvedValue({
                            choices: [
                                {
                                    message: {
                                        content: 'Test' 
                                    }
                                }
                            ]
                        })
                    }
                }
            };
        })
    };
});

// Mock the PostgreSQL pool
jest.mock('pg', () => {
    const mPool = {
        query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
});

const mockPool = new Pool();

describe('Get the altText/:eventId', () => {
    it('should return alt text for a valid event ID', async () => {
        const eventId = '123';
        const eventDescription = 'A detailed event description.';

        // Mock database query response
        mockPool.query.mockResolvedValueOnce({
            rows: [{ eventdescription: eventDescription }]
        });

        const response = await request(app).get(`/altText/${eventId}`);

        // Check the response
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('altText');
        expect(response.body.altText).toBe('Test');
    });

    it('should handle internal server errors', async () => {
        const eventId = '456';

        // Mock database query to throw an error
        mockPool.query.mockRejectedValueOnce(new Error('Database error'));

        const response = await request(app).get(`/altText/${eventId}`);

        // Check the response
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error retrieving alt text.' });
    });
});
