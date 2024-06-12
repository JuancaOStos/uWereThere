import { useState, useContext } from "react";
import axios from "axios";
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Toast from "react-native-toast-message";
import { URL, REGEX, TOAST_MESSAGES } from "../../../constants";
import { AppContext } from "../../AppContext";

// TODO: estilar
// TODO: añadir también hacer foto
// TODO: validar
// TODO: documentar
export default function NicknameAvatarStage({ route, navigation }) {
    const { url } = useContext(AppContext)
    const { email, password } = route.params
    const [avatar, setAvatar] = useState({
        uri: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        type: '',
        name: ''
    })
    const [avatarSelected, setAvatarSelected] = useState(false)
    const [nickname, setNickname] = useState('')
    const [resultMessge, setResultMessage] = useState('')
    
    const handleNickname = (value) => setNickname(value)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })

        if (!result.canceled) {
            const filenameArray = result.assets[0].fileName.split('.')
            const ext = filenameArray[filenameArray.length - 1]
            setAvatar({
                uri: result.assets[0].uri,
                type: `${result.assets[0].type}/${ext}`,
                name: result.assets[0].fileName
            })
            setAvatarSelected(true)
        }
    }

    const takeAPic = async () => {
        let { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== 'granted') {
        alert('Permission denied')
            return
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        if (!result.canceled) {
            const filenameArray = result.assets[0].fileName.split('.')
            const ext = filenameArray[filenameArray.length - 1]
            setAvatarSelected(true)
            setAvatar({
                uri: result.assets[0].uri,
                type: `${result.assets[0].type}/${ext}`,
                name: result.assets[0].fileName
            })
        }
    }

    const checkNickname = async () => {
        // llamar api para comprobar si existe ya el nombre
        if (REGEX.NICKNAME.test(nickname)) {
            const res = await axios.post(url + '/checkNickname', {
                nickname: nickname
            })
            if (res.data.status === 'ok') {
                newUserSignUp()
            } else if (res.data.status === 'bad') {
                Toast.show(TOAST_MESSAGES.SIGN_UP.EXISTING_NICKNAME)
            } else if (res.data.status === 'error') {
                Toast.show(TOAST_MESSAGES.UNEXPECTED_ERROR)
            }
        } else {
            Toast.show(TOAST_MESSAGES.SIGN_UP.INVALID_NICKNAME)
        }
    }

    const upload = async () => {
        if (avatarSelected) {
            let avatarUrl = null
            const formData = new FormData()
            formData.append('file', {
                uri: avatar.uri,
                type: avatar.type,
                name: avatar.name
            })
            await axios.post(`${url}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log(res.data.url)
                    avatarUrl = res.data.url
                }) 
                .catch(err => {
                    console.error('An error has occurred:\n' + err)
                    return null
                })
                return avatarUrl
        } else {
            return null
        }
    }

    const newUserSignUp = async () => {
        const avatarUrl = await upload()

        if (!avatarUrl) {
            alert('Error', 'Failed to upload image')
            return
        }

        axios.post(`${url}/signup`, {
            email: email,
            password: password,
            nickname: nickname,
            avatar: avatarUrl
        })
            .then(res => {
                const data = res.data
                setResultMessage(data.result)
                Toast.show(TOAST_MESSAGES.SIGN_UP.SIGN_UP_SUCCESS)
                navigation.navigate('VerificationModal', {
                    fromScreen: 'NicknameAvatarStage',
                    email: email
                })
            })
            .catch(err => {
                console.error('An error has occurred. The server could not be available:\n' + err)
                alert('An error has occurred. The server could not be available:\n' + err)
            })
    }

    const disableButton = (nickname && avatarSelected)
        ? false
        : true

    const buttonColor = (disableButton)
        ? 'lightgrey'
        : 'lightblue'

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Choose an avatar!</Text>
            {avatar && <Image source={{ uri: avatar.uri }} style={styles.image} />}
            <View style={styles.horizontalBox}>
                <TouchableOpacity
                    onPress={takeAPic}
                >
                    <Entypo name="camera" size={40} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginLeft: 25}}
                    onPress={pickImage}
                >
                    <FontAwesome name="picture-o" size={40} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={styles.headerText}>How do you want to be called?</Text>
            <TextInput style={styles.textBox} placeholder="nickname" onChangeText={handleNickname}/>
            <TouchableOpacity
                style={{
                backgroundColor: buttonColor,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginBottom: 10
                }}
                onPress={checkNickname}
                disabled={disableButton}
            >
                <Text style={{ fontSize: 20 }}>Next</Text>
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
        marginBottom: 20
    }
})