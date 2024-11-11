import { createContext, useState } from 'react';

export const AltTextContext = createContext();

export const AltTextProvider = ({ children }) => {
    const [eventAltText, setEventAltText ] = useState('');

    return (
        <AltTextContext.Provider value={{ eventAltText, setEventAltText }}>
            {children}
        </AltTextContext.Provider>
    );
};