import react from "react";
import { View, Text, Button, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";

export default function EmailPasswordStage() {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text>Email Password Stage</Text>
            <Button
                onPress={() => navigation.navigate('VerificationStage')}
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