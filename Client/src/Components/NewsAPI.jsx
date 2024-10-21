import { useEffect, useState } from "react";

function NewsAPI() {
    const [newsData, setNewData] = useState([]);

    // Function to fetch newsData 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/news/romance');
                const result = await response.json();
                setNewData(result);
            } catch (error) {
                console.error("Error", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>NewsAPI</h2>
            {newsData ? (
                newsData.map((article) => (
                    <p key={article.id}>
                        {article.title}
                    </p>
                ))
            ) : (
                <div>Error fetching news data</div>
            )}
        </div>
    );
}

export default NewsAPI;
