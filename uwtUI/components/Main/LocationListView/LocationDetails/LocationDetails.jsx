import react, { useContext, useEffect, useState } from "react"
import { Text, View, FlatList, TextInput, ScrollView, Button, Image, Linking } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import CommentItem from "./CommentItem/CommentItem";
import { URL } from '../../../../constants.js';
import { AppContext } from "../../../AppContext.jsx";
import axios from 'axios';

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

    useEffect(() => {
        getAllComments()
    }, [])

    const parsedRate = (locationItem.rates.length !== 0)
        ? 'n'
        : 'Not rated yet'

    return(
        <>
            <ScrollView>
            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
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
                        <Image source={{ uri: locationItem.author.avatar }}  style={{
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            marginLeft: 5
                        }}/>
                    </View>
                </View>
                    
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
                    source={{ uri: locationItem.pic}}/>
                    <Text>{locationItem.title}</Text>
                    <Text>Description</Text>
                    <Text>{locationItem.description}</Text>
                    <Text>Rate the pub</Text>
                    <Button 
                        title="Redirect to Maps"
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
                    />
                    <Text>Comments</Text>
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
                        }} placeholder="search"
                        value={newComment}
                        onChangeText={handleNewComment}></TextInput>
                    </View>
                    <Button
                        title='Send'
                        onPress={handleNewCommentButton}
                        disabled={(!newComment)}
                    />
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