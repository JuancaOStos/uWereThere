import { useContext } from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { url } from "../../../../constants";
import { AppContext } from "../../../AppContext";

// NO SE USA AUTHDATA
// TODO: estilar
// TODO: mostrar total de comentarios
// TODO: limpiar
// TODO: documentar
export default function LocationItem({ searchName, locationItem, handleNavigation, navigationDisabled  }) {
    const { t } = useTranslation()
    const { url } = useContext(AppContext)
    const authorNickname = (locationItem.author)
        ? locationItem.author.nickname
        : '-nickname-'
    const parsedRate = (locationItem.averageRate) ? locationItem.averageRate : t('user_profile.not_rated')
    const avatar = (locationItem.author.avatar)
        ? locationItem.author.avatar
        : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
    console.info(url + locationItem.author.avatar)
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
                        <Image source={{ uri: url + locationItem.author.avatar }} style={{
                            backgroundColor: 'lightgrey',
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                            marginRight: 10
                        }}/>
                        <Text>{authorNickname}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 20,
                                borderColor: 'black'
                            }}
                            source={{ uri: url + locationItem.pic}}/>
                        <View style={{ marginStart: 25 }}>
                            <Text>{locationItem.title}</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <AntDesign style={{ marginRight: 5 }} name="star" size={24} color="black" />
                                <Text>{parsedRate}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Foundation style={{ marginRight: 5 }} name="comments" size={24} color="black" />
                                <Text>{locationItem.comments.length}</Text>
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