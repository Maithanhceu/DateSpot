import { useEffect, useState } from "react";
import './CSS/NewsAPI.css'

function NewsAPI() {
    const [newsData, setNewData] = useState({});
    // Function to fetch newsData 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://datespot-production.up.railway.app/news/romance/news/romance');
                const result = await response.json();
                setNewData(result);
            } catch (error) {
                console.error("Error", error);
            }  
        };
        fetchData();
    }, []);
    
    return (
        <div className='news-api-container'>
            <h2>News Articles</h2>
            {newsData.length > 0 ? (
                <div>
                    {newsData.map((article, index) => (
                        <div key={index} className="article-container">
                            {article.urlToImage && (
                                <img 
                                    src={article.urlToImage} 
                                    alt={article.title} 
                                    className="article-image" 
                                />
                            )}
                            <p>Author: {article.author}</p>
                            <p>
                                Title: <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                            </p>
                            <p>Description: {article.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Error fetching news data</div>
            )}
        </div>
    );
}

export default NewsAPI;
