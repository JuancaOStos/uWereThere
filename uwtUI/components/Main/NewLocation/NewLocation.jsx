import react, {useEffect, useState, useContext} from "react";
import { View, Text, TextInput, Button, Image, StyleSheet, Linking } from "react-native";
import axios from "axios";
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import { AppContext } from "../../AppContext";
import { URL } from "../../../constants";


export default function NewLocation() {
    const { authData } = useContext(AppContext)
    const [image, setImage] = useState({
        uri: `${URL}/public/images/pictureLogo.png`,
        width: null,
        height: null
    })
    const [imagePicked, setImagePicked] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState(null)
    
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
            let picUrl = null
            const formData = new FormData()
            formData.append('file', {
                uri: image.uri,
                type: image.type,
                name: image.name
            })
            console.log(image)
            await axios.post(`${URL}/upload`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log(res.data.url)
                    picUrl = res.data.url
                })
                .catch(err => {
                    console.error('An error has occurred:\n' + err)
                    return null
                })
                return picUrl
        } else {
            console.log('No pic made it')
            return null
        }
    }
    
    const addNewLocation = async () => {
        const picUrl = await upload()

        if (!picUrl) {
            alert('Error', 'Failed to upload image')
            return
        }

        const newLocation = {
            location: {
                latitude: location.latitude,
                longitude: location.longitude
            },
            title: title,
            description: description,
            pic: picUrl,
            author: authData._id
        }
        axios.post(`${URL}/addNewPublication`, newLocation)
            .then(data => {
                console.log(data.data)
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


    // useEffect(() => {
    //     getCurrentLocation()
    // }, [])

    return(
        <>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 5
            }}>
                <Image
                    style={{
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
                    <Button 
                        title="Take a pic"
                        onPress={takeAPic}
                    />
                    <Button 
                        title="Get current location"
                        onPress={getCurrentLocation}
                    />
                    <TextInput onChangeText={handleTitle} placeholder="title" style={{
                        marginTop: 40
                    }} />
                    <TextInput onChangeText={handleDescription} placeholder="description" />
                    {(location) && (
                        <Button 
                            title="Redirect to Maps"
                            onPress={() => {
                                Linking.canOpenURL(`geo:0,0?q=${location.latitude},${location.longitude}(${title})`)
                                    .then((supported) => {
                                        if (supported) {
                                            Linking.openURL(`geo:$0,0?q=${location.latitude},${location.longitude}(${title})`)
                                        } else {
                                            Alert.alert('Error')
                                        }
                                    })
                                    .catch(err => Alert.alert('Error'))
                            }}
                            disabled={(!title)}
                        />
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
  });