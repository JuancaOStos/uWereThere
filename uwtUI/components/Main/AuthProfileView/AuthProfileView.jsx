import react, { useContext } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { AppContext } from "../../AppContext";

export default function AuthProfileView() {
    const { authData } = useContext(AppContext)
    console.log(authData.nickname)
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
                <Text style={{fontSize: 25}}>{authData.nickname}</Text>
                <Text style={{fontSize: 15}}>{authData.email}</Text>
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