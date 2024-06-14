import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useTranslation } from "react-i18next"; 
import { AppContext } from "../../../AppContext";
import Toast from "react-native-toast-message";
import { REGEX, TOAST_MESSAGES } from "../../../../constants";

export default function ChangeNickname() {
    const { t } = useTranslation()
    const [newNickname, setNewNickname] = useState('')
    const { token, url, translateToast } = useContext(AppContext)

    const handleNewNickname = (value) => setNewNickname(value)

    const changeNickname = () => {
        axios.put(url + '/changeNickname', {
            _id: token._id,
            newNickname: newNickname
        })
            .then(res => {
                console.log(res.data.result)
                const translatedToast = translateToast(TOAST_MESSAGES.SETTINGS.NEW_NICKNAME, t)
                Toast.show(translatedToast)
            })
            .catch(err => {
                console.error(err)
            })
    }

    const checkNickname = async () => {
        // llamar api para comprobar si existe ya el nombre
        if (REGEX.NICKNAME.test(newNickname)) {
            const res = await axios.post(url + '/checkNickname', {
                nickname: newNickname
            })
            if (res.data.status === 'ok') {
                changeNickname()
            } else if (res.data.status === 'bad') {
                const translatedToast = translateToast(TOAST_MESSAGES.SIGN_UP.EXISTING_NICKNAME, t)
                Toast.show(translatedToast)
            } else if (res.data.status === 'error') {
                const translatedToast = translateToast(TOAST_MESSAGES.UNEXPECTED_ERROR, t)
                Toast.show(translatedToast)
            }
        } else {
            const translatedToast = translateToast(TOAST_MESSAGES.SIGN_UP.INVALID_NICKNAME, t)
            Toast.show(translatedToast)
        }
    }

    const buttonColor = (!newNickname)
        ? 'lightgrey'
        : 'lightblue'

    return (
        <View style={styles.container}>
            <Text>{t('settings.introduce_your_new_nickname')}</Text>
            <TextInput
                style={styles.textBox}
                placeholder={t('placeholders.new_nickname')}
                onChangeText={handleNewNickname}
                />
            <Text
                style={{ color: 'grey', marginBottom: 20 }}
            >
                {t('sign_up.nickname_between_2_and_25_characters')}</Text>
            <TouchableOpacity
                style={{
                    backgroundColor: buttonColor,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginBottom: 10
                    }}
                onPress={checkNickname}
                disabled={!newNickname}
            >
                <Text>{t('buttons.change_my_nickname')}</Text>
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
    textBox: {
        margin: 10,
        padding: 10,
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        width: 250,
        marginBottom: 0
    }
})