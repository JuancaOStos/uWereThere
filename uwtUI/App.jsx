import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, Button, TurboModuleRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Main from './components/Main/Main';
import Access from './components/Access/Access';
import SignUpNavigation from './components/Access/SignUp/SignUpNavigation';

export default function App() {
  const [auth, setAuth] = useState('')
  const handleAuth = (value) => setAuth(value)
  const authComponent = (auth)
    ? <Main />
    : <Access auth={auth} handleAuth={handleAuth}/>

  return (
    <NavigationContainer>
      {authComponent}
    </NavigationContainer>
  );
}