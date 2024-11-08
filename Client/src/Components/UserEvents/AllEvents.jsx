import { useEffect, useState, useContext } from "react";
import { UserIdContext } from './UserIdContext';
import '../CSS/AllEvents.css'

function AllEvents() {
    const [data, setData] = useState([]);
    const { userId } = useContext(UserIdContext);

    useEffect(() => {
        fetchUserEvents();
    }, [userId]);

    // Fetches all events for the user
    const fetchUserEvents = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/userEventsTable/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch user events');

            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching user events:", error);
            alert("Issue fetching user events");
        }
    };

    // Deletes a user event by eventId
    const deleteUserEvent = async (eventId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/deleteUserEvent/${userId}/${eventId}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error deleting user event');
            }
    
            alert('User event deleted successfully.');
            fetchUserEvents(); // Refreshes the list after deletion
        } catch (error) {
            console.error('Error deleting user event:', error);
            alert("Error deleting event");
        }
    };    

    return (
        <div>
            {data.map((event) => (
                <div className="event" key={event.id}>
                    <h3>{event.eventtitle}</h3>
                    <p>Group: {event.eventgroup}</p>
                    <p>Description: {event.eventdescription}</p>
                    <img src={`${event.eventphoto}`} alt={event.alttext || 'Event photo'} />
                    <div className="location-date">
                        <p>Date: {new Date(event.date).toLocaleDateString(undefined,
                            { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p>Location: {event.location}</p>
                    </div>
                    <div>
                        <p>Event Group: {event.eventgroup}</p>
                    </div>
                    <button onClick={() => deleteUserEvent(event.eventid)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default AllEvents;