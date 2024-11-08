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
describe('Users API', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('Checking if user exists in the Users Table', () => {
    
        it('should return true if the user exists', async () => {
            const userId = '1';
            const mockResult = { rows: [{ exists: true }] };
            
            // Mock the database query to resolve with a result where user exists
            pool.query.mockResolvedValue(mockResult);
    
            const response = await request(app).get(`/checkUser/${userId}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ exists: true });
        });
    
        it('should return false if the user does not exist', async () => {
            const userId = '999';
            const mockResult = { rows: [{ exists: false }] };
            
            // Mock the database query to resolve with a result where user does not exist
            pool.query.mockResolvedValue(mockResult);
    
            const response = await request(app).get(`/checkUser/${userId}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ exists: false });
        });
    
        it('should return a 500 error if the database query fails', async () => {
            const userId = 'error';
            
            // Mock the database query to reject with an error
            pool.query.mockRejectedValue(new Error('Database error'));
    
            const response = await request(app).get(`/checkUser/${userId}`);
            
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Internal server error' });
        });
    });

    //Test the delete request
    describe('DELETE /deleteUser/:userId', () => {
        it('should delete a user successfully', async () => {
            const userId = 'user123';
    
            pool.query.mockResolvedValueOnce({ rowCount: 1 });

            const response = await request(app).delete(`/deleteUser/${userId}`);
    
            expect(response.status).toBe(204); 
            expect(response.body).toEqual({}); 
        });
    
        it('should return 500 if there is an internal server error', async () => {
            const userId = 'user123';
    
            pool.query.mockRejectedValueOnce(new Error('Database error'));
            const response = await request(app).delete(`/deleteUser/${userId}`);
    
            expect(response.status).toBe(500); 
            expect(response.body).toEqual({ error: 'Internal Server Error' });
        });
    });

    describe('create a new user', () => {
        it('should return 200 if the user already exists', async () => {
            const existingUser = { userId: 'existingUser123' };
            pool.query = jest.fn().mockResolvedValueOnce({ rows: [existingUser] });
    
            const response = await request(app).post('/newUser').send(existingUser);
    
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: "User already exists. No action taken." });
        });
    
        it('should return 500 if there is a database error', async () => {
            const newUser = { userId: 'testUser123' };
            pool.query = jest.fn().mockRejectedValue(new Error('Database error'));
    
            const response = await request(app).post('/newUser').send(newUser);
    
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Internal Server Error' });
        });
    });
});
