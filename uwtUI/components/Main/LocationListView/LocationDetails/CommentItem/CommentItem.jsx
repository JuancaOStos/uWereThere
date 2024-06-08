import { View, Text, Image } from "react-native";
import { useContext } from "react";
import { AppContext } from "../../../../AppContext.jsx";
import { url } from "../../../../../constants.js";

// TODO: estilar
// TODO: documentar
export default function CommentItem({ commentItem }) {
    //  Podría servirme para estilar si el comentario es del autenticado
    const { authData, url } = useContext(AppContext)
    console.log(authData._id)
    console.log(commentItem.author._id)
    const commentAuth = (authData._id === commentItem.author._id)
        ? {
            flexDirection: 'row-reverse',
            alignSelf: 'flex-end',
            backgroundColor: 'lightblue',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 0,
        }
        : {
            flexDirection: 'row',
            alignSelf: 'flex-start',
            backgroundColor: 'lightgreen',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 20,
        }
    const avatar = (commentItem.author.avatar)
     ? commentItem.author.avatar
     : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
    return (
        <View style={{
            backgroundColor: commentAuth.backgroundColor,
            alignSelf: commentAuth.alignSelf,
            marginHorizontal: 20,
            marginVertical: 10,
            padding: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: commentAuth.borderBottomLeftRadius,
            borderBottomRightRadius: commentAuth.borderBottomRightRadius

        }}>
            <View style={{
                flexDirection: commentAuth.flexDirection,
                alignItems: 'center'
            }}>
                <Image source={{ uri: url + avatar }} style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    marginStart: 10
                }}/>
                <Text style={{
                    marginStart: 10
                }}>{commentItem.author.nickname}</Text>
            </View>
            <Text
                style={{
                    alignSelf: commentAuth.alignSelf
                }}
            >{commentItem.comment}</Text>
        </View>
    )
}