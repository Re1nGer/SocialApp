import { createContext, useState } from "react";


export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {

    const [isLightTheme, setIsLightTheme] = useState(false);

    const value = {
        isLightTheme,
        setIsLightTheme
    };

    return <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
};