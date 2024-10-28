import { useEffect, useState, useContext } from 'react';
import { UserIdContext } from './UserIdContext';
import EditEvents from './EditEvents';
import DeleteEvent from './DeleteEvent';

function UserEvents() {
    const [data, setData] = useState([]);
    const { userId } = useContext(UserIdContext);

    // Fetch user events from the server
    useEffect(() => {
        const fetchUserEvents = async () => {
            try {
                const response = await fetch('/events');
                const result = await response.json();
                setData(result);
            } catch (error) {
                alert('Error fetching user events:', error);
            }
        };

        fetchUserEvents();
    }, []);

    // Register an event
    const registerEvent = async (eventId) => {
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, eventId })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error registering event');
            }

            const result = await response.json();
            alert('Event registered successfully:', result);
            alert(`You successfully registered for the event on ${result.date}.`);
        } catch (error) {
            alert('Error registering event:', error.message);
            alert(`Failed to register for the event: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>User Events</h2>
            {data.map((event) => (
                <div key={event.eventid}>
                    <p>Date: {event.date}</p>
                    <p>Location: {event.location}</p>
                    <p>Description: {event.eventdescription}</p>
                    <img src={event.eventphoto} alt={event.eventalttext} />
                    <p>Event Type: {event.eventtype}</p>
                    <button onClick={() => registerEvent(event.eventid)}>Register</button>
                    {userId === event.userid && (
                        <>
                            <EditEvents
                                date={event.date}
                                location={event.location}
                                eventType={event.eventtype}
                                eventDescription={event.eventdescription}
                                eventTitle={event.eventtitle}
                                eventPhoto={event.eventphoto}
                                eventGroup={event.eventgroup}
                                userId={userId}
                                eventId={event.eventid}
                            />
                            <DeleteEvent {userId} eventUserId={event.userid}  eventId={event.eventid} />
                        </>
                    )}

                </div>
            ))}
        </div>
    );
}

export default UserEvents;