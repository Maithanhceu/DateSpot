import request from 'supertest';
import { app } from '../server';

//Documentation: video on how to setup testing : https://www.youtube.com/watch?v=K-9IPd3oAoo&t=1500s

// Sample mock response data for the News API
const mockArticles = [
    { title: 'Romantic News 1', description: 'Find love in 20 days', url: 'https://example.com/article1' },
    { title: 'Romantic News 2', description: 'Paris is for lovers', url: 'https://example.com/article2' },
    { title: 'Romantic News 3', description: 'Please, Please, Please: Sabrina Carpenter and not being embarassed by your SO', 
    url: 'https://example.com/article3' },
];

describe('GET /news/romance', () => {
    it('should return a 200 status and fetch romance articles', async () => {
        const response = await request(app).get('/news/romance');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true); 
    });
});