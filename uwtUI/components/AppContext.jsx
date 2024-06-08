import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'

export const AppContext = createContext()

// TODO: estilar
// TODO: documentar
export default function AppProvider({ children, auth, handleAuth }) {
    const [loginView, setLoginView] = useState(true)
    const [authData, setAuthData] = useState(null)
    const [userPublications, setUserPublications] = useState(null)
    const [url, setUrl] = useState('')
    const handleUrl = (value) => setUrl('http://' + value + ':3000')
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
            handleUrl,
            url,
            authData,
            handleAuth
        }}>
            {children}
        </AppContext.Provider>
    )
}