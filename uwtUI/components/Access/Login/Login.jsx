import { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, Button, View, Image } from 'react-native';
import axios from 'axios';
import { AppContext } from '../../AppContext';
import { URL } from '../../../constants';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { handleAuth } = useContext(AppContext)

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const handleEmail = (value) => {
    console.log(value)
    setEmail(value)
  }
  const handlePassword = (value) => setPassword(value)

  const handleLogin = () => {
    axios.post(`${URL}/login`, {
      email: email,
      password: password
    })
      .then(res => {
        const data = res.data
        setUserEmail(data.token)
        if (data.token) {
          setErrorMessage('')
          console.log(data.token)
          handleAuth(data.token)
        }
        else setErrorMessage('Invalid user')
        // handleAuth(data.result)
      })
      .catch(err => {
        alert('An error has occurred:\n' + err)
        console.error('An error has occurred:', err)
      })
  }
"/1717003028872_fe04d5fe-41d0-4aa9-8314-eefec0273ffa.jpeg"
  return (
    <View style={styles.container}>
      <Text>Welcome home!</Text>
      <TextInput style={styles.input} onChangeText={handleEmail} placeholder='email'/>
      <TextInput style={styles.input} onChangeText={handlePassword} placeholder='password'/>
      <Button
        onPress={handleLogin}
        title='Login'
      />
      <Text>{errorMessage}</Text>
      <Text>{userEmail}</Text>
    </View>
  );
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