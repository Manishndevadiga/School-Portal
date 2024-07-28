// src/MentorContext.js
import React, { createContext, useState } from 'react';

export const MentorContext = createContext();

export const MentorProvider = ({ children }) => {
    const [mentor, setMentor] = useState(null);

    return (
        <MentorContext.Provider value={{ mentor, setMentor }}>
            {children}
        </MentorContext.Provider>
    );
};

// export { MentorContext, MentorProvider };
