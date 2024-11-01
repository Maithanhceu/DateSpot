import { Link } from "react-router-dom"; 
import LogOutButton from "../Components/UserLogIn/LogOutButton";
import LoginButton from "../Components/UserLogIn/LoginButton";
import { useEffect, useContext } from "react";
import Profile from "./UserLogIn/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { UserIdContext } from "../Components/UserEvents/UserIdContext"; 
import './CSS/NavBar.css';

//Documentation: https://www.youtube.com/watch?v=pAzqscDx580
//This is a helpful Youtube video on how to integrate Auth0 into your application :)

function NavBar() {
    const { setUserId, userId } = useContext(UserIdContext);  
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (isAuthenticated && user) {
            setUserId(user.sub);  
        } else {
            setUserId(null);
        }
    }, [isAuthenticated, user, setUserId]);

    console.log(userId); 

    return (
        <nav className="navbar">
            <div className="logo">
                Date Spot <br/>
                The Third Place for Dating 
            </div>
            <div className="nav-links"> 
                <Link to="/"> Home Page</Link>
                <Link to="/EventsPage">Events Page</Link>
                <Link to="/About">About</Link>
                <Link to="/CodeOfConduct">Code of Conduct</Link>
                <Profile userId={userId} />
                {!isAuthenticated ? (
                    <LoginButton/>
                ) : (
                    <LogOutButton/>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
