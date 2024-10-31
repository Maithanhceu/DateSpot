function FilterEvent({ search, setSearch }) {

    return (
        <>
            <h3> Search Event by Name
                <input
                    className='filter-event'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    placeholder="Search Events"
                />
            </h3>
        </>
    )
}

export default FilterEvent