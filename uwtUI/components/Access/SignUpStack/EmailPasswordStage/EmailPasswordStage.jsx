import { useState } from "react";
import axios from "axios";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { URL } from "../../../../constants";

// TODO: estilar
// TODO: validar
// TODO: documentar
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
                    navigation.navigate('NicknameAvatarStage', {
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
            <Text style={styles.headerText}>Introduce an email and password</Text>
            <TextInput placeholder="email" onChangeText={handleEmail} style={styles.textBox}/>
            <TextInput placeholder="password" onChangeText={handlePassword} style={styles.textBox}/>
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
        alignItems: 'center',
        textAlign: 'center',
        marginTop: "20%"
    },
    headerText: {
        fontSize: 25,
        marginHorizontal: 10,
        fontWeight: 'bold'
    },
    textBox: {
        margin: 10,
        padding: 10,
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        width: 250
    }
})