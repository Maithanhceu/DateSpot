import { useState, useContext} from 'react';
import { UserIdContext } from '../UserEvents/UserIdContext';
import FetchAltText from './FetchAltText';
import { AltTextContext } from './AltTextContext';
import './EventForm.css';

function EventForm() {
    const { userId } = useContext(UserIdContext);
    const { eventAltText} = useContext(AltTextContext);
    const [eventId, setEventId] = useState('');
    const [eventTitle, setEventTitle] = useState(''); 
    const [date, setDate] = useState(''); 
    const [location, setLocation] = useState(''); 
    const [eventType, setEventType] = useState(''); 
    const [eventGroup, setEventGroup] = useState('');
    const [eventDescription, setEventDescription] = useState(''); 
    const [error, setError] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(true);

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
        } catch (error) {
            console.error('Error uploading photo:', error);
            setError(error.message);
        }
    };

    // Handle form submission (PUT request to update the event)
    const handleSubmitPut  = async (event) => {
        event.preventDefault();

        const putRequestBody = {
            userId,
            date,
            location,
            eventType,
            eventDescription,
            eventTitle,
            eventAltText,
            eventGroup,
        };

        try {
            const response = await fetch(`/editEvents/${eventId}`, {
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
            alert('Event updated successfully:', updatedEvent);
            setIsFormVisible(false);
            setError('');
        } catch (error) {
            setError('Error updating event', error);
        }
    };

    return (
        <div>
            {isFormVisible && (
                <form onSubmit={handleSubmitPut}>
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
                    
                    <FetchAltText eventId={eventId}/>

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
                        <option value="">Select an event type</option>
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
                        <option value="">Select a group</option>
                        <option value="parents">Parents</option>
                        <option value="students">Students</option>
                    </select>
                    <span id="eventGroupHint" className="visually-hidden">Select the group associated with the event.</span>

                    <button type="submit">Update Event</button>
                </form>
            )}
        </div>    
    );
}

export default EventForm;
