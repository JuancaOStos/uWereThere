import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { URL, REGEX, TOAST_MESSAGES } from "../../../constants";
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
        if (REGEX.EMAIL.test(email) && REGEX.PASSWORD.test(password)) {
            if (password !== repeatPassword) {
                Toast.show(TOAST_MESSAGES.SIGN_UP.INVALID_REPEAT_PASSWORD)
            } else {
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
        } else {
            let errorMessage
            if (!REGEX.EMAIL.test(email) && !REGEX.PASSWORD.test(password)) {
                errorMessage = TOAST_MESSAGES.SIGN_UP.INVALID_EMAIL_PASSWORD
            } else if (!REGEX.EMAIL.test(email)) {
                errorMessage = errorMessage = TOAST_MESSAGES.SIGN_UP.INVALID_EMAIL
            } else if (!REGEX.PASSWORD.test(password)) {
                errorMessage = errorMessage = errorMessage = TOAST_MESSAGES.SIGN_UP.INVALID_PASSWORD
            }
            Toast.show(errorMessage)
        }
    }

    const disableButton = (email && password)
        ? false
        : true

    const buttonColor = (disableButton)
        ? 'lightgrey'
        : 'lightblue'

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Introduce an email and password</Text>
            <TextInput placeholder="email" onChangeText={handleEmail} style={styles.textBox}/>
            <Text style={{ color: 'grey' }}>Email between 10 and 40 characters before @</Text>
            <TextInput placeholder="password" onChangeText={handlePassword} style={styles.textBox}/>
            <Text style={{ color: 'grey' }}>Password between 8 and 25 characters</Text>
            <TextInput placeholder="repeat password" onChangeText={handleRepeatPassword} style={styles.textBox}/>
            <TouchableOpacity
                style={{
                backgroundColor: buttonColor,
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
        marginTop: 20,
        marginBottom: 0,
        padding: 10,
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        width: 250
    }
})