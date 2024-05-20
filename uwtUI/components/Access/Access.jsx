import React from "react";
import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

export default function Access({ auth, handleAuth }) {
    const [loginView, setLoginView] = useState(true)
    const testHandleLoginView = () => setLoginView(!loginView)
    const authComponent = (loginView)
        ? <Login auth={auth} handleAuth={handleAuth}/>
        : <SignUp />

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