import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from './Login/Login.jsx'
import VerificationSignUp from "../SignUpStack/VerificationSignUp/VerificationSignUp.jsx";

const Stack = createStackNavigator()

// TODO: estilar
// TODO: documentar
export default function SignInStack() {

    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='VerificationStage' component={VerificationSignUp} />
        </Stack.Navigator>
    )
}