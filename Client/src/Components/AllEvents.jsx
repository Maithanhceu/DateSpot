import { useEffect, useState } from "react";

function AllEvents() {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetchUserEvents();
    }, []);

    // Function to fetch all the user events
    async function fetchUserEvents() {
        try {
            const response = await fetch('/userEventsTable');
            if (!response.ok) {
                throw new Error('Failed to fetch user events');
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            alert("Issue fetching user events");
            console.error(error);
        }
    }

    // Function to delete a user event
    async function deleteUserEvent(userId, eventId) {
        try {
            const response = await fetch(`/deleteUserEvent/${userId}/${eventId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error deleting user event');
            }

            alert('User event deleted successfully.');
            fetchUserEvents(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting user event:', error.message);
        }
    }

    return (
        <div>
            {data.map(event => (
                <div key={event.id}>
                    <p>{event.title}</p> 
                    <button onClick={() => deleteUserEvent(event.userid, event.eventid)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default AllEvents;

