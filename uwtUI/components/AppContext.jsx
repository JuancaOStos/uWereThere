import react, { createContext, useContext, useState } from "react";

export const AppContext = createContext()

export default function AppProvider({ children, handleAuth }) {
    const [loginView, setLoginView] = useState(true)
    return (
        <AppContext.Provider value={{
            loginView,
            setLoginView,
            handleAuth
        }}>
            {children}
        </AppContext.Provider>
    )
}