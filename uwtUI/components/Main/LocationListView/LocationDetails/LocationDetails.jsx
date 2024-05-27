import react from "react"
import { Text, View } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { AntDesign } from '@expo/vector-icons';

export default function LocationDetails({ route }) {
    const { locationItem } = route.params
    const parsedRate = (locationItem.rates.length !== 0)
        ? 'n'
        : 'Not rated yet'

    return(
        <>
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
                        <View style={{
                            backgroundColor: 'red',
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            marginLeft: 5
                        }}>
                        </View>
                    </View>
                </View>
                    <MapView
                        style={{
                            width: '100%',
                            height: '60%'
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
                    <Text>{locationItem.title}</Text>
                    <Text>{locationItem.description}</Text>
            </View>
        </>
    )
}