import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { View, Text, Button, TouchableOpacity, FlatList, TextInput, StyleSheet, Image } from "react-native";
import LocationItem from '../LocationListView/LocationItem/LocationItem.jsx'
import UserItem from '../UserListView/UserItem/UserItem.jsx'
import { AntDesign } from '@expo/vector-icons';
import { AppContext } from "../../AppContext";
import { url } from '../../../constants.js'

// TODO: estilar
// TODO: listar por más antiguos
// TODO: listar por más nuevos
// TODO: listar por mayor puntuación
// TODO: listar por menor puntuación
// TODO: cambiar FlatList por ScrollView
// TODO: validar caja de búsqueda
// TODO: documentar
export default function AuthProfileView() {
    const { authData, url } = useContext(AppContext)
    const [searchName, setSearchName] = useState('')
    const [rate, setRate] = useState(authData.averageRate)
    const [publications, setPublications] = useState([])
    const [friends, setFriends] = useState([])
    const [listView, setListView] = useState('publications')
    console.log(authData.avatar)
    console.error('url + AVATAR' + url + authData.avatar)

    const handleSearchName = (value) => setSearchName(value)

    const rateLabel = (rate > 0)
        ? rate
        : 'Not rates yet'

    const getPublisAndFriends = async () => {
        await axios.post(`${url}/getPublicationsById`, {
            authId: authData._id
        })
            .then(res => {
                console.log(res.data.result)
                setPublications(res.data.result.publications)
            })
            .catch(err => {
                console.error('An error has occurred getting publications of auth user:\n' + err)
            })
        
        await axios.post(`${url}/getFriendsById`, {
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
            marginTop: 30,
            marginHorizontal: 20
        }}>
            <View style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                marginBottom: 20
            }}>
                <Image source={{ uri: url + authData.avatar }} style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    backgroundColor: 'lightgrey'
                }}/>
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
                        onPress={handleFriendListButton}
                    >
                        <View style={styles.authButtons}>
                            <Text style={{ fontWeight: 'bold' }}>0</Text>
                            <Text>followers</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handlePublicationListButton}
                    >
                        <View style={styles.authButtons}>
                            <Text style={{ fontWeight: 'bold' }}>{friends.length}</Text>
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
                            onPress={() => {}}
                        >
                        <View >
                            <Text>Older</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => {}}
                    >
                        <View>
                            <Text>Newer</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => {}}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign name="star" size={24} color="black" />
                            <AntDesign name="arrowup" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => {}}
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
        </>
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