import AllEvents from "../Components/UserEvents/AllEvents";

export default function UserPage() {
    return (
        <div className="user-page">
            <h1> All Your Events </h1>
            <div className="container">
                <AllEvents />
            </div>
        </div>

    );
}