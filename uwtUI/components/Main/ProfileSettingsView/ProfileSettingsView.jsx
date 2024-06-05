import { useContext } from "react";
import { View, Button } from "react-native";
import { AppContext } from "../../AppContext";

// TODO: añadir cambio de contraseña
// TODO: añadir cambio de avatar
// TODO: [añadir cambio de idioma]
// TODO: [añadir cambio de privacidad]
// TODO: estilar
// TODO: documentar
export default function ProfileSettingsView() {
    const { handleAuth } = useContext(AppContext)

    return(
        <View>
            <Button 
                title="Log out"
                onPress={() => handleAuth(null)}
            />
        </View>
    )
}