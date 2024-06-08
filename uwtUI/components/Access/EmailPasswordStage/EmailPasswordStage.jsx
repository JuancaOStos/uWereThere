import { useState, useContext } from "react";
import axios from "axios";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { URL } from "../../../constants";
import { AppContext } from "../../AppContext";

// TODO: estilar
// TODO: validar
// TODO: documentar
export default function EmailPasswordStage() {
    const { setLoginView, url } = useContext(AppContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const handleEmail = (value) => setEmail(value)
    const handlePassword = (value) => setPassword(value)
    const handleRepeatPassword = (value) => setRepeatPassword(value)
    
    const navigation = useNavigation()

    const checkExistingUser = () => {
        axios.post(`${url}/users/existingEmail`, {
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
            <TextInput placeholder="repeat password" onChangeText={handleRepeatPassword} style={styles.textBox}/>
            <TouchableOpacity
                style={{
                backgroundColor: 'lightblue',
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginBottom: 10
                }}
                onPress={checkExistingUser}
                disabled={disableButton}
            >
                <Text style={{ fontSize: 20 }}>Next</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginRight: 10, fontSize: 18 }}>Do you already have an account?</Text>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Login') }}
                >
                    <Text style={{ color: 'green', fontSize: 18 }}>Log in</Text>
                </TouchableOpacity>
            </View>
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