import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { url, TOAST_MESSAGES } from "../../../../../constants";
import { AntDesign } from '@expo/vector-icons';
import { AppContext } from "../../../../AppContext";
import { getAuthData } from "../../../../../utils";
import { useTranslation } from "react-i18next";

// TODO: estilar
// TODO: documentar
export default function RatePanel({ locationItem }) {
    const { t } = useTranslation()
    const { token, url, translateToast } = useContext(AppContext)
    const [authData, setAuthData] = useState({
        nickname: ''
    })
    const [rate, setRate] = useState(0)
    const activeStars = []

    const getAuthRate = () => {
        console.log('SHOWING LOCATION RATES:', locationItem.rates)
        if (locationItem.rates) {
            let authRate = null
            authRate = locationItem.rates.find((rate) => rate.author === token._id)
            if (authRate) setRate(authRate.rate)
        }
    }

    useEffect(() => {
        (async () => {
            const authData = await getAuthData(url, token._id)
            setAuthData(authData)
        })()
    })

    useEffect(() => {
        getAuthRate()
    }, [])

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
            authId: token._id,
            authNickname: authData.nickname,
            rate: rate
        }
        console.log(newRate)
        await axios.post(url + '/addRate', newRate)
            .then(res => {
                console.log(res.data.result)
                getAuthRate()
                const translatedToast = translateToast(TOAST_MESSAGES.LOCATION_DETAILS.LOCATION_RATED, t)
                Toast.show(translatedToast)
            })
            .catch(err => console.error(err))
    }

    const getRate = async () => {

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
                    <Text>{t('buttons.rate')}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}