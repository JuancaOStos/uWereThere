import { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Linking, ActivityIndicator } from "react-native";
import axios from "axios";
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from "../../AppContext";
import Toast from "react-native-toast-message";
import { url, REGEX, TOAST_MESSAGES } from "../../../constants";
import { useTranslation } from "react-i18next";

// TODO: estilar
// TODO: añadir poder elegir imagen existente
// TODO: validar
// TODO: limpiar
// TODO: documentar
export default function NewLocation() {
    const { t } = useTranslation()
    const { token, url, translateToast } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState({
        uri: `${url}/public/images/pictureLogo.png`,
        width: null,
        height: null
    })
    const [imagePicked, setImagePicked] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0
    })
    
    const handleTitle = (value) => setTitle(value)
    const handleDescription = (value) => setDescription(value)

    // const pickImage = async () => {
        //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1
    //     })
    
    //     if (!result.canceled) {
        //         console.log(result.assets[0].uri)
        //         setImage(result.assets[0].uri)
        //     }
        // }
        
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
                setImagePicked(true)
                setImage({
                    uri: result.assets[0].uri,
                    type: `${result.assets[0].type}/${ext}`,
                    name: result.assets[0].fileName
                })
            }
        }
        
    const upload = async () => {
        if (image) {
            let picurl = null
            const formData = new FormData()
            formData.append('file', {
                uri: image.uri,
                type: image.type,
                name: image.name
            })
            console.log(image)
            await axios.post(`${url}/upload`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log(res.data.url)
                    picurl = res.data.url
                })
                .catch(err => {
                    console.error('An error has occurred:\n' + err)
                    return null
                })
                return picurl
        } else {
            console.log('No pic made it')
            return null
        }
    }
    
    const addNewLocation = async () => {
        const picurl = await upload()

        if (!picurl) {
            const translatedToast = translateToast(TOAST_MESSAGES.UNEXPECTED_ERROR, t)
            Toast.show(translatedToast)
            console.error('Failed to upload image')
            return
        }
        setLoading(true)
        const newLocation = {
            location: {
                latitude: location.latitude,
                longitude: location.longitude
            },
            title: title,
            description: description,
            pic: picurl,
            author: token._id
        }
        axios.post(`${url}/addNewPublication`, newLocation)
            .then(res => {
                console.log(res.data)
                if (res.data.status === 'ok') {
                    const translatedToast = translateToast(TOAST_MESSAGES.NEW_LOCATION.NEW_LOCATION_SUCCESS, t)
                    Toast.show(translatedToast)
                    setImage({
                        uri: url + '/public/images/pictureLogo.png',
                        width: null,
                        height: null
                    })
                    handleTitle('')
                    handleDescription('')
                    setLoading(false)
                } else if (res.data.status === 'error') {
                    const translatedToast = translateToast(TOAST_MESSAGES.UNEXPECTED_ERROR, t)
                    Toast.show(translatedToast)
                }
            }).
            catch(err => {
                console.error('An error has occurred:\n' + err)
                const translatedToast = translateToast(TOAST_MESSAGES.CONNECTION_ERROR, t)
                Toast.show(translatedToast)
            })
    }

    const checkTitleDescription = () => {
        if (REGEX.TITLE.test(title) && REGEX.DESCRIPTION.test(description)) {
            addNewLocation()
            // console.error(REGEX.TITLE.test(title) && REGEX.DESCRIPTION.test(description))
        } else {
            if (!REGEX.TITLE.test(title) && !REGEX.DESCRIPTION.test(description)) {
                console.error('No se cumple ninguno de los dos')
                const translatedToast = translateToast(TOAST_MESSAGES.NEW_LOCATION.INVALID_TITLE_DESCRIPTION, t)
                Toast.show(translatedToast)
            } else if (!REGEX.TITLE.test(title)) {
                console.error('No se cumple el título')
                const translatedToast = translateToast(TOAST_MESSAGES.NEW_LOCATION.INVALID_TITLE, t)
                Toast.show(translatedToast)
            } else if (!REGEX.DESCRIPTION.test(description)) {
                console.error('No se cumple la descripción')
                const translatedToast = translateToast(TOAST_MESSAGES.NEW_LOCATION.INVALID_DESCRIPTION, t)
                Toast.show(translatedToast)
            }
        }
    }

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            alert('Permission denied')
            return
        }
        let location = await Location.getCurrentPositionAsync({})
        const currentLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
        setLocation(currentLocation)
    }

    const buttonColor = (!title || !description || !imagePicked || loading)
        ? 'lightgrey'
        : 'lightblue'
    
    const buttonLoadingLabel = (!loading)
        ? (<Text>{t('buttons.publish_location')}</Text>)
        : (<ActivityIndicator style={styles.spinner} size={'large'}/>)

    useEffect(() => {
        getCurrentLocation()
    }, [])

    return(
        <>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={styles.headerText}>{t('new_location.show_us_what_you_discovered')}</Text>
                <Image
                    style={{
                        marginTop: 20,
                        width: 300,
                        height: 200,
                        borderRadius: 50,
                        borderColor: 'black',
                        borderWidth: 5,
                        maxWidth: 350,
                        maxHeight: 250,
                        marginBottom: 5
                    }}
                    source={{ uri: image.uri}}/>
                <View style={ styles.container}>
                    <TouchableOpacity
                        style={{
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            marginBottom: 8
                        }}
                        onPress={takeAPic}
                    >
                        <Entypo name="camera" size={40} color="black" />
                    </TouchableOpacity>
                    
                    <TextInput onChangeText={handleTitle} value={title} placeholder={t('placeholders.title')} style={styles.textBoxTitle} />
                    <Text style={{ color: 'grey', marginBottom: 10 }}>{t('new_location.title_between_3_and_40_characters')}</Text>
                    <TextInput onChangeText={handleDescription} value={description} placeholder={t('placeholders.description')} style={styles.textBoxTitle} multiline/>
                    <Text style={{ color: 'grey', marginBottom: 20 }}>{t('new_location.description_between_10_and_200_characters')}</Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={getCurrentLocation}
                    >
                        <Text>{t('buttons.update_current_location')}</Text>
                    </TouchableOpacity>
                    {(location) && (
                        <TouchableOpacity
                        style={styles.mapsButton}

                        onPress={() => {
                            Linking.canOpenURL(`geo:0,0?q=${location.latitude},${location.longitude}(${title})`)
                                .then((supported) => {
                                    if (supported) {
                                        Linking.openURL(`geo:$0,0?q=${location.latitude},${location.longitude}(${title})`)
                                    } else {
                                        alert('Error')
                                    }
                                })
                                .catch(err => alert('Error'))
                        }}
                        disabled={(!title)}
                    >
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <View style={{ alignSelf: 'center', alignItems: 'flex-start' }}>
                                <MaterialCommunityIcons name="google-maps" size={40} color="black" />
                            </View>
                            <Text style={{ alignSelf: 'center', marginRight: 10 }}>{title}</Text>
                        </View>
                    </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={{ 
                            ...styles.button,
                            backgroundColor: buttonColor
                         }}
                        disabled={(!title || !description || !imagePicked || loading)}
                        onPress={checkTitleDescription}
                    >
                        {buttonLoadingLabel}
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: 170,
      height: 170,
    },
    headerText: {
        fontSize: 23,
        marginHorizontal: 10,
        fontWeight: 'bold'
    },
    mapsButton: {
        borderWidth: 1,
        alignSelf: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#8BEF7F',
        marginBottom: 30
    },
    textBoxTitle: {
        marginBottom: 0,
        padding: 10,
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        width: 250
    },
    button: {
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10
      },
    loadingView: {
        position: 'relative',
        backgroundColor: 'grey',
        borderColor: 'black',
        top: 40,
        borderRadius: 10,
        width: 100,
        height: 100
    },
  });