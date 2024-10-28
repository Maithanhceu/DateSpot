

import {useState} from 'react'; 

function DeleteEvent({ userId, eventId, eventUserId }) {
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`/deleteEvent/${eventUserId}/${eventId}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                setIsDeleted(true);
                alert('You have successfully deleted this event')
            } else if (response.status === 404) {
                alert('User event registration not found.');
            }
        } catch (error) {
            alert('Error deleting user event:', error);
        }
    };

    return (
        <>
            {userId === eventUserId && (
                <button onClick={handleDelete} disabled={isDeleted}>
                    {isDeleted ? 'Deleted' : 'Delete Event'}
                </button>
            )}
        </>
    );
}

export default DeleteEvent;