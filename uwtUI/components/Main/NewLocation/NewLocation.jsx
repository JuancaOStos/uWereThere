import react, {useEffect, useState, useContext} from "react";
import { View, Text, TextInput, Button } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import axios from "axios";
import * as Location from 'expo-location'
import { AppContext } from "../../AppContext";


export default function NewLocation() {
    const { userData } = useContext(AppContext)
    // console.log(userData._id)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0
    })

    const handleTitle = (value) => setTitle(value)
    const handleDescription = (value) => setDescription(value)

    const addNewLocation = () => {
        const newLocation = {
            location: {
                latitude: location.latitude,
                longitude: location.longitude
            },
            title: title,
            description: description,
            author: userData._id,
        }
        axios.post('http://192.168.1.26:3000/addNewPublication', newLocation)
            .then(data => {
                console.log(data.data)
            })
    }


    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            alert('Permission denied')
            return
        }
        let location = await Location.getCurrentPositionAsync({})
        // console.log(location)
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
            <View style={{ flex: 1 }}>
                <MapView 
                    style={{
                        width: '100%',
                        height: '40%',
                    }}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.04
                    }}
                    scrollEnabled={false}
                    zoomControlEnabled={false}
                >
                    <Marker 
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.09,
                            longitudeDelta: 0.04
                        }}
                    />
                </MapView>
                <TextInput onChangeText={handleTitle} placeholder="title" />
                <TextInput onChangeText={handleDescription} placeholder="description" />
                <Button
                    title="Publish location"
                    disabled={(!title || !description)}
                    onPress={addNewLocation}
                />
            </View>
        </>
    )
}