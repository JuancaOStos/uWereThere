import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'

export const AppContext = createContext()

// TODO: estilar
// TODO: documentar
export default function AppProvider({ children, auth, handleAuth }) {

    const [loginView, setLoginView] = useState(true)
    const [token, setToken] = useState(null)
    const handleAuthData = (value) => setToken(value)
    const [userPublications, setUserPublications] = useState(null)
    const [url, setUrl] = useState('')
    const handleUrl = (value) => setUrl('http://' + value + ':3000')
    const translateToast = (toastData, t) => {
        const translatedToast = {
            ...toastData,
            text1: t(toastData.text1),
            text2: t(toastData.text2)
        }

        return translatedToast
    }
    useEffect(() => {
        if (auth) {
            const tokenPayload = jwtDecode(auth)
            console.log(tokenPayload.email)
            setToken(tokenPayload)
        }
    }, [auth])
    
    return (
        <AppContext.Provider value={{
            loginView,
            translateToast,
            setLoginView,
            handleUrl,
            url,
            token,
            handleAuthData,
            handleAuth
        }}>
            {children}
        </AppContext.Provider>
    )
}