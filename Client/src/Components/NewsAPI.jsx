import { useEffect, useState } from "react";

function NewsAPI() {
    const [newsData, setNewData] = useState({});
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
            <h1>NewsAPI</h1>
            {newsData ? (
                <div>
                    {JSON.stringify(newsData, null, 2)}
                </div>
            ) : (
                <div>Error fetching news data</div>
            )}
        </div>
    );
}
export default NewsAPI;
