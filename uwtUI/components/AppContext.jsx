import react, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'

export const AppContext = createContext()

export default function AppProvider({ children, auth, handleAuth }) {
    const [loginView, setLoginView] = useState(true)
    const [authData, setAuthData] = useState(null)
    const [userPublications, setUserPublications] = useState(null)
    useEffect(() => {
        if (auth) {
            const tokenPayload = jwtDecode(auth)
            console.log(tokenPayload.email)
            setAuthData(tokenPayload)
        }
    }, [auth])
    
    return (
        <AppContext.Provider value={{
            loginView,
            setLoginView,
            authData,
            handleAuth
        }}>
            {children}
        </AppContext.Provider>
    )
}