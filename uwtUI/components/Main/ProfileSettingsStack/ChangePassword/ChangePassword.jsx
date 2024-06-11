import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import { AppContext } from "../../../AppContext";

export default function ChangePassword() {
    const { url, token } = useContext(AppContext)
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
                    alert(res.data.result)
                })
                .catch(err => {
                    console.error(err)
                })
        } else {
            console.error('The \'repeat password\' field doesn\'t match with the new password')
            alert('The \'repeat password\' field doesn\'t match with the new password')
        }
    }

    return (
        <View>
            <Text>Introduce your password</Text>
            <TextInput placeholder="password" onChangeText={handlePassword}/>
            <Text>Introduce your new password</Text>
            <TextInput placeholder="new password" onChangeText={handleNewPassword}/>
            <Text>Repeat your new password</Text>
            <TextInput placeholder="repeat new password" onChangeText={handleRepeatPassword}/>
            <TouchableOpacity
                onPress={changePassword}
            >
                <Text>Change your password</Text>
            </TouchableOpacity>
        </View>
    )
}