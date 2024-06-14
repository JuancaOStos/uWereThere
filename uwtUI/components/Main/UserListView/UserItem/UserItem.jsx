import { useState, useEffect, useContext } from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { AppContext } from "../../../AppContext";
import { getAuthData } from "../../../../utils";
import { useTranslation } from "react-i18next";
import { url, USER_LOGO } from '../../../../constants'

// TODO: estilar
// TODO: documentar
export default function UserItem({ searchName, userItem, handleNavigation, navigationDisabled }) {
    const { t } = useTranslation()
    const { token, url } = useContext(AppContext)
    const [authData, setAuthData] = useState({
        _id: 0,
        email: '',
        nickname: '',
        avatar: '',
        averageRate: ''
    })
    console.log(authData.nickname + ' vs ' + userItem.nickname)
    console.log(userItem.avatar)

    const avatar = (userItem.avatar)
        ? userItem.avatar
        : USER_LOGO

    const parsedRate = (userItem.averageRate !== 0)
        ? userItem.averageRate
        : t('user_profile.not_rated')

    useEffect( () => {
        (async function() {
            const authData = await getAuthData(url, token._id)
            console.log('showing authData:', authData)
            setAuthData(authData)
        })()
    }, [])

    if (userItem.nickname.toLowerCase().includes(searchName.toLowerCase())
        && userItem.verified) {
        return(
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => {
                    handleNavigation(userItem)
                }}
                disabled={navigationDisabled}
            >
            <View style={{
                backgroundColor: 'lightgreen',
                marginVertical: 5,
                marginHorizontal: '15%',
                padding: 10,
                borderRadius: 15,
                borderWidth: 2,
                borderColor: 'lightblue'
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: url + avatar }}  style={{
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        backgroundColor: 'lightgrey'
                    }}/>
                    <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text style={{
                            fontSize: 15,
                            marginStart: 15
                        }}>{userItem.nickname}</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 5
                }}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <AntDesign name="star" size={24} color="black" />
                        <Text>{parsedRate}</Text>
                    </View>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Ionicons name="location-sharp" size={24} color="black" />
                        <Text>{userItem.publications.length}</Text>
                    </View>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <FontAwesome5 name="user-friends" size={24} color="black" />
                        <Text>{userItem.followed.length}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
        )
    } else {
        return <></>
    }
}