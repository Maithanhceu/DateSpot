require('dotenv').config() 
import express from 'express';
const app = express();
const PORT = 1113; 

app.post('/googlevision', async (request, response) => {
    try {
        const apiResponse = await fetch('https://vision.googleapis.com/v1/images:annotate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GOOGLE_API_KEY}` 
            },
            body: JSON.stringify({
                requests: [
                    {
                        image: {
                            content: "/Photos/Comedy_show.jpg"
                        },
                        features: [
                            {
                                type: "LABEL_DETECTION",
                                maxResults: 1
                            }
                        ]
                    }
                ]
            })
        });

        const data = await apiResponse.json();
        response.status(200).json(data); 
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});