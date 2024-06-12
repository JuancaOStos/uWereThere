import { useState, useEffect, useContext } from "react";
import { View, Text, Button, FlatList, ScrollView, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { url } from '../../../../constants.js'
import { AppContext } from "../../../AppContext";
import LocationItem from "../../LocationListView/LocationItem/LocationItem.jsx";
import UserItem from "../UserItem/UserItem.jsx";
import { AntDesign } from '@expo/vector-icons';
import Toast from "react-native-toast-message";
import { USER_LOGO, TOAST_MESSAGES } from "../../../../constants.js";
import { sortElements } from "../../../../utils.js";

// TODO: estilar
// TODO: cambiar FlatList por ScrollView
// TODO: validar caja de búsqueda
// TODO: listar por más antiguo
// TODO: listar por actuales
// TODO: listar por puntuación más alta
// TODO: listar por puntuación más baja
// TODO: limpiar
// TODO: documentar
export default function UserProfileView({ route }) {
    const { userItem } = route.params
    const [searchName, setSearchName] = useState('')
    const [publications, setPublications] = useState([])
    const [rate, setRate] = useState(userItem.averageRate)
    const [followed, setFollowed] = useState([])
    const [followers, setFollowers] = useState([])
    const [listView, setListView] = useState('publications')
    const { token, url } = useContext(AppContext)
    const [authFriend, setAuthFriend] = useState(false)
    const [sortData, setSortData] = useState({
        sortField: 'createdAt',
        sortDirection: 'desc'
    })
    console.log(userItem)
    console.log(token._id)
    const avatar = (userItem.avatar)
        ? userItem.avatar
        : USER_LOGO

    const rateLabel = (rate > 0)
        ? rate
        : 'Not rated yet'

    const handleSearchName = (value) => setSearchName(value)

    const getPublisAndFriends = async () => {
        await axios.post(`${url}/getPublicationsById`, {
            authId: userItem._id
        })
            .then(res => {
                console.log(res.data.result)
                setPublications(res.data.result.publications)
            })
            .catch(err => {
                console.error('An error has occurred getting publications of auth user:\n' + err)
            })
        
        await axios.post(`${url}/getFollowedAndFollowersById`, {
            authId: userItem._id
        })
            .then(res => {
                setFollowed(res.data.result.followed)
                setFollowers(res.data.result.followers)
            })
            .catch(err => {
                console.error('An error has occurred getting friends of auth user:\n' + err)
            })
    }

    useEffect(() => {
        getPublisAndFriends()
    }, [])

    useEffect(() => {
        checkFollowedById()
    }, [])

    const checkFollowedById = async () => {
        await axios.post(`${url}/checkFollowedById`, {
            authId: token._id,
            followedId: userItem._id
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

    const handleFollowedListButton = async() => {
        await getPublisAndFriends()
        setListView('followed')
        console.log(followed)
    }

    const handleFollowersListButton = async() => {
        await getPublisAndFriends()
        setListView('followers')
        console.log(followers)
    }

    const handleFollow = async () => {
        await axios.put(`${url}/followUser`, {
            authId: token._id,
            followedId: userItem._id
        })
            .then(res => {
                console.log(res.data.result)
                Toast.show(TOAST_MESSAGES.USER_PROFILE.FOLLOWED)
            })
        checkFollowedById()
    }

    const sortPublications = () => {
        console.log(sortData.sortField + ' : ' + sortData.sortDirection)
        const sortedPublications = sortElements(publications, sortData.sortField, sortData.sortDirection)

        return sortedPublications
    }

    const sortFollowers = () => {
        console.log(sortData.sortField + ' : ' + sortData.sortDirection)
        const sortedFollowers = sortElements(followers, sortData.sortField, sortData.sortDirection)

        return sortedFollowers
    }

    const sortFollowed = () => {
        console.log(sortData.sortField + ' : ' + sortData.sortDirection)
        const sortedFollowed = sortElements(followed, sortData.sortField, sortData.sortDirection)

        return sortedFollowed
    }

    let sortItems
    if (listView === 'publications') {
        sortItems = sortPublications
    } else if (listView === 'followers') {
        sortItems = sortFollowers
    } else if (listView === 'followed') {
        sortItems = sortFollowed
    }

    const sortedItems = sortItems()

    let listToShow
    if (listView === 'publications') {
        listToShow = sortedItems.map(location => {
            return (
                <LocationItem
                    key={location._id}
                    searchName={searchName}
                    locationItem={location}
                    navigationDisabled={true}
                />
            )
        })
    } else if (listView === 'followers') {
        listToShow = sortedItems.map(follower => {
            return (
                <UserItem
                    key={follower._id}
                    searchName={searchName}
                    userItem={follower}
                    navigationDisabled={true}
                />
            )
        })
    } else if (listView === 'followed') {
        listToShow = sortedItems.map(followedUser => {
            return (
                <UserItem
                    key={followedUser._id}
                    searchName={searchName}
                    userItem={followedUser}
                    navigationDisabled={true}
                />
            )
        })
    }

    // const listToShow = (listView === 'publications')
    //     ? (
    //         <FlatList
    //             data={publications}
    //             renderItem={({ item: location }) => (
    //                 <LocationItem
    //                     searchName={searchName}
    //                     locationItem={location}
    //                     navigationDisabled={true}
    //                 />
    //             )}
    //         />
    //     )
    //     : (
    //         <FlatList
    //             data={followed}
    //             renderItem={({ item: friends }) => (
    //                 <UserItem
    //                     searchName={searchName}
    //                     userItem={friends}
    //                     navigationDisabled={true}
    //                 />
    //             )}
    //         />
    //     )

    const handleUnFollow = async () => {
        await axios.put(`${url}/unFollowUser`, {
            authId: token._id,
            followedId: userItem._id
        })
            .then(res => {
                console.log(res.data.result)
            })
        checkFollowedById()
    }

    const followButtonFunction = (authFriend)
        ? handleUnFollow
        : handleFollow
    
    const followButtonText = (authFriend)
        ? 'unfollow'
        : 'follow'

    return(
        <ScrollView>
            <View style={{
                marginTop: 30,
                marginHorizontal: 20
            }}>
            <View style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                marginBottom: 20
            }}>
                <Image source={{ uri: url + avatar }} style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: 'lightgrey'
                }} />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                 }}>
                    <TouchableOpacity
                        onPress={handlePublicationListButton}
                    >
                        <View style={styles.authButtons}>
                            <Text style={{ fontWeight: 'bold' }}>{publications.length}</Text>
                            <Text>publications</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleFollowersListButton}
                    >
                        <View style={styles.authButtons}>
                            <Text style={{ fontWeight: 'bold' }}>{followers.length}</Text>
                            <Text>followers</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleFollowedListButton}
                    >
                        <View style={styles.authButtons}>
                            <Text style={{ fontWeight: 'bold' }}>{followed.length}</Text>
                            <Text>followed</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                marginBottom: 20
            }}>
                <Text style={{fontSize: 25}}>{userItem.nickname}</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <AntDesign name="star" size={24} color="black" />
                    <Text>{rateLabel}</Text>
                </View>
            </View>
            <View style={{
                alignSelf: 'flex-start'
            }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'lightblue',
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        marginBottom: 10
                    }}
                    onPress={followButtonFunction}
                >
                    <Text style={{ fontSize: 20 }}>{followButtonText}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <View style={{
                        marginTop: 10,
                        marginHorizontal: '10%',
                        borderWidth: 1,
                        borderRadius: 15,
                        borderColor: 'lightgrey',
                        marginBottom: 20
                    }}>
                        <TextInput style={{
                            paddingVertical: 5,
                            paddingStart: 10,
                        }} placeholder="search" onChangeText={handleSearchName}></TextInput>
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
                            <Text>Older</Text>
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
                            <Text>Newer</Text>
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
            </View>
            {listToShow}
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    authButtons: {
        alignItems: 'center',
        marginHorizontal: 10
    },
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
        borderColor: 'lightgrey',
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
        borderWidth: 2,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center'
    }
})