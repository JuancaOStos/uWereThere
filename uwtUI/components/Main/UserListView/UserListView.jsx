import react, { useState } from "react";
import { View, Text, TextInput, ScrollView, FlatList } from "react-native";
import UserItem from "./UserItem/UserItem";
import users from '../../../usersForDev.json'

export default function UserListView() {
    const [searchName, setSearchName] = useState('')
    const handleSearchName = (value) => setSearchName(value)

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
                            avatar={user.avatar}
                            nickname={user.nickname}
                            rate={user.rate}
                            publicationCount={user.publications.length}
                            friendsCount={user.friends.length}
                        />
                    )}
                />
            </View>
        </>
    )
}