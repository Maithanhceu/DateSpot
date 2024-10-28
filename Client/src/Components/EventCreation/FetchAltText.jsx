import { useContext, useEffect, useState } from 'react';
import { AltTextContext } from './AltTextContext';

function FetchAltText({ eventId }) {
    const { eventAltText, setEventAltText } = useContext(AltTextContext);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    const fetchAltText = async () => {
        try {
            const response = await fetch(`http://localhost:1113/altText/${eventId}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setEventAltText(data.altText);
            console.log('Fetched alt text:', data.altText);
        } catch (err) {
            console.log('Error fetching alt text: ' + err.message);
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
            {showButton && <button onClick={fetchAltText}> Alt Text</button>}
            <span id="altTextHint" className="visually-hidden">
                Provide alternative text for the uploaded photo.
            </span>
        </>
    );
}

export default FetchAltText; 