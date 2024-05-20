import react from "react";
import { View, Text, Button, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";

export default function VerificationStage() {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Text>Verification Stage</Text>
            <Button 
                onPress={() => navigation.navigate('ConfirmationStage')}
                title="Next"
            />
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