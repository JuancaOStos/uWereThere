import react, { useState, useContext } from "react";
import axios from "axios";
import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../../AppContext";
import { URL } from "../../../../constants";

export default function ConfirmationStage({ route, navigation }) {
    const { loginView, setLoginView } = useContext(AppContext)
    const { email, password } = route.params

    const [nickname, setNickname] = useState('')
    const handleNickname = (value) => setNickname(value)
    // const [avatar, setAvatar] = useState('work/in/progress')
    // const handleAvatar = (value) => setAvatar(value)
    const avatar = 'work/in/progress'
    const [resultMessge, setResultMessage] = useState('')

    const newUserSignUp = () => {
        axios.post(`${URL}/signup`, {
            email: email,
            password: password,
            nickname: nickname,
            avatar: avatar
        })
            .then(res => {
                const data = res.data
                setResultMessage(data.result)
                setLoginView(true)
            })
            .catch(err => {
                console.error('An error has occurred. The server could not be available:\n' + err)
            })
    }

    const disableButton = (nickname)
        ? false
        : true

    return (
        <View style={styles.container}>
            <Text>Confirmation Stage</Text>
            <Text>Introduce an nickname and choose an avatar</Text>
            <TextInput placeholder="nickname" onChangeText={handleNickname}/>
            <Text>{avatar}</Text>
            <Button
                onPress={newUserSignUp}
                title="Next"
                disabled={disableButton}
            />
            <Text>{resultMessge}</Text>
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