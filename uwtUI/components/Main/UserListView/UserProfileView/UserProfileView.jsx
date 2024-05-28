import react, { useState, useEffect, useContext } from "react";
import { View, Text, Button, FlatList } from "react-native";
import axios from "axios";
import { URL } from '../../../../constants.js'
import { AppContext } from "../../../AppContext";
import LocationItem from "../../LocationListView/LocationItem/LocationItem.jsx";
import UserItem from "../UserItem/UserItem.jsx";
import { AntDesign } from '@expo/vector-icons';

export default function UserProfileView({ route }) {
    const [searchName, setSearchName] = useState('')
    const [publications, setPublications] = useState(null)
    const [friends, setFriends] = useState(null)
    const [listView, setListView] = useState('publications')
    const { authData } = useContext(AppContext)
    const { userItem } = route.params
    const [authFriend, setAuthFriend] = useState(false)
    console.log(userItem)
    console.log(authData._id)

    const handleSearchName = (value) => setSearchName(value)

    const getPublisAndFriends = async () => {
        await axios.post(`${URL}/getPublicationsById`, {
            authId: userItem._id
        })
            .then(res => {
                console.log(res.data.result)
                setPublications(res.data.result.publications)
            })
            .catch(err => {
                console.error('An error has occurred getting publications of auth user:\n' + err)
            })
        
        await axios.post(`${URL}/getFriendsById`, {
            authId: userItem._id
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

    useEffect(() => {
        checkFriendById()
    }, [])

    const checkFriendById = async () => {
        await axios.post(`${URL}/checkFriendById`, {
            authId: authData._id,
            friendId: userItem._id
        })
            .then(res => {
                console.log(res.data.result)
                setAuthFriend(res.data.result)
            })
    }

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

    const handleFollow = async () => {
        await axios.put(`${URL}/followUser`, {
            authId: authData._id,
            friendId: userItem._id
        })
            .then(res => {
                console.log(res.data.result)
            })
        checkFriendById()
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

    const handleUnFollow = async () => {
        await axios.put(`${URL}/unFollowUser`, {
            authId: authData._id,
            friendId: userItem._id
        })
            .then(res => {
                console.log(res.data.result)
            })
        checkFriendById()
    }

    const followButtonFunction = (authFriend)
        ? handleUnFollow
        : handleFollow
    
    const followButtonText = (authFriend)
        ? 'unfollow'
        : 'follow'

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
                <View style={{
                    backgroundColor: 'red',
                    width: 100,
                    height: 100,
                    borderRadius: 50
                }}></View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginStart: 20
                }}>
                    <AntDesign name="star" size={24} color="black" />
                    <Text>n</Text>
                </View>
            </View>
            <View style={{
                alignItems: 'center',
                marginBottom: 20
            }}>
                <Text style={{fontSize: 25}}>{userItem.nickname}</Text>
                <Text style={{fontSize: 15}}>{userItem.email}</Text>
            </View>
            <View>
                <Button
                    title={followButtonText}
                    onPress={followButtonFunction}
                />
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
            {listToShow}
        </View>
        </>
    )
}