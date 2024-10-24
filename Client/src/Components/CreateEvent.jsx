import { useState, useEffect } from 'react';

function CreateEvent() {
    const [eventId, setEventId] = useState('');
    const [eventAltText, setEventAltText] = useState('');
    const [eventTitle, setEventTitle] = useState(''); 
    const [date, setDate] = useState(''); 
    const [location, setLocation] = useState(''); 
    const [eventType, setEventType] = useState(''); 
    const [eventGroup, setEventGroup] = useState('');
    const [eventDescription, setEventDescription] = useState(''); 
    const [error, setError] = useState('');

    // Handle photo upload
    const handlePhotoUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const response = await fetch('/uploadPhoto', {
                method: 'POST',
                body: uploadData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            setEventId(responseData.eventid);
            console.log('Photo uploaded successfully! Event ID:', responseData.eventid);
        } catch (error) {
            console.error('Error uploading photo:', error);
            setError(error.message);
        }
    };

    const fetchAltText = async () => {
        if (!eventId) {
            setError('Event ID is required to fetch alt text.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:1113/altText/${number}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setEventAltText(data.altText);
            setError('');
            console.log('Fetched alt text:', data.altText);
        } catch (err) {
            setError(err.message);
            setEventAltText('');
        }
    };

    useEffect(() => {
        if (eventId) {
            fetchAltText();
        }
    }, [eventId]);
    let number = eventId;


    // Handle PUT request to update event
    const handleSubmit = async (event) => {
        event.preventDefault();

        const creatorId = 1; 
        const putRequestBody = {
            date,
            location,
            eventType,
            eventDescription,
            eventTitle,
            eventAltText,
            eventGroup
        };

        try {
            const response = await fetch(`http://localhost:1113/editEvents/${creatorId}/${number}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(putRequestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const updatedEvent = await response.json();
            console.log('Event updated successfully:', updatedEvent);
            setError('');
        } catch (error) {
            console.error('Error updating event:', error);
            setError(error.message);
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="eventTitle">Event Title:</label>
            <input
                id="eventTitle"
                type="text"
                value={eventTitle} 
                onChange={(e) => setEventTitle(e.target.value)} 
                placeholder="Enter a Title"
                aria-describedby="eventTitleHint"
            />
            <span id="eventTitleHint" className="visually-hidden">Please provide a title for your event.</span>
    
            <label htmlFor="photoUpload">Upload Photo:</label>
            <input
                id="photoUpload"
                type="file"
                onChange={handlePhotoUpload} 
                aria-describedby="photoUploadHint"
            />
            <span id="photoUploadHint" className="visually-hidden">Select a photo to upload for the event.</span>
    
            <label htmlFor="eventAltText">Alt Text:</label>
            <input
                id="eventAltText"
                type="text"
                value={eventAltText}
                onChange={(e) => setEventAltText(e.target.value)}
                placeholder="Alt Text"
                aria-describedby="altTextHint"
            />
            <span id="altTextHint" className="visually-hidden">Provide alternative text for the uploaded photo.</span>
            
            <label htmlFor="eventDescription">Event Description:</label>
            <textarea
                id="eventDescription"
                value={eventDescription} 
                onChange={(e) => setEventDescription(e.target.value)} 
                placeholder="Please enter a description of the Event"
                aria-describedby="descriptionHint"
            />
            <span id="descriptionHint" className="visually-hidden">Describe the event in detail.</span>
    
            <label htmlFor="eventDate">Event Date:</label>
            <input
                id="eventDate"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-describedby="dateHint"
            />
            <span id="dateHint" className="visually-hidden">Select the date for the event.</span>
    
            <label htmlFor="eventLocation">Location:</label>
            <input
                id="eventLocation"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder='Please enter a location'
                aria-describedby="locationHint"
            />
            <span id="locationHint" className="visually-hidden">Specify the location of the event.</span>
    
            <label htmlFor="eventType">Event Type:</label>
            <select
                id="eventType"
                value={eventType} 
                onChange={(e) => setEventType(e.target.value)} 
                aria-describedby="eventTypeHint"
            >
                <option value="">
                    Select an event group, for example: Comedy Show
                </option>
                <option value="comedy">Comedy Show</option>
                <option value="music">Music Event</option>
            </select>
            <span id="eventTypeHint" className="visually-hidden">Choose the type of event.</span>
    
            <label htmlFor="eventGroup">Event Group:</label>
            <select
                id="eventGroup"
                value={eventGroup}
                onChange={(e) => setEventGroup(e.target.value)} 
                aria-describedby="eventGroupHint"
            >
                <option value="">Select a group, for example: Parents</option>
                <option value="parents">Parents</option>
                <option value="students">Students</option>
            </select>
            <span id="eventGroupHint" className="visually-hidden">Select the group associated with the event.</span>
    
            <button type="submit">Update Event</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    </div>    
    );
}

export default CreateEvent;
