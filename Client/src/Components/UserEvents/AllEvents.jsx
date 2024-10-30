import { useEffect, useState, useContext } from "react";
import { UserIdContext } from './UserIdContext';

function AllEvents() {
    const [data, setData] = useState([]);
    const { userId } = useContext(UserIdContext);

    useEffect(() => {
        fetchUserEvents();
    }, [userId]);

    // Fetches all events for the user
    const fetchUserEvents = async () => {
        try {
            const response = await fetch(`/userEventsTable/${userId}`);
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
            const response = await fetch(`/deleteUserEvent/${userId}/${eventId}`, {
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
                <div key={event.id}>
                    <h3>{event.eventtitle}</h3>
                    <p>Group: {event.eventgroup}</p>
                    <p>Description: {event.eventdescription}</p>
                    <img src={event.eventphoto} alt={event.alttext || 'Event photo'} />
                    <button onClick={() => deleteUserEvent(event.eventid)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default AllEvents;