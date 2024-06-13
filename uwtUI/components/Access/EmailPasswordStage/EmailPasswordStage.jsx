import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { URL, REGEX, TOAST_MESSAGES } from "../../../constants";
import { AppContext } from "../../AppContext";

// TODO: estilar
// TODO: validar
// TODO: documentar
export default function EmailPasswordStage() {
    const { t } = useTranslation()
    const { setLoginView, url, translateToast } = useContext(AppContext)
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
                const translatedToast = translateToast(TOAST_MESSAGES.SIGN_UP.INVALID_REPEAT_PASSWORD, t)
                Toast.show(translatedToast)
            } else {
                axios.post(`${url}/users/existingEmail`, {
                    email: email
                })
                    .then(res => {
                        const result = res.data.result
                        if (result) {
                            console.error(result)
                            const translatedToast = translateToast(TOAST_MESSAGES.SIGN_UP.EXISTING_EMAIL, t)
                            Toast.show(translatedToast)
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
            const translatedToast = translateToast(errorMessage, t)
            Toast.show(translatedToast)
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
            <Text 
                style={styles.headerText}
                >
                    {t('sign_up.introduce_an_email_and_password')}
            </Text>
            <TextInput
                style={styles.textBox}
                placeholder="email"
                onChangeText={handleEmail}
                />

            <Text
                style={{ color: 'grey' }}
                >
                    {t('sign_up.email_between_10_and_40_characters_before')}@
            </Text>
            <TextInput
                style={styles.textBox}
                placeholder={t('placeholders.password')}
                onChangeText={handlePassword}
                secureTextEntry={true}
                />
            <Text
                style={{ color: 'grey' }}
                >
                    {t('sign_up.password_between_8_and_25_characters')}
            </Text>
            <TextInput
                style={styles.textBox}
                placeholder={t('placeholders.repeat_password')}
                onChangeText={handleRepeatPassword}
                secureTextEntry={true}
                />
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
                <Text style={{ fontSize: 20 }}>{t('buttons.next')}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginRight: 10, fontSize: 18 }}>{t('sign_up.do_you_already_have_an_account')}</Text>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Login') }}
                >
                    <Text style={{ color: 'green', fontSize: 18 }}>{t('buttons.log_in')}</Text>
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