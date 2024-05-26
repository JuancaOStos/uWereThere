import react from "react";
import { View, Text, TouchableHighlight, Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AntDesign } from '@expo/vector-icons';

export default function LocationItem({ searchTitle, author, authorAvatar, location, title, rates, distance  }) {
    const parsedRate = (rates) ? 0 : null

    if (title.toLowerCase().includes(searchTitle.toLowerCase())) {
        return(
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor={'#DDDDDD'}
                onPress={() => (
                    <Modal>
                        <Text>Hola</Text>
                    </Modal>
                )}
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
                        <Text style={{ marginEnd: 10 }} >{author}</Text>
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
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.09,
                                longitudeDelta: 0.04
                            }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                        >
                            <Marker
                                coordinate={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                    latitudeDelta: 0.09,
                                    longitudeDelta: 0.04
                                }}
                            />
                        </MapView>
                        <View style={{ marginStart: 25 }}>
                            <Text>{title}</Text>
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