import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { View, Text, Button, TouchableOpacity, FlatList, ScrollView, TextInput, StyleSheet, Image } from "react-native";
import LocationItem from '../LocationListView/LocationItem/LocationItem.jsx'
import UserItem from '../UserListView/UserItem/UserItem.jsx'
import * as ImagePicker from 'expo-image-picker'
import { AntDesign } from '@expo/vector-icons';
import { AppContext } from "../../AppContext";
import { getAuthData } from "../../../utils.js";
import Toast from "react-native-toast-message";
import { url, TOAST_MESSAGES } from '../../../constants.js'
import { sortElements } from "../../../utils.js";

// TODO: estilar
// TODO: listar por más antiguos
// TODO: listar por más nuevos
// TODO: listar por mayor puntuación
// TODO: listar por menor puntuación
// TODO: cambiar FlatList por ScrollView
// TODO: validar caja de búsqueda
// TODO: documentar
export default function AuthProfileView() {
    const { token, url } = useContext(AppContext)
    const [searchName, setSearchName] = useState('')
    const [authData, setAuthData] = useState({
        _id: 0,
        email: '',
        nickname: '',
        avatar: '',
        averageRate: ''
    })
    const [rate, setRate] = useState(authData.averageRate)
    const [publications, setPublications] = useState([])
    const [followed, setFollowed] = useState([])
    const [followers, setFollowers] = useState([])
    const [listView, setListView] = useState('publications')
    const [sortData, setSortData] = useState({
        sortField: 'createdAt',
        sortDirection: 'desc'
    })
    console.log(authData.avatar)

    const handleSearchName = (value) => setSearchName(value)

    const rateLabel = (rate > 0)
        ? rate
        : 'Not rated yet'

    useEffect( () => {
        (async function() {
            const authData = await getAuthData(url, token._id)
            console.log('showing authData:', authData)
            setAuthData(authData)
        })()
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        let newAvatar
        if (!result.canceled) {
            const filenameArray = result.assets[0].fileName.split('.')
            const ext = filenameArray[filenameArray.length - 1]
            newAvatar = {
                uri: result.assets[0].uri,
                type: `${result.assets[0].type}/${ext}`,
                name: result.assets[0].fileName
            }
        } else {
            newAvatar = null
        }
        return newAvatar
    }

    const upload = async (avatar) => {
        let avatarUrl = null
        const formData = new FormData()
        formData.append('file', {
            uri: avatar.uri,
            type: avatar.type,
            name: avatar.name
        })
        await axios.post(`${url}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data.url)
                avatarUrl = res.data.url
            }) 
            .catch(err => {
                console.error('An error has occurred:\n' + err)
                return null
            })
            return avatarUrl
    }

    const changeAvatar = async () => {
        const selectedAvatar = await pickImage()
        if (selectedAvatar !== null) {
            const avatarUrl = await upload(selectedAvatar)
            await axios.put(url + '/changeAvatar', {
                _id: token._id,
                newAvatar: avatarUrl
            })
                .then(res => {
                    if (res.data.status === 'ok') {
                        Toast.show(TOAST_MESSAGES.USER_PROFILE.AVATAR_CHANGED)
                    } else if (res.data.status === 'error') {
                        Toast.show(TOAST_MESSAGES.UNEXPECTED_ERROR)
                    }
                })
        }


    }

    const getPublisAndFriends = async () => {
        await axios.post(`${url}/getPublicationsById`, {
            authId: token._id
        })
            .then(res => {
                console.log(res.data.result)
                setPublications(res.data.result.publications)
            })
            .catch(err => {
                console.error('An error has occurred getting publications of auth user:\n' + err)
            })
        
        await axios.post(`${url}/getFollowedAndFollowersById`, {
            authId: token._id
        })
            .then(res => {
                console.log(res.data.result)
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
                <TouchableOpacity
                    onPress={changeAvatar}
                >
                    <Image source={{ uri: url + authData.avatar }} style={{
                        width: 100,
                        height: 100,
                        borderRadius: 100,
                        backgroundColor: 'lightgrey'
                    }}/>
                </TouchableOpacity>
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
                <Text style={{fontSize: 25}}>{authData.nickname}</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <AntDesign name="star" size={24} color="black" />
                    <Text>{rateLabel}</Text>
                </View>
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
                {listToShow}
            </View>
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