import { useState, useEffect } from "react";
import { View, Button, Text, TouchableHighlight, TextInput, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import LocationItem from "./LocationItem/LocationItem";
import { URL } from '../../../constants.js'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

// TODO: estilar
// TODO: validar
// TODO: listar por más antiguos primero
// TODO: listar por actuales primero
// TODO: listar por más puntuación
// TODO: listar por menos puntuación
// TODO: limpiar
// TODO: documentar
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
                    borderColor: 'lightgrey',
                    marginBottom: 5
                }}>
                    <TextInput style={{
                        paddingVertical: 5,
                        paddingStart: 10
                    }} placeholder="search" onChangeText={handleSearchName}></TextInput>
                </View>
                <View style={styles.filterSection}>
                    <TouchableHighlight
                        style={styles.filterButton}
                        onPress={() => {}}
                    >
                        <View >
                            <Text>Older</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.filterButton}
                        onPress={() => {}}
                    >
                        <View>
                            <Text>Newer</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.filterButton}
                        onPress={() => {}}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign name="star" size={24} color="black" />
                            <AntDesign name="arrowup" size={24} color="black" />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.filterButton}
                        onPress={() => {}}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign name="star" size={24} color="black" />
                            <AntDesign name="arrowdown" size={24} color="black" />
                        </View>
                    </TouchableHighlight>
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
                <TouchableHighlight
                    style={styles.updateButton}
                    onPress={getAllLocations}
                >
                    <View>
                        <Ionicons name="reload" size={40} color="black" />
                    </View>
                </TouchableHighlight>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    filterSection: {
        flexDirection: 'row',
        marginHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 40
    },
    filterButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        marginHorizontal: 5,
        height: 40
    },
    updateButton: {
        borderWidth: 2,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center'
    }
})