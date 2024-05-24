import react, { useContext } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { AppContext } from "../../AppContext";

export default function UserProfileView() {
    const { userData } = useContext(AppContext)
    console.log(userData.nickname)
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
                <Text style={{fontSize: 25}}>{userData.nickname}</Text>
                <Text style={{fontSize: 15}}>{userData.email}</Text>
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