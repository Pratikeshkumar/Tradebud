import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import { addConfirmation } from '../store/signupSlice';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import { setLogined } from '../store/authSlice';
import firestore from '@react-native-firebase/firestore';
import { myProfileData } from '../store/userdataSlice';

//function for login using google
export const onGoogleButtonPress = async() => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in.then((user)=>{
      dispatch(addConfirmation(user))
      navigation.navigate("Otp")
    }).catch((err)=>{
      console.log(err)
    })
  }

//function for sending one time password 
export const signInWithPhoneNumber = async(phoneNumber, navigation, dispatch) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    dispatch(addConfirmation(confirmation))
    navigation.navigate('Otp')
  }

//function for setting up user credentials inside user devices
export const save = async (key, value)=>{
  await SecureStore.setItemAsync(key, value)
}

//function for getting user credentials from user devices
export const getItems = async (dispatch)=>{
   const result = await SecureStore.getItemAsync('username')
  if(result){
    // Alert.alert("Sucess", "user found")
      dispatch(setLogined(true))
      const username = result;
      firestore()
      .collection('user_profile_data')
      .doc(username)
      .onSnapshot(documentSnapshot => {
        dispatch(myProfileData(documentSnapshot.data()))
      })
      
  } else {
    // Alert.alert("Error", "User not found")
  }
}


