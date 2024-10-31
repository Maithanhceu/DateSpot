import './Filter.css';

function FilterBar({
    data,
    selectedLocation,
    setSelectedLocation,
    selectedDate,
    setSelectedDate,
    selectedType,
    setSelectedType,
    selectedGroup,
    setSelectedGroup,
}) {
    const uniqueLocations = [...new Set(data.map(event => event.location))];
    const uniqueDates = [...new Set(data.map(event => event.date))];
    const uniqueTypes = [...new Set(data.map(event => event.eventtype))];
    const uniqueGroups = [...new Set(data.map(event => event.eventgroup))];

    return (
        <div className="filter-bar">
            <label className='filter-selection' htmlFor="event-location">Location</label>
            <select
                id="event-location"
                className="event-dropdown"
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
            >
                <option value="">Choose a location</option>
                {uniqueLocations.map((location, index) => (
                    <option key={index} value={location}>
                        {location}
                    </option>
                ))}
            </select>

            <label className='filter-selection' htmlFor="event-date">Date</label>
            <select
                id="event-date"
                className="event-dropdown"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
            >
                <option value="">Choose a date</option>
                {uniqueDates.map((date, index) => (
                    <option key={index} value={date}>
                        {date}
                    </option>
                ))}
            </select>

            <label className='filter-selection' htmlFor="event-type">Event Type</label>
            <select
                id="event-type"
                className="event-dropdown"
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
            >
                <option value="">Choose an event type:</option>
                {uniqueTypes.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            <label className='filter-selection' htmlFor="event-group">Event Group</label>
            <select
                id="event-group"
                className="event-dropdown"
                value={selectedGroup}
                onChange={e => setSelectedGroup(e.target.value)}
            >
                <option value="">Choose a group</option>
                {uniqueGroups.map((group, index) => (
                    <option key={index} value={group}>
                        {group}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FilterBar;

