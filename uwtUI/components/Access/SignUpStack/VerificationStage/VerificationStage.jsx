import { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { AppContext } from '../../../AppContext';
import { URL } from "../../../../constants";
import axios from "axios";

export default function VerificationStage({ route }) {
    const { email } = route.params
    const { loginView, setLoginView } = useContext(AppContext)
    const [code, setCode] = useState('')
    const handleCode = (value) => setCode(value)
    const navigation = useNavigation()

    const requestVerificationCode = async () => {
        await axios.post(URL + '/verificationCode', {
            email: email
        })
            .then(res => {
                console.log(res.data.result)
            })
            .catch(err => {
                console.log('Error: ' + err)
                alert('Error: ' + err)
            })

    }

    useEffect(() => {
        requestVerificationCode()
    }, [])

    const verifyAccount = async () => {
        await axios.post(URL + '/verifyCode', {
            email: email,
            code: code
        })
            .then(res => {
                if (res.data.status === 'ok') {
                    console.log('Account verified with success')
                    alert('Account verified with success')
                    if (loginView === false) {
                        setLoginView(true)
                    } else {
                        navigation.goBack()
                    }

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
            <Text>Verification Stage</Text>
            <Text>Introduce the verification code send to your email</Text>
            <TextInput value={code} onChangeText={handleCode}/>
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
        textAlign: 'center',
        marginTop: "20%"
    }
})