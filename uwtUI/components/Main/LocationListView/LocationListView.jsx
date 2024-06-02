import react, { useState, useEffect } from "react";
import { View, Button, Text, TextInput, FlatList } from "react-native";
import axios from "axios";
import LocationItem from "./LocationItem/LocationItem";
import { URL } from '../../../constants.js'

export default function LocationListView({ navigation }) {
    const [searchName, setSearchName] = useState('')
    const [locations, setLocations] = useState(null)

    const handleSearchName = (value) => setSearchName(value)
    const handleLocations = (value) => setLocations(value)
    const handleNavigation = (locationItem) => {
        navigation.navigate('LocationDetails', { locationItem })
    }

    const getAllLocations = async() => {
        const locationsData = await axios.get(`${URL}/getAllLocations`)
            .then(res => {
                console.log(res.data.result)
                return res.data.result
            })
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
                    }} placeholder="search" onChangeText={handleSearchName}></TextInput>
                </View>
                <FlatList
                    data={locations}
                    renderItem={({ item: location }) => (
                        <LocationItem
                            searchName={searchName}
                            locationItem={location}
                            handleNavigation={handleNavigation}
                            navigationDisabled={false}
                        />
                    )}
                />
                <Button
                    title="Reload view"
                    onPress={getAllLocations}
                />
            </View>
        </>
    )
}