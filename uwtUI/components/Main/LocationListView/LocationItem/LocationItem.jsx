import react, {useState} from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { URL } from "../../../../constants";

export default function LocationItem({ searchName, locationItem, handleNavigation, navigationDisabled  }) {
    const authorNickname = (locationItem.author)
        ? locationItem.author.nickname
        : '-nickname-'
    const parsedRate = (locationItem.averageRate) ? locationItem.averageRate : 'Not rated'
    const avatar = (locationItem.author.avatar)
        ? locationItem.author.avatar
        : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'

    console.info(locationItem)
    if (locationItem.title.toLowerCase().includes(searchName.toLowerCase())) {
        return(
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor={'#DDDDDD'}
                onPress={() => handleNavigation(locationItem)}
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
                    <View style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                    }}>
                        <Text style={{ marginEnd: 10 }} >{authorNickname}</Text>
                        <Image source={{ uri: URL + avatar}} style={{
                            backgroundColor: 'lightgrey',
                            width: 30,
                            height: 30,
                            borderRadius: 50
                        }}/>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        
                        <Image
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 20,
                                borderColor: 'black'
                            }}
                            source={{ uri: URL + locationItem.pic}}/>
                        <View style={{ marginStart: 25 }}>
                            <Text>{locationItem.title}</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <AntDesign name="star" size={24} color="black" />
                                <Text>{parsedRate}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    } else {
        return <></>
    }
}