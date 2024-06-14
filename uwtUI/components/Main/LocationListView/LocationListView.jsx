import { useState, useEffect, useContext } from "react";
import { View, Button, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import LocationItem from "./LocationItem/LocationItem";
import { useTranslation } from "react-i18next";
import { url } from '../../../constants.js'
import { sortElements } from "../../../utils.js";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from "../../AppContext.jsx";


// NO SE USA AUTHDATA
// TODO: estilar
// TODO: validar
// TODO: listar por más antiguos primero
// TODO: listar por actuales primero
// TODO: listar por más puntuación
// TODO: listar por menos puntuación
// TODO: limpiar
// TODO: documentar
export default function LocationListView({ navigation }) {
    const { t } = useTranslation()
    const { url } = useContext(AppContext)
    const [searchName, setSearchName] = useState('')
    const [locations, setLocations] = useState([])
    const [sortData, setSortData] = useState({
        sortField: 'createdAt',
        sortDirection: 'desc'
    })

    const handleSearchName = (value) => setSearchName(value)
    const handleLocations = (value) => setLocations(value)
    const handleNavigation = (locationItem) => {
        navigation.navigate('LocationDetails', { locationItem })
    }

    const getAllLocations = async() => {
        const locationsData = await axios.get(`${url}/getAllLocations`)
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
        handleLocations(locationsData)
    }

    const sortLocations = () => {
        console.log(sortData.sortField + ' : ' + sortData.sortDirection)
        const sortedLocations = sortElements(locations, sortData.sortField, sortData.sortDirection)

        return sortedLocations
    }

    const sortedLocations = sortLocations()

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
                    }} placeholder={t('placeholders.search')} onChangeText={handleSearchName}></TextInput>
                </View>
                <View style={styles.filterSection}>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => {
                            setSortData({
                                sortField: 'createdAt',
                                sortDirection: 'asc'
                            })
                        }}
                    >
                        <View >
                            <Text>{t('buttons.older')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => {
                            setSortData({
                                sortField: 'createdAt',
                                sortDirection: 'desc'
                            })
                        }}
                    >
                        <View>
                            <Text>{t('buttons.newer')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => {
                            setSortData({
                                sortField: 'averageRate',
                                sortDirection: 'asc'
                            })
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign name="star" size={24} color="black" />
                            <AntDesign name="arrowup" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => {
                            setSortData({
                                sortField: 'averageRate',
                                sortDirection: 'desc'
                            })
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign name="star" size={24} color="black" />
                            <AntDesign name="arrowdown" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
                {(locations.length === 0) && <Text style={{ alignSelf: 'center', marginTop: 50, fontSize: 20 }}>{t('there_are_no_locations')}</Text>}
                <FlatList
                    data={sortedLocations}
                    renderItem={({ item: location }) => (
                        <LocationItem
                            searchName={searchName}
                            locationItem={location}
                            handleNavigation={handleNavigation}
                            navigationDisabled={false}
                            fromProfileView={false}
                        />
                    )}
                />
                <TouchableOpacity
                    style={styles.updateButton}
                    onPress={getAllLocations}
                >
                    <View>
                        <Ionicons name="reload" size={40} color="black" />
                    </View>
                </TouchableOpacity>
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
        paddingHorizontal: 40,
        borderColor: 'lightgrey'
    },
    filterButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 5,
        marginHorizontal: 5,
        height: 40,
        backgroundColor: 'lightgreen'
    },
    updateButton: {
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
    }
})