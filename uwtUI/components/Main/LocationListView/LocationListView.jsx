import react, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import axios from "axios";
import LocationItem from "./LocationItem/LocationItem";
import { URL } from '../../../constants.js'

export default function LocationListView() {
    const [searchTitle, setSearchTitle] = useState('')
    const [locations, setLocations] = useState(null)

    const handleSearchTitle = (value) => setSearchTitle(value)
    const handleLocations = (value) => setLocations(value)

    const getAllLocations = async() => {
        const locationsData = await axios.get(`${URL}/getAllLocations`)
            .then(res => res.data.result)
            .catch(err => {
                const errorMessage = 'An error has occurred:\n' + err
                console.error(errorMessage)
                alert(errorMessage)
            })
        console.log('Locations data', locationsData)
        console.log(locationsData)
        setLocations(locationsData)
    }

    useEffect(() => {
        getAllLocations()
    }, [])

    return(
        <>
            <View style={{ flex: 1 }}>
                <View style={{
                    marginTop: 10,
                    marginHorizontal: '10%',
                    borderWidth: 1,
                    borderRadius: 15,
                    borderColor: 'lightgrey'
                }}>
                    <TextInput style={{
                        paddingVertical: 5,
                        paddingStart: 10
                    }} placeholder="search" onChangeText={handleSearchTitle}></TextInput>
                </View>
                <FlatList
                    data={locations}
                    renderItem={({ item: location }) => (
                        <LocationItem
                            searchTitle={searchTitle}
                            author={location.author}
                            authorAvatar={null}
                            location={location.location}
                            title={location.title}
                            rates={location.rates}
                            distance={null}
                        />
                    )}
                />
            </View>
        </>
    )
}