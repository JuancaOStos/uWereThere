import react from "react"
import { Text } from "react-native"

export default function LocationDetails({ route }) {
    const { locationItem } = route.params

    return(
        <>
            <Text>{locationItem.title}</Text>
            <Text>{locationItem.description}</Text>
            <Text>{locationItem.author.nickname}</Text>
        </>
    )
}