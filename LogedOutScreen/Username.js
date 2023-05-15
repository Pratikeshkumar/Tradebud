import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import {ActivityIndicator, TextInput} from 'react-native-paper'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { addProfilePictureNameLink, addUsername } from '../store/signupSlice';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { save } from '../GlobalFunction';
import { setLogined } from '../store/authSlice';



const window = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

const Username = ({navigation}) => {
  const [error, setError] = useState(false)
  const [usernameTextTypeError, setUsernameTextTypeError] = useState(false)
  const [loading, setloading] = useState(false)
  const [editable, setEditable] = useState(true)
  const dispatch = useDispatch();
  const signup = useSelector((state)=>state.signup)
  const {firstName, lastName, email, phoneNo, profile_picture, image, profile_picture_link } = signup;
  const [username, setUsername] = useState()


const storeUser = async ()=>{
  setloading(true)
  setEditable(false)
  const time_of_creation = new Date().getTime()
  try {
    firestore()
    .collection('user_profile_data')
    .doc(username)
    .set({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNo,
      profile_picture: profile_picture_link,
      username: username,
      timestamp: time_of_creation,
      followers: [],
      followings: [],
      about_us: '',
      purchased_post: []
    }).then(()=>{
      save('username', username)
      dispatch(setLogined(true))
      setloading(false)
    })
  } catch (error) {
    console.log(error)
  }    

}

//function for checking the username exist or not
const checkUsername = async (username)=>{
  if(username.length >= 6){
    try {
      firestore()
      .collection('user_profile_data')
      .where('username', '==', username)
      .get()
      .then(quarySnapshot => {
        const size = quarySnapshot.size;
        if(size){
          setError(true)
        } else{
          setError(false)
        }
      })
      
    } catch (error) {
      console.log(error)
    }
  }
}
// function for handling only alphanumeric character for username

const handleTextInput = (text)=>{
  const regex = /^[a-zA-Z0-9_]*$/;
  if (regex.test(text)) {
    setUsername(text.toLowerCase());
    checkUsername(text)
    setUsernameTextTypeError(false)

  } else{
    setUsernameTextTypeError(true)
  }
}







  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.containers}>
        <View style={styles.header}>
            <Text style={{
              color: 'white',
              fontSize: 30,
              fontWeight: '600'
            }}>
              Create Username
            </Text>
            <Image 
              style={{width: window.width * 0.9, height: window.height * 0.5}}
              source={require('../assets/bluephone_home.png')}
            />
        </View>
        <View style={styles.innerContainers}>
        {error && <Text style={{color: 'red'}}>username already exist</Text>}
          {usernameTextTypeError && <Text style={{color: 'red'}}>only alphanumeric and underscore are allowed</Text>}

        <TextInput
            style={styles.email}
            label="Username"
            theme={{ colors: { primary: "black" } }}
            outlineStyle={{ borderRadius: 10 }}
            mode="flat"
            value={username}
            onChangeText={(val)=>{
              handleTextInput(val)
              // checkUsername(val.toLowerCase())
              // setUsername(val.toLocaleLowerCase())
              }}
            maxLength={35}
            editable={editable}
            
          />
          
          {loading ? (
            <TouchableOpacity 
           style={styles.button}>
            <ActivityIndicator size='small' color='black' />
          </TouchableOpacity>
          ) : (
            <TouchableOpacity 
           onPress={()=>{
            if(username && username.length >= 6 && !error){
              storeUser()
            }else{
              Alert.alert("Error", "Make sure you username is greater than 6 character")
            }
           }}
           style={styles.button}>
            <Text style={{
              fontSize: 20,
              fontWeight: '600'
              
            }}>CONFIRM</Text>
          </TouchableOpacity>
          )}
        </View>

        <StatusBar style='light' backgroundColor='black' />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Username

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    width: window.width * 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    width: window.width * 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: window.height * 0.02
  },
  innerContainers: {
    width: window.width * 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: window.width * 0.1
  },
  email: {
    width: window.width * 0.9,
    marginVertical: window.height * 0.01
  },
  button: {
    width: window.width * 0.9,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginVertical: window.width * 0.04
  }
})