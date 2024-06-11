import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileSettingsView from "./ProfileSettingsView/ProfileSettingsView";
import ChangeNickname from "./ChangeNickname/ChangeNickname";
import ChangePassword from "./ChangePassword/ChangePassword";

const Stack = createStackNavigator()

export default function ProfileSettingsStack() {
    
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Group>
                <Stack.Screen name="ProfileSettingsView" component={ProfileSettingsView}/>
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="ChangeNickname" component={ChangeNickname}/>
                <Stack.Screen name="ChangePassword" component={ChangePassword}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}