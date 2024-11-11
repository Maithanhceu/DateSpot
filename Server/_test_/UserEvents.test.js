import request from 'supertest';
import app from '../server';
import { Pool } from 'pg';

// Mock the Pool class from pg
jest.mock('pg', () => {
    const mPool = {
        query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
});

const pool = new Pool(); // Define pool here for use in tests

// Test the GET REQUEST
describe('User Events API', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('GET /userEventsTable/:userId', () => {
        it('should return user events for a given userId', async () => {
            const mockUserId = '123';
            const mockUserEvents = [
                {
                    eventId: '1',
                    date: '1995-11-01',
                    location: 'New York',
                    eventType: 'Concert',
                    eventDescription: 'An amazing concert',
                    eventTitle: 'Concert Event 1',
                    eventPhoto: 'http://example.com/photo1.jpg',
                    eventAltText: 'Photo of Concert Event 1',
                    eventGroup: 'Music Lovers',
                },
                {
                    eventId: '2',
                    date: '1995-11-13',
                    location: 'Los Angeles',
                    eventType: 'Festival',
                    eventDescription: 'An exciting festival',
                    eventTitle: 'Festival Event 2',
                    eventPhoto: 'http://example.com/photo2.jpg',
                    eventAltText: 'Photo of Festival Event 2',
                    eventGroup: 'Festival Fans',
                },
            ];

            // Mock pool.query to return user events for the given userId
            pool.query.mockResolvedValue({ rows: mockUserEvents });

            const response = await request(app).get(`/userEventsTable/${mockUserId}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUserEvents);
        });

        it('should return a 500 error if the database query fails', async () => {
            const mockUserId = '123';

            // Mock pool.query to reject with an error
            pool.query.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get(`/userEventsTable/${mockUserId}`);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Internal Server Error' });
        });
    });

    // Test the POST REQUEST
    describe('POST /register', () => {
        it('should register a user for an event successfully', async () => {
            const userId = 'user123';
            const eventId = '456';
    
            // Mock responses for event details and registration check
            pool.query
                .mockResolvedValueOnce({ rows: [] }) 
                .mockResolvedValueOnce({
                    rows: [{
                        eventId,
                        date: '2025-11-13',
                        location: 'New York',
                        eventType: 'Concert',
                        eventDescription: 'Live concert event.',
                        eventTitle: 'Concert Title',
                        eventPhoto: 'photo.jpg',
                        eventAltText: 'Concert Photo',
                        eventGroup: 'Sailor Moon Concert: Moon Power',
                    }],
                }); // Event exists
    
            // Mock the insertion of the user event
            pool.query.mockResolvedValueOnce({
                rows: [{
                    userId,
                    eventId,
                    date: '2025-11-13',
                    location: 'New York',
                    eventType: 'Concert',
                    eventDescription: 'Live concert event.',
                    eventTitle: 'Concert Title',
                    eventPhoto: 'photo.jpg',
                    eventAltText: 'Concert Photo',
                    eventGroup: 'Sailor Moon Concert: Moon Power',
                }],
            });
    
            const response = await request(app).post('/register').send({ userId, eventId });
    
            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                userId,
                eventId,
                date: '2025-11-13',
                location: 'New York',
                eventType: 'Concert',
                eventDescription: 'Live concert event.',
                eventTitle: 'Concert Title',
                eventPhoto: 'photo.jpg',
                eventAltText: 'Concert Photo',
                eventGroup: 'Sailor Moon Concert: Moon Power',
            });
        });
    
        it('should return 404 if the event does not exist', async () => {
            const userId = 'user123';
            const eventId = '456';
    
            // Mock the responses
            pool.query
                .mockResolvedValueOnce({ rows: [] }) 
                .mockResolvedValueOnce({ rows: [] });
    
            const response = await request(app).post('/register').send({ userId, eventId });
    
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Event not found.' });
        });
    
        it('should return 500 if there is an internal server error', async () => {
            const userId = 'user123';
            const eventId = '456';
    
            pool.query.mockResolvedValueOnce({ rows: [] }); 
    
            // Mock the response for event check to simulate an error
            pool.query.mockRejectedValueOnce(new Error('Database error')); 
    
            const response = await request(app).post('/register').send({ userId, eventId });
    
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Internal Server Error', details: 'Database error' });
        });
    }); 

    //Test the delete request
    describe('DELETE /deleteUserEvent/:userId/:eventId', () => {
        it('should delete a user event registration successfully', async () => {
            const userId = 'user123';
            const eventId = '456';
    
            // Mock the deletion response to simulate a successful deletion
            pool.query.mockResolvedValueOnce({ rowCount: 1 });
    
            const response = await request(app).delete(`/deleteUserEvent/${userId}/${eventId}`);
    
            expect(response.status).toBe(204); 
            expect(response.body).toEqual({}); 
        });
    
        it('should return 500 if there is an internal server error', async () => {
            const userId = 'user123';
            const eventId = '456';
    
            pool.query.mockRejectedValueOnce(new Error('Database error'));
            const response = await request(app).delete(`/deleteUserEvent/${userId}/${eventId}`);
    
            expect(response.status).toBe(500); 
            expect(response.body).toEqual({ error: 'Internal Server Error' });
        });
    });
});
