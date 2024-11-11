import request from 'supertest';
import app from '../server';
import nock from 'nock';

process.env.NEWS_API_KEY = 'FAKE_API_KEY';

// Mock articles data
const mockArticles = [
    {
        description: "Find love in 20 days",
        title: "Romantic News 1",
        url: "https://example.com/article1",
    },
    {
        description: "Paris is for lovers",
        title: "Romantic News 2",
        url: "https://example.com/article2",
    },
    {
        description: "Please, Please, Please: Sabrina Carpenter and not being embarrassed by your SO",
        title: "Romantic News 3",
        url: "https://example.com/article3",
    },
];

describe('GET /news/romance', () => {
    beforeEach(() => {
        nock.cleanAll(); // Ensure no nocks remain from previous tests
    });

    it('should return a 200 status and fetch romance articles', async () => {
        nock('https://newsapi.org')
            .get('/v2/everything')
            .query({ q: 'romance', pageSize: '3', apiKey: process.env.NEWS_API_KEY })
            .reply(200, { articles: mockArticles });

        const response = await request(app).get('/news/romance');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockArticles);
    });

    it('should return a 500 status if there is an error fetching articles', async () => {
        // Setting up `nock` to simulate a 500 error
        nock('https://newsapi.org')
            .get('/v2/everything')
            .query({ q: 'romance', pageSize: '3', apiKey: process.env.NEWS_API_KEY })
            .reply(500, { error: 'API Error' });

        const response = await request(app).get('/news/romance');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error fetching news from News API' });
    });
});
