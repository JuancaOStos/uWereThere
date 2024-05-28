import react from "react";
import { View, Text } from "react-native";

export default function CommentItem({ commentItem }) {
    
    return (
        <View style={{
            backgroundColor: 'lightgreen',
            marginHorizontal: 20,
            marginVertical: 10,
            padding: 10,
            borderRadius: 20

        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <View style={{
                    backgroundColor: 'red',
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    marginStart: 10
                }}></View>
                <Text style={{
                    marginStart: 10
                }}>{commentItem.author.nickname}</Text>
            </View>
            <Text>{commentItem.comment}</Text>
        </View>
    )
}