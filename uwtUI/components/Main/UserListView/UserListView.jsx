import react, { useState, useEffect } from "react";
import { View, TextInput, Button, FlatList } from "react-native";
import axios from "axios";
import { URL } from '../../../constants.js'
import UserItem from "./UserItem/UserItem";

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
                    borderColor: 'lightgrey'
                }}>
                    <TextInput style={{
                        paddingVertical: 5,
                        paddingStart: 10
                    }} placeholder="search" onChangeText={handleSearchName}></TextInput>
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
                <Button
                    title="Reload view"
                    onPress={getAllUsers}
                />
            </View>
        </>
    )
}