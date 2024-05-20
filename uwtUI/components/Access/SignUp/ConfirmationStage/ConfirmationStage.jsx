import react from "react";
import { View, Text, Button, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";

export default function ConfirmationStage() {
    return (
        <View style={styles.container}>
            <Text>Confirmation Stage</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: "20%"
    }
})