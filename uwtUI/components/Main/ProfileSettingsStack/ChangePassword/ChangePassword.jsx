import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { AppContext } from "../../../AppContext";
import Toast from "react-native-toast-message";
import { REGEX, TOAST_MESSAGES } from "../../../../constants";

export default function ChangePassword() {
    const { t } = useTranslation()
    const { url, token, translateToast } = useContext(AppContext)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const handlePassword = (value) => setPassword(value)
    const handleNewPassword = (value) => setNewPassword(value)
    const handleRepeatPassword = (value) => setRepeatPassword(value)

    const changePassword = async () => {
        if (newPassword === repeatPassword) {
            await axios.put(url + '/changePassword', {
                _id: token._id,
                password: password,
                newPassword: newPassword
            })
                .then(res => {
                    console.log(res.data.result)
                    const translatedToast = translateToast(TOAST_MESSAGES.SETTINGS.NEW_PASSWORD, t)
                    Toast.show(translatedToast)
                })
                .catch(err => {
                    console.error(err)
                })
        } else {
            console.error('The \'repeat password\' field doesn\'t match with the new password')
            alert('The \'repeat password\' field doesn\'t match with the new password')
        }
    }

    const checkPassword = async () => {
        // Comparo si la contraseña actual es correcta
        let res = null
        try {
            res = await axios.post(url + '/checkPassword', {
                _id: token._id,
                password: password
            })
            console.log(res.data.result)
            if (res.data.status === 'ok') {
                // Se valida la nueva contraseña y que repeat password sea la misma
                if (REGEX.PASSWORD.test(newPassword) && newPassword === repeatPassword) {
                    // se hace el cambio
                    changePassword()
                } else {
                    if (!REGEX.PASSWORD.test(newPassword)) {
                        const translatedToast = translateToast(TOAST_MESSAGES.SETTINGS.INVALID_PASSWORD, t)
                        Toast.show(translatedToast)
                    } else if (newPassword !== repeatPassword) {
                        const translatedToast = translateToast(TOAST_MESSAGES.SETTINGS.INVALID_REPEAT_PASSWORD, t)
                        Toast.show(translatedToast)
                    }
                }
            } else if (res.data.status === 'bad' && res.data.result === 'The password doesn\'t match') {
                const translatedToast = translateToast(TOAST_MESSAGES.SETTINGS.PASSWORD_DOESNT_MATCH, t)
                Toast.show(translatedToast)
            } else if (res.data.status === 'bad' && res.data.result === 'User not found') {
                const translatedToast = translateToast(TOAST_MESSAGES.INTERNAL_ERROR, t)
                Toast.show(translatedToast)
            } else if (res.data.status === 'error') {
                const translatedToast = translateToast(TOAST_MESSAGES.UNEXPECTED_ERROR, t)
                Toast.show(translatedToast)
            }
        } catch (err) {
            const translatedToast = translateToast(TOAST_MESSAGES.CONNECTION_ERROR, t)
            Toast.show(translatedToast)
        }
    }

    const buttonColor = (!password || !newPassword || !repeatPassword)
        ? 'lightgrey'
        : 'lightblue'

    return (
        <View style={styles.container}>
            <Text>{t('settings.introduce_your_password')}</Text>
            <TextInput
                style={styles.textBox1}
                placeholder={t('placeholders.password')}
                onChangeText={handlePassword}
                secureTextEntry={true}
                />
            <Text>{t('settings.introduce_your_new_password')}</Text>
            <TextInput
                style={styles.textBox2}
                placeholder={t('placeholders.new_password')}
                onChangeText={handleNewPassword}
                secureTextEntry={true}
                />
            <Text style={{ color: 'grey', marginBottom: 20 }}>{t('sign_up.password_between_8_and_25_characters')}</Text>
            <Text>{t('settings.repeat_your_new_password')}</Text>
            <TextInput
                style={styles.textBox1}
                placeholder={t('placeholders.repeat_new_password')}
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
                onPress={checkPassword}
            >
                <Text>{t('buttons.change_my_password')}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        fontSize: 30,
        textAlign: 'center',
        alignItems: 'center',
        marginTop: "20%"
    },
    image: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 100,
        marginBottom: 20
    },
    horizontalBox: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 20
    },
    headerText: {
        fontSize: 20,
        marginHorizontal: 10,
        fontWeight: 'bold',
        marginBottom: 20
    },
    textBox1: {
        margin: 10,
        padding: 10,
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        width: 250,
        marginBottom: 20
    },
    textBox2: {
        margin: 10,
        padding: 10,
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        width: 250,
        marginBottom: 0
    }
})