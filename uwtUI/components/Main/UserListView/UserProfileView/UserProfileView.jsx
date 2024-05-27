import react, { useState, useEffect, useContext } from "react";
import { View, Text, Button, FlatList } from "react-native";
import axios from "axios";
import { URL } from '../../../../constants.js'
import { AppContext } from "../../../AppContext";
import { AntDesign } from '@expo/vector-icons';

export default function UserProfileView({ route }) {
    const { authData } = useContext(AppContext)
    const { userItem } = route.params
    const [authFriend, setAuthFriend] = useState(false)
    console.log(userItem)
    console.log(authData._id)

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
                />
                <Button
                    title="n friends"
                />
            </View>
            <View>
                <FlatList />
            </View>
        </View>
        </>
    )
}