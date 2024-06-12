import { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { AppContext } from '../../AppContext';
import Toast from 'react-native-toast-message';
import { URL, TOAST_MESSAGES } from "../../../constants";
import axios from "axios";

// TODO: estilar
// TODO: validar
// TODO: documentar
export default function VerificationSignUp({ route }) {
    const { email, fromScreen } = route.params
    const { loginView, setLoginView, url } = useContext(AppContext)
    const [code, setCode] = useState('')
    const handleCode = (value) => setCode(value)
    const navigation = useNavigation()

    const requestVerificationCode = async () => {
        await axios.post(url + '/verificationCode', {
            email: email
        })
            .then(res => {
                console.log(res.data.result)
            })
            .catch(err => {
                console.log('Error: ' + err)
                alert('Error: ' + err)
            })
        
        Toast.show(TOAST_MESSAGES.SIGN_UP.VERIFICATION_CODE_SENT)

    }

    useEffect(() => {
        requestVerificationCode()
    }, [])

    const verifyAccount = async () => {
        await axios.post(url + '/verifyCode', {
            email: email,
            code: code
        })
            .then(res => {
                if (res.data.status === 'ok') {
                    console.log('Account verified with success')
                    Toast.show(TOAST_MESSAGES.SIGN_UP.ACCOUNT_VERIFIED)
                    navigation.navigate('Login')
                    // if (fromScreen === 'NicknameAvatarStage') {
                    //     navigation.navigate('Login')
                    // } else if (fromScreen === 'Login') {
                    //     navigation.goBack()
                    // }

                } else {
                    alert('Code doesn\'t match')
                    console.error('Error:', res.data.result)
                }
            })
            .catch(err => {
                console.error('Error:', err)
                alert('Error', err)
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Verification your account</Text>
            <Text style={styles.subHeaderText}>Introduce the verification code send to your email</Text>
            <TextInput style={styles.textBox} keyboardType='numeric' value={code} onChangeText={handleCode}/>
            <Button 
                onPress={verifyAccount}
                title="Verify"
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
        fontSize: 30,
        marginHorizontal: 10,
        fontWeight: 'bold',
        marginBottom: 20
    },
    subHeaderText: {
        fontSize: 20,
        marginHorizontal: 10,
        marginBottom: 20
    },
    textBox: {
        margin: 10,
        padding: 10,
        textAlign: 'center',
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        width: 100,
        marginBottom: 20
    }
})