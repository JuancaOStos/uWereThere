import { useState, useEffect, useContext } from "react";
import { View, TextInput, Text, Button, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import axios from "axios";
import { url } from '../../../constants.js'
import { useTranslation } from "react-i18next";
import { sortElements } from "../../../utils.js";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import UserItem from "./UserItem/UserItem";
import { AppContext } from "../../AppContext.jsx";

// TODO: estilar
// TODO: listar por más antiguos
// TODO: listar por actuales
// TODO: listar por más puntuación
// TODO: listar por menos puntuación
// TODO: validar caja de búsqueda
// TODO: documentar
export default function UserListView({ navigation }) {
    const { t } = useTranslation()
    const { url } = useContext(AppContext)
    const [searchName, setSearchName] = useState('')
    const [users, setUsers] = useState([])
    const [sortData, setSortData] = useState({
        sortField: 'createdAt',
        sortDirection: 'desc'
    })
    const [loading, setLoading] = useState(false)
    const handleSearchName = (value) => setSearchName(value)
    const handleUsers = (value) => setUsers(value)
    const handleNavigation = (userItem) => {
        navigation.navigate('UserProfileView', { userItem })
    }
    
    const getAllUsers = async() => {
        setLoading(true)
        const usersData = await axios.get(`${url}/getAllUsers`)
            .then(res => {
                setLoading(false)
                return res.data.result
            })
        console.log('Users data', usersData)
        console.log(usersData)
        setUsers(usersData)
    }

    const sortUsers = () => {
        console.log(sortData.sortField + ' : ' + sortData.sortDirection)
        const sortedUsers = sortElements(users, sortData.sortField, sortData.sortDirection)

        return sortedUsers
    }

    const sortedUsers = sortUsers()
    
    useEffect(() => {
        getAllUsers()
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
                {(users.length === 0) && <Text style={{ alignSelf: 'center', marginTop: 50, fontSize: 20 }}>{t('there_are_no_users')}</Text>}
                <FlatList 
                    data={sortedUsers}
                    renderItem={({ item: user }) => (
                        <UserItem
                            searchName={searchName}
                            userItem={user}
                            navigationDisabled={false}
                            handleNavigation={handleNavigation}
                        />
                    )}
                />
                <TouchableOpacity
                    style={styles.updateButton}
                    onPress={getAllUsers}
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
        borderColor: 'lightgrey',
        backgroundColor: 'lightblue'
    }
})