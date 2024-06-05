import { useState, useEffect } from "react";
import { View, TextInput, Text, Button, Touchable, StyleSheet, TouchableHighlight, FlatList } from "react-native";
import axios from "axios";
import { URL } from '../../../constants.js'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import UserItem from "./UserItem/UserItem";

// TODO: estilar
// TODO: listar por más antiguos
// TODO: listar por actuales
// TODO: listar por más puntuación
// TODO: listar por menos puntuación
// TODO: validar caja de búsqueda
// TODO: documentar
export default function UserListView({ navigation }) {
    const [searchName, setSearchName] = useState('')
    const [users, setUsers] = useState(null)

    const handleSearchName = (value) => setSearchName(value)
    const handleUsers = (value) => setUsers(value)
    const handleNavigation = (userItem) => {
        navigation.navigate('UserProfileView', { userItem })
    }
    
    const getAllUsers = async() => {
        const usersData = await axios.get(`${URL}/getAllUsers`)
            .then(res => res.data.result)
        console.log('Users data', usersData)
        console.log(usersData)
        setUsers(usersData)
    }
    
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
                    data={users}
                    renderItem={({ item: user }) => (
                        <UserItem
                            searchName={searchName}
                            userItem={user}
                            navigationDisabled={false}
                            handleNavigation={handleNavigation}
                        />
                    )}
                />
                <TouchableHighlight
                    style={styles.updateButton}
                    onPress={getAllUsers}
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