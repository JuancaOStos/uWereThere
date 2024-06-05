import { useState } from "react";
import axios from "axios";
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableHighlight } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { URL } from "../../../../constants";

// TODO: estilar
// TODO: añadir también hacer foto
// TODO: validar
// TODO: documentar
export default function NicknameAvatarStage({ route, navigation }) {
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
            mediaTypes: ImagePicker.MediaTypeOptions.All,
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

    const upload = async () => {
        if (avatarSelected) {
            let avatarUrl = null
            const formData = new FormData()
            formData.append('file', {
                uri: avatar.uri,
                type: avatar.type,
                name: avatar.name
            })
            await axios.post(`${URL}/upload`, formData, {
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

        axios.post(`${URL}/signup`, {
            email: email,
            password: password,
            nickname: nickname,
            avatar: avatarUrl
        })
            .then(res => {
                const data = res.data
                setResultMessage(data.result)
                alert('User Registered\nVerify your account')
                navigation.navigate('VerificationStage', {
                    email: email
                })
            })
            .catch(err => {
                console.error('An error has occurred. The server could not be available:\n' + err)
                alert('An error has occurred. The server could not be available:\n' + err)
            })
    }

    const disableButton = (nickname)
        ? false
        : true


    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Choose an avatar!</Text>
            {avatar && <Image source={{ uri: avatar.uri }} style={styles.image} />}
            <View style={styles.horizontalBox}>
                <TouchableHighlight
                    onPress={() => {}}
                >
                    <Entypo name="camera" size={40} color="black" />
                </TouchableHighlight>
                <TouchableHighlight
                    style={{ marginLeft: 25}}
                    onPress={pickImage}
                >
                    <FontAwesome name="picture-o" size={40} color="black" />
                </TouchableHighlight>
            </View>
            <Text style={styles.headerText}>Who do you want be called?</Text>
            <TextInput style={styles.textBox} placeholder="nickname" onChangeText={handleNickname}/>
            <Button
                onPress={newUserSignUp}
                title="Next"
                disabled={disableButton}
            />
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