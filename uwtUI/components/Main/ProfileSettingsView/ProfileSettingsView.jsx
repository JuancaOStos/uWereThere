import react, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AppContext } from "../../AppContext";

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