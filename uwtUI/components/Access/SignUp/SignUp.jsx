import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from 'expo-status-bar';
import SignUpNavigation from "./SignUpNavigation";

export default function SignUp() {
    // const [stage, setStage] = useState(1)

    // const nextStage = () => {
    //     setStage(stage++)
    // }
    // const previousStage = (value) => {
    //     setStage(stage--)
    // } 

    // const stageComponent = (stage === 1)
    //     ? <EmailPasswordStage handleStage={handleStage} />
    //     : (stage === 2)
    //         ? <VerificationStage handleStage={handleStage} />
    //         : <ConfirmationStage handleStage={handleStage} />
    // let stageComponent
    // switch(stage) {
    //     case 1: {
    //         stageComponent = <EmailPasswordStage nextStage={nextStage} />
    //         break
    //     }
    //     case 2: {
    //         stageComponent = <VerificationStage previousStage={previousStage} nextStage={nextStage} />
    //         break
    //     }
    //     case 3: {
    //         stageComponent = <ConfirmationStage previousStage={previousStage} />
    //         break
    //     }
    // }
    

    return (
        <SignUpNavigation />
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