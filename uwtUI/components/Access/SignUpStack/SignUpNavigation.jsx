import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import EmailPasswordStage from "./EmailPasswordStage/EmailPasswordStage";
import VerificationStage from "./VerificationStage/VerificationStage";
import NicknameAvatarStage from "./NicknameAvatarStage/NicknameAvatarStage";

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export default function SignUpNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="EmailPasswordStage" component={EmailPasswordStage} />
            <Stack.Screen name="VerificationStage" component={VerificationStage} />
            <Stack.Screen name="ConfirmationStage" component={NicknameAvatarStage} />
        </Stack.Navigator>
    )
}