import { View, Text, Image } from "react-native";
// import { useContext } from "react";
import { AppContext } from "../../../../AppContext.jsx";
import { URL } from "../../../../../constants.js";

// TODO: estilar
// TODO: documentar
export default function CommentItem({ commentItem }) {
    // const { authData } = useContext(AppContext) -> podría servirme para estilar si el comentario es del autenticado
    const avatar = (commentItem.author.avatar)
     ? commentItem.author.avatar
     : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
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
                <Image source={{ uri: URL + avatar }} style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    marginStart: 10
                }}/>
                <Text style={{
                    marginStart: 10
                }}>{commentItem.author.nickname}</Text>
            </View>
            <Text>{commentItem.comment}</Text>
        </View>
    )
}