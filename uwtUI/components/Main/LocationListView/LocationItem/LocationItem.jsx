import react, {useState} from "react";
import { View, Text, TouchableHighlight } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AntDesign } from '@expo/vector-icons';

export default function LocationItem({ searchTitle, locationItem, handleNavigation  }) {
    const authorNickname = (locationItem.author)
        ? locationItem.author.nickname
        : '-nickname-'
    const parsedRate = (locationItem.rates) ? 0 : null

    if (locationItem.title.toLowerCase().includes(searchTitle.toLowerCase())) {
        return(
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor={'#DDDDDD'}
                onPress={() => handleNavigation(locationItem)}
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
                        <View style={{
                            backgroundColor: 'red',
                            width: 30,
                            height: 30,
                            borderRadius: 50
                        }}></View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <MapView
                            style={{
                                width: 80,
                                height: 80
                            }}
                            region={{
                                latitude: locationItem.location.latitude,
                                longitude: locationItem.location.longitude,
                                latitudeDelta: 0.09,
                                longitudeDelta: 0.04
                            }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                        >
                            <Marker
                                coordinate={{
                                    latitude: locationItem.location.latitude,
                                    longitude: locationItem.location.longitude,
                                    latitudeDelta: 0.09,
                                    longitudeDelta: 0.04
                                }}
                            />
                        </MapView>
                        <View style={{ marginStart: 25 }}>
                            <Text>{locationItem.title}</Text>
                            <Text>distance</Text>
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