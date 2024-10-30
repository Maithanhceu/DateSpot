import { useAuth0 } from "@auth0/auth0-react";
//function to fetch userProfile Photo
function Profile() {
    const { user, isAuthenticated } = useAuth0();

    return (
        <>
            {isAuthenticated && (
                <article className="">
                    {user?.picture && (
                        <img src={user.picture} alt={user.name} />
                    )}
                </article>
            )}
        </>
    );
}

export default Profile;
