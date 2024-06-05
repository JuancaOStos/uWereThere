import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserListView from "./UserListView";
import UserProfileView from "./UserProfileView/UserProfileView";

const Stack = createNativeStackNavigator()

// TODO: estilar
// TODO: documentar
export default function UserListStack() {

    return (
        <Stack.Navigator
            initialRouteName="UsersList"
        >
            <Stack.Screen name="UsersList" component={UserListView} options={{ headerShown: false }}/>
            <Stack.Screen name="UserProfileView" component={UserProfileView} options={{ headerTitle: ''}}/>
        </Stack.Navigator>
    )
}