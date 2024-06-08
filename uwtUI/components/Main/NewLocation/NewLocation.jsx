import { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Linking } from "react-native";
import axios from "axios";
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from "../../AppContext";
import { url } from "../../../constants";

// TODO: estilar
// TODO: añadir poder elegir imagen existente
// TODO: validar
// TODO: limpiar
// TODO: documentar
export default function NewLocation() {
    const { authData, url } = useContext(AppContext)
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
                mediaTypes: ImagePicker.MediaTypeOptions.All,
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
            alert('Error', 'Failed to upload image')
            return
        }

        const newLocation = {
            location: {
                latitude: location.latitude + 0.5,
                longitude: location.longitude+ 0.5
            },
            title: title,
            description: description,
            pic: picurl,
            author: authData._id
        }
        axios.post(`${url}/addNewPublication`, newLocation)
            .then(res => {
                console.log(res.data)
                if (res.data.status === 'error') {
                    alert(res.data.result)
                } else {
                    alert(res.data.result)
                }
            }).
            catch(err => {
                console.error('An error has occurred:\n' + err)
            })
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


    useEffect(() => {
        getCurrentLocation()
    }, [])

    return(
        <>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={styles.headerText}>Show us what you discovered!</Text>
                <Image
                    style={{
                        marginTop: 20,
                        width: 350,
                        height: 250,
                        borderRadius: 50,
                        borderColor: 'black',
                        borderWidth: 5,
                        maxWidth: 350,
                        maxHeight: 250
                    }}
                    source={{ uri: image.uri}}/>
                <View style={ styles.container}>
                    <TouchableOpacity
                        style={{
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            marginBottom: 20
                        }}
                        onPress={takeAPic}
                    >
                        <Entypo name="camera" size={40} color="black" />
                    </TouchableOpacity>
                    <Button 
                        title="Update current location"
                        onPress={getCurrentLocation}
                    />
                    
                    <TextInput onChangeText={handleTitle} placeholder="title" style={styles.textBoxTitle} />
                    <TextInput onChangeText={handleDescription} placeholder="description" style={styles.textBoxTitle} multiline/>
                    {(location) && (
                        <TouchableOpacity
                        style={styles.mapsButton}

                        onPress={() => {
                            Linking.canOpenurl(`geo:0,0?q=${location.latitude},${location.longitude}(${title})`)
                                .then((supported) => {
                                    if (supported) {
                                        Linking.openurl(`geo:$0,0?q=${location.latitude},${location.longitude}(${title})`)
                                    } else {
                                        Alert.alert('Error')
                                    }
                                })
                                .catch(err => Alert.alert('Error'))
                        }}
                        disabled={(!title)}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ alignSelf: 'center', alignItems: 'flex-start' }}>
                                <MaterialCommunityIcons name="google-maps" size={40} color="black" />
                            </View>
                            <Text style={{ alignSelf: 'center', marginRight: 10 }}>{title}</Text>
                            <View>
                                <Text>lat:{location.latitude}</Text>
                                <Text>lon:{location.longitude}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    )}
                    <Button
                        title="Publish location"
                        disabled={(!title || !description || !imagePicked)}
                        onPress={addNewLocation}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20
    },
    image: {
      width: 200,
      height: 200,
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
        width: 350,
        borderRadius: 20,
        backgroundColor: '#8BEF7F'
    },
    textBoxTitle: {
        margin: 10,
        padding: 10,
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        width: 250
    }
  });