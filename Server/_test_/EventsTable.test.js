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
describe('Events API', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('Getting information from the Events Table', () => {
        it('should return user events for a given userId', async () => {
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

            pool.query.mockResolvedValue({ rows: mockUserEvents });

            const response = await request(app).get(`/events`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUserEvents);
        });

        it('should return a 500 error if the database query fails', async () => {
            // Mock pool.query to reject with an error
            pool.query.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get(`/events`);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Internal Server Error' });
        });
    });

    //Test the delete request
    describe('DELETE /deleteEvent/:userId/:eventId', () => {
        it('should delete a user event registration successfully', async () => {
            const userId = 'user123';
            const eventId = '456';
    
            pool.query.mockResolvedValueOnce({ rowCount: 1 });
            pool.query.mockResolvedValueOnce({ rowCount: 1 }); 

            const response = await request(app).delete(`/deleteEvent/${userId}/${eventId}`);
    
            expect(response.status).toBe(204); 
            expect(response.body).toEqual({}); 
        });
    
        it('should return 500 if there is an internal server error', async () => {
            const userId = 'user123';
            const eventId = '456';
    
            pool.query.mockRejectedValueOnce(new Error('Database error'));
            const response = await request(app).delete(`/deleteEvent/${userId}/${eventId}`);
    
            expect(response.status).toBe(500); 
            expect(response.body).toEqual({ error: 'Internal Server Error' });
        });
    });

    describe('Updating an event in the Events Table', () => {
        it('should update an event and return the updated data', async () => {
            const userId = 1;  
            const eventId = 1; 
            
            const updatedEventData = {
                eventId: eventId,
                userId: userId,
                eventTitle: 'Updated Event Title',
                date: '2024-12-01',
                location: 'Updated Location',
                eventType: 'Updated Type',
                eventDescription: 'Updated Description',
                eventPhoto: 'http://example.com/updated-photo.jpg',
                eventAltText: 'Updated photo alt text',
                eventGroup: 'Updated Group',
            };
    
            // Mock the successful response of pool.query for updating an event
            pool.query.mockResolvedValue({ rows: [updatedEventData] });
    
            // Send the PUT request to the endpoint
            const response = await request(app)
                .put(`/editEvents/${userId}/${eventId}`)
                .send(updatedEventData);
    
            // Expecting a successful 200 OK response
            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedEventData);
        });
    
        it('should return a 500 error if the database query fails', async () => {
            const userId = 1;  // replace with valid userId if needed
            const eventId = 1; // replace with valid eventId if needed
    
            // Mock pool.query to reject with an error
            pool.query.mockRejectedValue(new Error('Database error'));
    
            // Send the PUT request to the endpoint
            const response = await request(app)
                .put(`/editEvents/${userId}/${eventId}`)
                .send({
                    eventTitle: 'Error Test Event', 
                    date: '2024-12-01', 
                    location: 'Error Location'
                });
    
            // Expecting a 500 Internal Server Error response
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Internal Server Error' });
        });
    });
});
