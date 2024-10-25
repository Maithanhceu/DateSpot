import CreateEvent from "../Components/CreateEvent";
import NavBar from "../Components/NavBar";

export default function EventsPage() {
    return (
        <div>
            <NavBar/>
            <h1>Events Page</h1>
            <CreateEvent/>
        </div>
    );
}