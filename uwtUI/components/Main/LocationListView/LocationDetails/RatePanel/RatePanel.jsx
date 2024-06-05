import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { URL } from "../../../../../constants";
import { AntDesign } from '@expo/vector-icons';
import { AppContext } from "../../../../AppContext";

// TODO: estilar
// TODO: documentar
export default function RatePanel({ locationItem }) {
    const { authData } = useContext(AppContext)
    const [rate, setRate] = useState(0)
    const activeStars = []

    for (let i = 0; i < 5; i++) {
        const color = (i < rate) ? true : false
        activeStars.push(color)
    }

    const rateButtonColor = (rate !== 0)
        ? 'lightblue'
        : 'lightgrey'
    
    const ratePublication = async () => {
        const newRate = {
            publicationId: locationItem._id,
            author: authData._id,
            rate: rate
        }
        console.log(newRate)
        await axios.post(URL + '/addRate', newRate)
            .then(res => console.log(res.data.result))
            .catch(err => console.error(err))
    }

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginBottom: 15,
            borderWidth: 1,
            borderRadius: 15
        }}>
            {
                activeStars.map((star, index) => {
                    const color = (star) ? 'orange' : 'black'
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                setRate(index + 1)
                            }}
                        >
                            <AntDesign name="star" size={30} color={color} />
                        </TouchableOpacity>
                    )
                })
            }
            <TouchableOpacity
                disabled={rate === 0}
                onPress={ratePublication}
            >
                <View style={{
                    backgroundColor: rateButtonColor,
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    borderRadius: 10,
                    marginLeft: 10

                }}>
                    <Text>Rate</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}