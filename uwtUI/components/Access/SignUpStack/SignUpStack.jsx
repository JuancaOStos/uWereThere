import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EmailPasswordStage from "./EmailPasswordStage/EmailPasswordStage";
import VerificationSignUp from "./VerificationSignUp/VerificationSignUp";
import NicknameAvatarStage from "./NicknameAvatarStage/NicknameAvatarStage";

const Stack = createStackNavigator()

// TODO: estilar
// TODO: documentar
export default function SignUpStack() {

    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="EmailPasswordStage" component={EmailPasswordStage} />
        <Stack.Screen name="NicknameAvatarStage" component={NicknameAvatarStage} />
        <Stack.Screen name="VerificationStage" component={VerificationSignUp} />
      </Stack.Navigator>
    )
}
