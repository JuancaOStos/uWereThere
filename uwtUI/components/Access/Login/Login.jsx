import { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import axios from 'axios';

export default function Login({ auth, handleAuth }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const handleEmail = (value) => {
    console.log(value)
    setEmail(value)
  }
  const handlePassword = (value) => setPassword(value)

  const handleLogin = () => {
    axios.post('http://192.168.1.26:3000/login', {
      email: email,
      password: password
    })
      .then(res => {
        console.log(res.data)
        const data = res.data
        setUserEmail(data.result)
        if (data.result) setErrorMessage('')
        else setErrorMessage('Invalid user')
        handleAuth(data.result)
      })
      .catch(err => {
        console.error('An error has occurred:', err)
      })
  }

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