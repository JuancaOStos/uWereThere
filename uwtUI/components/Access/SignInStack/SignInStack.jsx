import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from './Login/Login.jsx'
import VerificationStage from "../SignUpStack/VerificationStage/VerificationStage.jsx";

const Stack = createStackNavigator()

export default function SignInStack() {

    return(
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='VerificationStage' component={VerificationStage} />
        </Stack.Navigator>
    )
}