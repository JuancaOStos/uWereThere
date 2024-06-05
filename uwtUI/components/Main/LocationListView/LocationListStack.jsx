import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocationListView from "./LocationListView";
import LocationDetails from "./LocationDetails/LocationDetails";

const Stack = createNativeStackNavigator()

// TODO: documentar
export default function LocationListStack() {
    return (
        <Stack.Navigator
            initialRouteName="LocationListView"
        >
            <Stack.Screen name="LocationListView" component={LocationListView} options={{ headerShown: false }}/>
            <Stack.Screen name="LocationDetails" component={LocationDetails} options={{ headerTitle: '' }}/>
        </Stack.Navigator>
    )
}