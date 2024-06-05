import { useContext, useEffect, useState } from "react"
import { Text, View, TextInput, ScrollView, StyleSheet, TouchableOpacity, Button, Image, Linking } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import RatePanel from "./RatePanel/RatePanel.jsx";
import CommentItem from "./CommentItem/CommentItem";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { URL } from '../../../../constants.js';
import { AppContext } from "../../../AppContext.jsx";
import axios from 'axios';

// TODO: estilar
// TODO: mostrar total de comentarios
// TODO: limpiar
// TODO: documentar
export default function LocationDetails({ route }) {
    const { authData } = useContext(AppContext)
    const { locationItem } = route.params
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    console.log(locationItem)
    const avatar = (locationItem.author.avatar)
        ? locationItem.author.avatar
        : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'

    const handleNewComment = (value) => setNewComment(value)

    
    const handleNewCommentButton = async() => {
        await axios.put(`${URL}/addNewComment`, {
            publicationId: locationItem._id,
            authId: authData._id,
            comment: newComment
        })
        getAllComments()
        setNewComment('')
    }
    
    const getAllComments = async() => {
        await axios.post(`${URL}/getCommentsById`, {
            publicationId: locationItem._id
        })
            .then(res => {
                console.log(res.data.result.comments)
                setComments(res.data.result.comments)
            })
            .catch(err => {
                console.error('An error has occurred:\n' + err)
            })
    }

    console.log(`${locationItem.author._id} vs ${authData._id}`)

    useEffect(() => {
        getAllComments()
    }, [])

    const parsedRate = (locationItem.rates.length !== 0)
        ? locationItem.averageRate
        : 'Not rated yet'

    return(
        <>
            <ScrollView>
            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    marginHorizontal: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <AntDesign style={{ marginRight: 5 }} name="star" size={24} color="black" />
                        <Text>{parsedRate}</Text>
                        
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text>{locationItem.author.nickname}</Text>
                        <Image source={{ uri: URL + locationItem.author.avatar }}  style={{
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            marginLeft: 5,
                            backgroundColor: 'lightgrey'
                        }}/>
                    </View>
                </View>
                    
                    <Text style={styles.headerText}>{locationItem.title}</Text>
                    <Image
                    style={{
                        width: 350,
                        height: 250,
                        alignSelf: 'center',
                        borderRadius: 50,
                        borderColor: 'black',
                        borderWidth: 5,
                        maxWidth: 350,
                        maxHeight: 250
                    }}
                    source={{ uri: URL + locationItem.pic}}/>
                    <Text style={styles.bodyText}>{locationItem.description}añlsdkfjañlsdfkjañsdlkfjasñdlfkjasdñfasñldfjañsldkfjasdñlfkjasdñlkfjlkjasdñflkajsdñflk</Text>
                    {(locationItem.author._id !== authData._id) && <RatePanel locationItem={locationItem}/>}
                    <Text style={styles.bodyText}>Link to Maps</Text>
                    <TouchableOpacity
                        style={styles.mapsButton}

                        onPress={() => {
                            Linking.canOpenURL(`geo:0,0?q=${locationItem.location.latitude},${locationItem.location.longitude}(${locationItem.title})`)
                                .then((supported) => {
                                    if (supported) {
                                        Linking.openURL(`geo:$0,0?q=${locationItem.location.latitude},${locationItem.location.longitude}(${locationItem.title})`)
                                    } else {
                                        Alert.alert('Error')
                                    }
                                })
                                .catch(err => Alert.alert('Error'))
                        }}
                        disabled={(!locationItem.title)}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ alignSelf: 'center', alignItems: 'flex-start' }}>
                                <MaterialCommunityIcons name="google-maps" size={40} color="black" />
                            </View>
                            <Text style={{ alignSelf: 'center', marginRight: 10 }}>{locationItem.title}</Text>
                            <View>
                                <Text>lat:{locationItem.location.latitude}</Text>
                                <Text>lon:{locationItem.location.longitude}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.bodyText}>Comments ({locationItem.comments.length})</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                        marginHorizontal: '10%',
                    }}>
                        <TextInput style={{
                            flex: 1,
                            borderWidth: 1,
                            borderRadius: 25,
                            paddingHorizontal: 10,
                            marginRight: 10,
                            borderColor: 'lightgrey' 
                        }} placeholder="search"
                        value={newComment}
                        onChangeText={handleNewComment}
                        multiline
                        />
                        <TouchableOpacity
                            onPress={handleNewCommentButton}
                        >
                            <Feather name="send" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    {
                        comments.map(comment => {
                            return (
                                <CommentItem 
                                    key={comment._id}
                                    commentItem={comment}
                                />
                            )
                        })
                    }
            </View>
            </ScrollView>
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
    },
    headerText: {
        fontSize: 25,
        marginHorizontal: 10,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    bodyText: {
        fontSize: 20,
        marginVertical: 15,
        marginHorizontal: 25
    },
    textBox: {
        margin: 10,
        padding: 10,
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        width: 250
    },
    mapsButton: {
        borderWidth: 1,
        alignSelf: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: 350,
        borderRadius: 20,
        backgroundColor: '#8BEF7F'
    }
})