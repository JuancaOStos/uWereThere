import react from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";

export default function VerificationStage() {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Text>Verification Stage</Text>
            <Text>Introduce the verification code send to your email</Text>
            <TextInput />
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