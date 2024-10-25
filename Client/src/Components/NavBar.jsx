import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import LogOutButton from "../Components/UserLogIn/LogOutButton";
import LoginButton from "../Components/UserLogIn/LoginButton";
import Profile from "./UserLogIn/Profile";
import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
    const { user, isAuthenticated } = useAuth0();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (isAuthenticated && user) {
            setUserId(user.sub);
        } else {
            setUserId(null);
        }
    }, [isAuthenticated, user]);
    console.log(userId);

    return (
        <nav className="navbar">
            <div>
                <Link to="/EventsPage"> Events Page </Link>
                <Link to="/About">About</Link>
                <Link to="/CodeOfConduct">CodeOfConduct</Link>
                {!isAuthenticated ? (
                    <LoginButton />
                ) : (
                    <>
                        <LogOutButton />
                        <Profile userId={userId} />
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
