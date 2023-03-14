import { createContext, useState } from "react";


export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {

    const [isLightTheme, setIsLightTheme] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
    const [accessToken, setAccessToken] = useState(null);

    const value = {
        isLightTheme,
        isLoggedIn,
        isChatDrawerOpen,
        setIsLightTheme,
        setIsLoggedIn,
        setIsChatDrawerOpen,
        accessToken,
        setAccessToken
    };

    return <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
};