import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { StatusBar } from 'expo-status-bar';
import firestore from '@react-native-firebase/firestore'
import { addConfirmation, addPhoneNo, addUsername } from "../store/signupSlice";
import auth from '@react-native-firebase/auth'
import { useDispatch } from "react-redux";

const window = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};
const Login = ({ navigation }) => {
  const [phone_no, setPhone_no] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  //function for sending otp
  const signInWithPhoneNumber = async(phoneNumber) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    dispatch(addConfirmation(confirmation))
    setLoading(false)
    navigation.navigate('LoginOtp')
  }
const sendOtp = async ()=>{
    if(phone_no.length == 10){
        setLoading(true)
        try {
            firestore()
            .collection('user_profile_data')
            .where('phone_number', '==', phone_no)
            .get()
            .then(quarySnapshot =>{
                const size = quarySnapshot.size;
                if(size){
                    quarySnapshot.forEach(documentSnapshot =>{
                        const username = documentSnapshot.data().username;
                        
                        console.log(username)
                        dispatch(addUsername(username))
                    })
                    signInWithPhoneNumber('+91'+phone_no)
                } else{
                    Alert.alert("Error", "You Don't have an account")
                    setLoading(false)
                }
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        
    } else{
        Alert.alert("Error", "Please enter your complete number")
    }

}


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: "#fff", fontSize: 30 }}>Welcome Back</Text>
              <Text style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: 25 }}>Log in to your existing account</Text>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.inputtwoline}>
                    <TextInput
                        value="+91"
                    />
                    <TextInput 
                        value={phone_no}
                        onChangeText={(val)=>{
                            setPhone_no(val)
                            dispatch(addPhoneNo(val))
                        }}
                        label="Enter Phone"
                        style={{width: window.width * 0.65}}
                        maxLength={10}
                        keyboardType="numeric"
                    />
              </View>
              <Text style={{color: '#fff', marginHorizontal: window.width*0.1, marginTop: window.height*0.03}}>
                  By continuing, you agree to TradBud’s 
                  <Text style={{color: '#2C97FA'}} onPress={()=>{navigation.navigate('Terms')}} > Terms of use & Privacy Policy </Text>
                  
              </Text>
          </View>

          <View style={{
              display: 'flex',
              alignItems: 'center', justifyContent: 'center'
          }}>
              {loading ? (
                <TouchableOpacity
                style={styles.btn1}
                mode="outlined"
                buttonColor="#380AFF"
                textColor="white"
                onPress={sendOtp}
            >
                <ActivityIndicator size={'small'} color="black" />
            </TouchableOpacity>
              ) : (
                <TouchableOpacity
                style={styles.btn1}
                mode="outlined"
                buttonColor="#380AFF"
                textColor="white"
                onPress={sendOtp}
            >
                <Text style={styles.btntext}>CONTINUE </Text>
            </TouchableOpacity>
              )}
          </View>
      </SafeAreaView>
      </SafeAreaProvider>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.9)",

      height: window.height * 1,
      paddingTop: window.height * 0.09,
      // paddingHorizontal: window.height * 0.1,

  },
  inputtwoline: {
      width: window.width * 0.85,
      marginTop: window.width * 0.2,
      flexDirection: "row",
      justifyContent: "space-around",
  },
  inputfixed: {
      width: window.width * 0.17,
      textAlign: "center"
  },
  inputvariable: {
      width: window.width * 0.6,
  },

  input1: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: window.width * 0.1,
  },
  btn1: {
      marginTop: window.width * 0.15,
      width: window.width * 0.8,
      height: window.width * 0.15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: 30,
      textColor: "white",
  },
  btntext: {
      color: "black",
      fontSize: 25,
      fontWeight: '500'
  },
  inputtext: {
      justifyContent: "center",
      alignItems: "center",
      fontSize: 13,
      marginHorizontal: window.width * 0.1,
      marginTop: window.width * 0.02,
      textAlign: 'center',
      marginBottom: window.width * 0.05,
      width: window.width * 0.65,
      color: "white"
  },



})