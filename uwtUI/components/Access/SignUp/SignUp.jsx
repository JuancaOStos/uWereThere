import React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import EmailPasswordStage from "./EmailPasswordStage/EmailPasswordStage";
import VerificationStage from "./VerificationStage/VerificationStage";
import ConfirmationStage from "./ConfirmationStage/ConfirmationStage";

const Stack = createStackNavigator()


export default function SignUp() {

    return (
      <Stack.Navigator>
        <Stack.Screen name="EmailPasswordStage" component={EmailPasswordStage} />
        <Stack.Screen name="VerificationStage" component={VerificationStage} />
        <Stack.Screen name="ConfirmationStage" component={ConfirmationStage} />
      </Stack.Navigator>
    )
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     input: {
//       margin: 10,
//       padding: 10,
//       height: 40,
//       borderWidth: 2,
//       borderRadius: 10,
//       width: 250
//     }
//   });
