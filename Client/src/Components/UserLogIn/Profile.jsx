import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//function to fetch userProfile Photo
function Profile() {
    const { user, isAuthenticated } = useAuth0();
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

      // Automatically close the dropdown after 2 seconds
      useEffect(() => {
        let timer;
        if (isDropdownOpen) {
            timer = setTimeout(() => {
                setDropdownOpen(false); 
            }, 1000);
        }

        // Cleanup timer
        return () => clearTimeout(timer);
    }, [isDropdownOpen]);
    return (
        <>
            {isAuthenticated && (
                <article className="">
                    {user?.picture && (
                        <img 
                        src={user.picture} 
                        alt={user.name}
                        onClick={toggleDropdown} 
                        style={{ cursor: "pointer" }}
                         />
                    )}

                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/UserPage" className="dropdown-item">User Events</Link>
                        </div>
                    )}
                </article>
            )}
        </>
    );
}

export default Profile;
