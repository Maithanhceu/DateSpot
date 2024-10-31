import { useEffect, useState, useContext } from 'react';
import { UserIdContext } from './UserIdContext';
import EditEvents from './EditEvents';
import '../CSS/UserEvents.css';
import DeleteEvent from './DeleteEvent';
import FilterBar from './FilterBar';
import FilterEvent from './FilterEvent';

function UserEvents() {
    const [data, setData] = useState([]);
    const { userId } = useContext(UserIdContext);
    const [search, setSearch] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');

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

    const filteredData = data.filter(event => {
        const title = event.eventtitle || '';
        const matchesSearch = search.toLowerCase() === '' || title.toLowerCase().includes(search.toLowerCase());
        const matchesLocation = selectedLocation ? event.location === selectedLocation : true;
        const matchesDate = selectedDate ? event.date === selectedDate : true;
        const matchesType = selectedType ? event.eventtype === selectedType : true;
        const matchesGroup = selectedGroup ? event.eventgroup === selectedGroup : true;

        return matchesSearch && matchesLocation && matchesDate && matchesType && matchesGroup;
    });
    return (
        <div>
            <h1>Events in Your Area</h1>

            <FilterBar
                data={data}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
            />
            <FilterEvent search={search} setSearch={setSearch} />
            <div className="event-container">
                {filteredData.map((event) => (
                    <div key={event.eventid} className="event-item">
                       <p><bold>{event.eventtitle}</bold></p>
                        <p>Date: {new Date(event.date).toLocaleDateString(undefined,
                            { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p>Location: {event.location}</p>
                        <p>Description: {event.eventdescription}</p>
                        <img
                            src={`http://localhost:1113/photos/${event.eventphoto}`}
                            alt={event.eventalttext}
                        />
                        <p>Event Type: {event.eventtype}</p>

                        <div className='row'>
                            <button className='button-row' onClick={() => registerEvent(event.eventid)}>Register</button>
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
        </div>
    );
}

export default UserEvents;
