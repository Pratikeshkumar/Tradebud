import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import {  ActivityIndicator, Button } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { save, signInWithPhoneNumber } from "../GlobalFunction";
import { setLogined } from "../store/authSlice";
import { addConfirmation } from "../store/signupSlice";

const window = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

function LoginOtp({ navigation }) {
  const dispatch = useDispatch()
  const signup = useSelector((state)=>state.signup)
  const phoneNo = signup.phoneNo;
  const confirm = signup.confirm;
  const [code, setcode] = useState('')
  const [loading, setLoading] =  useState(false)
  const auth = useSelector((state)=>state.auth)
  const login = auth.login;
  const username = signup.username;

//function for confirming code 
async function confirmCode() {
  if(code.length == 6){
    setLoading(true)
    try {
      await confirm.confirm(code);
      save('username', username)
      dispatch(setLogined(true))
      setLoading(false)
    } catch (error) {
      Alert.alert("Error", "Invalid code");
      setLoading(false)
    }
  } else{
    Alert.alert("Error", 'Enter Your Code')
  }
}

// function for calling resending one time password
const callOtp = async (phoneNumber)=>{
  const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  dispatch(addConfirmation(confirmation))
  Alert.alert("Success", "OTP SENDED")
}

  return (
    <SafeAreaProvider>
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      height: window.height * 1
    }}>
      <View style={styles.container}>
<Image source={require('../assets/bluetick.png')}  style={{marginTop:window.width*0.5,height:window.width*0.1,width:window.width*0.1}} />
        <Text style={styles.authentication}>Enter authentication code</Text>

        <Text style={styles.code}>
          Enter the 6-digit OTP sent to phone number + 91 {phoneNo}
        </Text>

        <View style={{
          width: window.width * 0.6,
          borderBottomWidth: 1,
          borderBottomColor: 'white',
          alignItems: 'center',
          color: 'white',
          justifyContent: 'center',
          marginTop: window.height * 0.04,
          marginBottom: window.height * 0.02,
         
        }}>
          <TextInput
            placeholder=".  .  .  .  .  ."
            value={code}
            placeholderTextColor={"white"}
            keyboardType='numeric'
            maxLength={6}
            onChangeText={(val)=>{setcode(val)}}
            style={{
              color: 'white',
              fontSize: 30,
              letterSpacing: 5,
              backgroundColor: 'black',
              paddingLeft: 20,
              padding: 10,
              borderWidth: 0.3,
              borderColor: 'black',
              borderRadius: 2
            
              
            }}
          />
        </View>

        <View style={{
          marginTop: window.height * 0.02
        }}>
    </View>
        {loading ? (
          <TouchableOpacity
          style={{
            width: window.width * 0.6,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: window.width * 0.25,
            padding: 12
          }} 
        >
          <ActivityIndicator size={"small"} color="black"/>
        </TouchableOpacity>
        ):(
          <TouchableOpacity
          style={{
            width: window.width * 0.6,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: window.width * 0.25,
            padding: 12
          }}
          onPress={()=>{confirmCode(code)}}
        >
      <Text style={{fontSize:18}}>Continue</Text>    
        </TouchableOpacity>
        )}

        <TouchableOpacity>
          <Text style={styles.resend}>Didn’t received an OTP? <Text 
          onPress={()=>{signInWithPhoneNumber(phoneNo)

          }}
          style={{
            color: 'lightblue'
          }}>RESEND OTP</Text></Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" backgroundColor="black" />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center", 
    // height: window.height * 1,
  },
  header: {
    // flex: 0.08,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: window.width * 0.05,
    paddingRight: window.width * 0.05,
    paddingTop: window.width * 0.02,
    paddingBottom: window.width * 0.02,
    backgroundColor: "#FFFFFF",
    // elevation: 10,
    borderTopLeftRadius: 10,
    height: window.height * 0.08,
  },
  keyboardViewContainer: {
    width: "100%",
    alignItems: "center",
  },
  input1: {
    marginTop: window.width * 0.05,
    width: window.width * 0.8,
    height: window.width*0.15,
    justifyContent:"center",
    borderColor: "#fff",
    borderRadius:35,
    // fontFamily: 'DMSans-Regular'
  },
  authentication: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 12,
    marginBottom: 10,
    color:"white"
    // fontFamily: 'DMSans-Regular'
  },
  code: {
    width: 250,
    textAlign: "center",
    color:"white"
    // fontFamily: 'DMSans-Regular'
  },
   
  resend: {
    color: "white",
    marginTop:   window.width*0.05,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginBottom: window.width * 1.1,
    // fontFamily: 'DMSans-Regular'
  },
  otp: {
    marginTop: 20,
  },
  textInputContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  roundedTextInput: {
    // borderRadius: 10,
    // borderWidth: 1,
    borderBottomWidth: 1,
    color:'white'
  },
});

export default LoginOtp;
