import React from "react";
import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, Button, StyleSheet } from "react-native";
import Login from "./Login/Login";
import EmailPasswordStage from "./EmailPasswordStage/EmailPasswordStage";
import NicknameAvatarStage from "./NicknameAvatarStage/NicknameAvatarStage";
import VerificationModal from './VerificationModal/VerificationModal'
import { AppContext } from "../AppContext";

const Stack = createStackNavigator()

// TODO: documentar
export default function Access() {
    const { loginView, setLoginView } = useContext(AppContext)
    const testHandleLoginView = () => setLoginView(!loginView)

    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="EmailPasswordStage" component={EmailPasswordStage} />
            <Stack.Screen name="NicknameAvatarStage" component={NicknameAvatarStage} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="VerificationModal" component={VerificationModal} />
          </Stack.Group>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
      margin: 10,
      padding: 10,
      height: 40,
      borderWidth: 2,
      borderRadius: 10,
      width: 250
    }
  });