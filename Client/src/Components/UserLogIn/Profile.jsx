import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
    const { user, isAuthenticated } = useAuth0();

    return (
        <>
            {isAuthenticated && (
                <article className="Column">
                    {user?.picture && (
                        <img src={user.picture} alt={user.name} />
                    )}
                </article>
            )}
        </>
    );
}

export default Profile;
