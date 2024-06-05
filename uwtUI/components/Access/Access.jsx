import React from "react";
import { useContext } from "react";
import { Text, Button, StyleSheet } from "react-native";
import SignInStack from "./SignInStack/SignInStack";
import SignUpStack from "./SignUpStack/SignUpStack";
import { AppContext } from "../AppContext";

// TODO: documentar
export default function Access() {
    const { loginView, setLoginView } = useContext(AppContext)
    const testHandleLoginView = () => setLoginView(!loginView)
    const authComponent = (loginView)
        ? <SignInStack/>
        : <SignUpStack />

    return (
        <>
            <Text>Access View</Text>
            {authComponent}
            <Button
                onPress={testHandleLoginView}
                title="Login/SignUp"
            />
        </>
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