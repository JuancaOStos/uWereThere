import react, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { AppContext } from "../../AppContext";

export default function IForgotPassword({ navigation }) {
    const [email, setEmail] = useState('')
    const { url } = useContext(AppContext)

    const handleEmail = (value) => setEmail(value)

    const requestNewPassword = async () => {
        // envío el email a la api
        const res = await axios.put(url + '/requestNewPassword', {
            email: email
        })

        if (res.data.status === 'ok') {
            alert('You have received a email with a new password')
            navigation.navigate('Login')
        } else if (res.data.status === 'bad') {
            alert('The email introduced doesn\'t exist')
        } else if (res.data.status === 'error') {
            alert(res.data.result)
        }
        // la api me notifica que mire el correo con un toast
    }

    return (
        <View style={styles.container}>
            <Text>Introduce your email and we will send you a temporal password</Text>
            <TextInput placeholder="email"  style={styles.input} onChangeText={handleEmail}/>
            <TouchableOpacity
                onPress={requestNewPassword}
                style={styles.button}
            >
                <Text>Request new password</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        fontSize: 17,
        margin: 10,
        padding: 10,
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        width: 250
    },
    button: {
        backgroundColor: 'lightblue',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10
    }
  });