import { useContext, useEffect, useState } from 'react';
import { AltTextContext } from './AltTextContext';

function FetchAltText({ eventId }) {
    const { eventAltText, setEventAltText } = useContext(AltTextContext);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 12000);

        return () => clearTimeout(timer);
    }, []);
    
    //function to fetch altText from GPT 
    let number = eventId;
    const fetchAltText = async () => {
        try {
<<<<<<< HEAD
            const response = await fetch(`http://localhost:1113/altText/${number}`);
=======
            const response = await fetch(`https://datespot-production.up.railway.app/userEventsTable/altText/${number}`);
>>>>>>> 7a0b108 (Modified endpoints in components and vite.config.js to point to the Railway URL)
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setEventAltText(data.altText);
            alert('You successfully fetch the altText')
        } catch (err) {
            alert('Error fetching alt text: ' + err.message);
            setEventAltText('');
        }
    };

    return (
        <>
            <label htmlFor="eventAltText">Alt Text:</label>
            <input
                id="eventAltText"
                type="text"
                value={eventAltText}
                onChange={(e) => setEventAltText(e.target.value)}
                placeholder="Wait, 5 seconds before clicking button"
                aria-describedby="altTextHint"
            />
            {showButton && 
            <button onClick={fetchAltText}> Alt Text</button>}
            <span id="altTextHint" className="visually-hidden">
                Provide alternative text for the uploaded photo.
            </span>
        </>
    );
}

export default FetchAltText; 
