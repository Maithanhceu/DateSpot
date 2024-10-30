import { useEffect, useState, useContext } from 'react';
import { UserIdContext } from './UserIdContext';
import EditEvents from './EditEvents';
import DeleteEvent from './DeleteEvent';
import '../CSS/UserEvents.css';

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
            <h1>Events in your Area </h1>
            {data.map((event) => (
                <div className="event-container" key={event.eventid}>
                    <p>Event: {event.eventtitle}</p>
                    <img src={`http://localhost:1113/photos/${event.eventphoto}`} alt={event.eventalttext} />
                    <p>Description: {event.eventdescription}</p>
                    <p>Date:{new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p>Location: {event.location}</p>
                    <p>Event Type: {event.eventtype}</p>
                    <p>Event Group: {event.eventgroup}</p>
                    <div className='row'>
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
                                {/* Passing props to DeleteEvent */}
                                <DeleteEvent userId={userId} eventUserId={event.userid} eventId={event.eventid} />
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserEvents;
