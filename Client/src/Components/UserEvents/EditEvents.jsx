import { useState, useEffect } from "react";

function EditEvents({ date, location, eventType, eventDescription, eventTitle, eventPhoto, eventGroup, userId, eventId }) {
    const [isEditing, setIsEditing] = useState(false); 
    const [currentDate, setDate] = useState(date || '');
    const [currentLocation, setLocation] = useState(location || '');
    const [currentEventType, setEventType] = useState(eventType || '');
    const [currentEventDescription, setEventDescription] = useState(eventDescription || '');
    const [currentEventTitle, setEventTitle] = useState(eventTitle || '');
    const [currentEventPhoto, setEventPhoto] = useState(eventPhoto || '');
    const [currentEventGroup, setEventGroup] = useState(eventGroup || '');

    useEffect(() => {
        setDate(date);
        setLocation(location);
        setEventType(eventType);
        setEventDescription(eventDescription);
        setEventTitle(eventTitle);
        setEventPhoto(eventPhoto);
        setEventGroup(eventGroup);
    }, [date, location, eventType, eventDescription, eventTitle, eventPhoto, eventGroup]);

    const handleEdit = async () => {
        try {
            const updatedData = {
                date: currentDate,
                location: currentLocation,
                eventType: currentEventType,
                eventDescription: currentEventDescription,
                eventTitle: currentEventTitle,
                eventPhoto: currentEventPhoto,
                eventGroup: currentEventGroup,
            };

            const response = await fetch(`https://datespot-production.up.railway.app/editEvents/${userId}/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            await response.json(); 
            resetForm(); 
            setIsEditing(false); 
        } catch (error) {
            alert("Issue editing information: " + error.message);
        }
    };

    const resetForm = () => {
        setDate(date);
        setLocation(location);
        setEventType(eventType);
        setEventDescription(eventDescription);
        setEventTitle(eventTitle);
        setEventPhoto(eventPhoto);
        setEventGroup(eventGroup);
    };

    return (
        <div>
            <button 
                type="button" 
                className='button-row'
                onClick={() => setIsEditing(!isEditing)}
            >
                {isEditing ? "Cancel Edit" : "Edit Event"}
            </button>

            {isEditing && (
                <div>
                    <h2>Edit Event</h2>
                    <input 
                        type="date" 
                        value={currentDate} 
                        onChange={(e) => setDate(e.target.value)} 
                        placeholder="CurrentDate" 
                    />
                    <input 
                        type="text" 
                        value={currentLocation} 
                        onChange={(e) => setLocation(e.target.value)} 
                        placeholder="Location" 
                    />
                    <input 
                        type="text" 
                        value={currentEventType} 
                        onChange={(e) => setEventType(e.target.value)} 
                        placeholder="Event Type" 
                    />
                    <input 
                        type="text" 
                        value={currentEventDescription} 
                        onChange={(e) => setEventDescription(e.target.value)} 
                        placeholder="Event Description" 
                    />
                    <input 
                        type="text" 
                        value={currentEventTitle} 
                        onChange={(e) => setEventTitle(e.target.value)} 
                        placeholder="Event Title" 
                    />
                    <input 
                        type="text" 
                        value={currentEventPhoto} 
                        onChange={(e) => setEventPhoto(e.target.value)} 
                        placeholder="Event Photo URL" 
                    />
                    <input 
                        type="text" 
                        value={currentEventGroup} 
                        onChange={(e) => setEventGroup(e.target.value)} 
                        placeholder="Event Group" 
                    />
                    <button 
                        type="button" 
                        onClick={handleEdit} 
                    >
                        Submit Changes
                    </button>
                </div>
            )}
        </div>
    );
}

export default EditEvents;