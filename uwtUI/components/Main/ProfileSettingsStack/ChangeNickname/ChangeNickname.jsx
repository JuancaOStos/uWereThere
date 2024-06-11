import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import { AppContext } from "../../../AppContext";

export default function ChangeNickname() {
    const [newNickname, setNewNickname] = useState('')
    const { token, url } = useContext(AppContext)

    const handleNewNickname = (value) => setNewNickname(value)

    const changeNickname = () => {
        axios.put(url + '/changeNickname', {
            _id: token._id,
            newNickname: newNickname
        })
            .then(res => {
                console.log(res.data.result)
                alert(res.data.result)
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <View>
            <Text>Introduce your new nickname</Text>
            <TextInput placeholder="new nickname" onChangeText={handleNewNickname}/>
            <TouchableOpacity
                onPress={changeNickname}
            >
                <Text>Change your nickname</Text>
            </TouchableOpacity>
        </View>
    )
}