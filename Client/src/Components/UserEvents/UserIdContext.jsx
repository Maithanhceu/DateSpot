// UserIdContext.js
import { createContext, useState } from 'react';

// Create the context
export const UserIdContext = createContext();

// Create a provider component
export const UserIdProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    return (
        <UserIdContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserIdContext.Provider>
    );
};
