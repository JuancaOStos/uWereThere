import React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Main from './components/Main/Main';
import Access from './components/Access/Access';
import AppProvider from './components/AppContext';
import i18n from './i18n/i18n';

// for dev DevCom

// TODO: documentar
export default function App() {
  const [auth, setAuth] = useState(null)
  const handleAuth = (value) => setAuth(value)
  const authComponent = (auth)
    ? <Main />
    : <Access />
  
  return (
    <NavigationContainer>
      <AppProvider auth={auth} handleAuth={handleAuth}>
        {authComponent}
      </AppProvider>
      <Toast />
    </NavigationContainer>
  );
}