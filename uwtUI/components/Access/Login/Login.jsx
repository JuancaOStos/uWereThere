import { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, Button, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FontAwesome6 } from '@expo/vector-icons';
import { AppContext } from '../../AppContext';
import { URL } from '../../../constants.js';

// TODO: estilar
// TODO: validar
// TODO: añadir 'He olvidado la contraseña'
// TODO: documentar
export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { handleAuth, setLoginView, handleUrl, url } = useContext(AppContext)


  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const handleEmail = (value) => {
    console.log(value)
    setEmail(value)
  }
  const handlePassword = (value) => setPassword(value)

  const checkVerifiedAccount = async () => {
    let verifiedUser = false
    await axios.post(url + '/userByEmail', {
      email: email
    })
      .then(res => {
        verifiedUser = res.data.result.verified
      })
      .catch(err => {
        console.error('Error:', err)
      })
    return verifiedUser
  }

  const handleLogin = () => {
    axios.post(`${url}/login`, {
      email: email,
      password: password
    })
      .then(res => {
        setUserEmail(res.data.token)
        if (res.data.status === 'ok') {
          setErrorMessage('')
          // console.log(res.data.token)
          handleAuth(res.data.token)
        }
        else {
          if (res.data.result === 'Password doesn\'t match') {
            setErrorMessage(res.data.result)
          }
          if (res.data.result === 'User not verified') {
            navigation.navigate('VerificationModal', {
              fromScreen: 'Login',
              email: email
            })
          }
        }
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
      <View style={{ flexDirection: 'row' }}>
        <Text style={{
          fontSize: 50
        }}>u</Text>
        <Text style={{
          fontSize: 50,
          color: 'lightgreen'
        }}>Were</Text>
        <Text style={{
          fontSize: 50,
          color: 'lightblue'
        }}>There</Text>
      </View>
      <View style={{ marginBottom: 50 }}>
        <FontAwesome6 name="map-location" size={250} color="lightgreen" />
      </View>
      <Text>Sección solo para desarrollo</Text>
      <TextInput style={styles.input} onChangeText={handleUrl} keyboardType='numeric' placeholder='Introduce tu dirección IPv4'/>
      <Text style={{ marginBottom: 30 }} >{url}</Text>
      <TextInput style={styles.input} onChangeText={handleEmail} placeholder='email'/>
      <TextInput style={styles.input} onChangeText={handlePassword} placeholder='password'/>
      <TouchableOpacity
        style={{
          backgroundColor: 'lightblue',
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 5,
          marginBottom: 10
        }}
        onPress={handleLogin}
      >
        <Text style={{ fontSize: 20 }}>Log in</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginRight: 10, fontSize: 20 }}>Do you want join us?</Text>
        <TouchableOpacity
          onPress={() => { navigation.navigate('EmailPasswordStage') }}
        >
          <Text style={{ color: 'green', fontSize: 20 }}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={{ color: 'green', marginTop: 10, fontSize: 17 }}>I forgot my password</Text>
      </TouchableOpacity>
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
      fontSize: 17,
      margin: 10,
      padding: 10,
      height: 40,
      borderWidth: 2,
      borderRadius: 10,
      width: 250
    }
  });