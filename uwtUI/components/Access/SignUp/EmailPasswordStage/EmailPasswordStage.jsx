import react, { useState } from "react";
import axios from "axios";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { URL } from "../../../../constants";

export default function EmailPasswordStage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmail = (value) => setEmail(value)
    const handlePassword = (value) => setPassword(value)
    
    const navigation = useNavigation()

    const checkExistingUser = () => {
        axios.post(`${URL}/users/existingEmail`, {
            email: email
        })
            .then(res => {
                const result = res.data.result
                if (result) {
                    console.error(result)
                } else {
                    console.log('Valid user')
                    navigation.navigate('ConfirmationStage', {
                        email: email,
                        password: password
                    })
                }
            })
            .catch(err => {
                alert('An error has occurred:\n' + err)
                console.error('An error has occurred. The server could not be available:\n' + err)
            })
    }

    const disableButton = (email && password)
        ? false
        : true

    return (
        <View style={styles.container}>
            <Text>Email Password Stage</Text>
            <Text>Introduce an email and password</Text>
            <TextInput placeholder="email" onChangeText={handleEmail}/>
            <TextInput placeholder="password" onChangeText={handlePassword}/>
            <Button
                onPress={checkExistingUser}
                title="Next"
                disabled={disableButton}
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