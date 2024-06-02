import react, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { View, Text, Button, FlatList, TextInput, Image } from "react-native";
import LocationItem from '../LocationListView/LocationItem/LocationItem.jsx'
import UserItem from '../UserListView/UserItem/UserItem.jsx'
import { AntDesign } from '@expo/vector-icons';
import { AppContext } from "../../AppContext";
import { URL } from '../../../constants.js'

export default function AuthProfileView() {
    const { authData } = useContext(AppContext)
    const [searchName, setSearchName] = useState('')
    const [rate, setRate] = useState(authData.averageRate)
    const [publications, setPublications] = useState(null)
    const [friends, setFriends] = useState(null)
    const [listView, setListView] = useState('publications')
    console.log(authData.avatar)

    const handleSearchName = (value) => setSearchName(value)

    const rateLabel = (rate > 0)
        ? rate
        : 'Not rates yet'

    const getPublisAndFriends = async () => {
        await axios.post(`${URL}/getPublicationsById`, {
            authId: authData._id
        })
            .then(res => {
                console.log(res.data.result)
                setPublications(res.data.result.publications)
            })
            .catch(err => {
                console.error('An error has occurred getting publications of auth user:\n' + err)
            })
        
        await axios.post(`${URL}/getFriendsById`, {
            authId: authData._id
        })
            .then(res => {
                console.log(res.data.result)
                setFriends(res.data.result.friends)
            })
            .catch(err => {
                console.error('An error has occurred getting friends of auth user:\n' + err)
            })
    }

    useEffect(() => {
        getPublisAndFriends()
    }, [])

    const handlePublicationListButton = async () => {
        await getPublisAndFriends()
        setListView('publications')
        console.log(publications)
    }

    const handleFriendListButton = async() => {
        await getPublisAndFriends()
        setListView('friends')
        console.log(friends)
    }

    const listToShow = (listView === 'publications')
        ? (
            <FlatList
                data={publications}
                renderItem={({ item: location }) => (
                    <LocationItem
                        searchName={searchName}
                        locationItem={location}
                        navigationDisabled={true}
                    />
                )}
            />
        )
        : (
            <FlatList
                data={friends}
                renderItem={({ item: friends }) => (
                    <UserItem
                        searchName={searchName}
                        userItem={friends}
                        navigationDisabled={true}
                    />
                )}
            />
        )

    return(
        <>
            <View style={{
            alignItems: 'center',
            marginTop: 30
        }}>
            <View style={{
                flexDirection: 'row',
                marginBottom: 20
            }}>
                <Image source={{ uri: URL + authData.avatar }} style={{
                    width: 150,
                    height: 150,
                    borderRadius: 100
                }}/>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginStart: 20
                }}>
                    <AntDesign name="star" size={24} color="black" />
                    <Text>{rateLabel}</Text>
                </View>
            </View>
            <View style={{
                alignItems: 'center',
                marginBottom: 20
            }}>
                <Text style={{fontSize: 25}}>{authData.nickname}</Text>
                <Text style={{fontSize: 15}}>{authData.email}</Text>
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
                <Button
                    title="n publications"
                    onPress={handlePublicationListButton}
                />
                <Button
                    title="n friends"
                    onPress={handleFriendListButton}
                />
            </View>
            <View>
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
                {listToShow}
            </View>
        </View>
        </>
    )
}