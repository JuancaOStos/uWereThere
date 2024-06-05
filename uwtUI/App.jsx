import React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './components/Main/Main';
import Access from './components/Access/Access';
import AppProvider from './components/AppContext';

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
    </NavigationContainer>
  );
}