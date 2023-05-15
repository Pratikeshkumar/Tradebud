import { StyleSheet, Text, View, Dimensions, Image, Alert, FlatList, ScrollView } from 'react-native'
import React, { useState, useRef } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign'
import {ActivityIndicator, TextInput} from 'react-native-paper'
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import * as ImagePicker from 'expo-image-picker';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import signupSlice, { addEmail, addFirstName, addLastName, addPhoneNo, addProfilePictureName, addImage, addConfirmation, addProfilePictureNameLink } from '../store/signupSlice';
import firestore from '@react-native-firebase/firestore'
import Checkbox from 'expo-checkbox';
import { Modalize } from 'react-native-modalize'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo'
import storage from '@react-native-firebase/storage'

const window = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

const Registration = ({navigation}) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const signup = useSelector((state)=>state.signup)
  const image = signup.image;
  const [error, setError] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [checkboxError, setCheckboxError] = useState(null)
  const [selected, setselected] = useState(null)
  const modalizeRef = useRef(null)
  console.log(signup.profile_picture_link)

//data list of avatar 

const Avatar = [
  {
    avatar: 'https://firebasestorage.googleapis.com/v0/b/tradebud1-729f7.appspot.com/o/avatar1.jpeg?alt=media&token=0b66f1cd-9ee2-41bb-87b0-0387ae89809c'
  },
  {
    avatar: 'https://firebasestorage.googleapis.com/v0/b/tradebud1-729f7.appspot.com/o/avatar2.jpeg?alt=media&token=9359b300-282b-40c3-89fa-f7188f02cb34'
  },
  {
    avatar: 'https://firebasestorage.googleapis.com/v0/b/tradebud1-729f7.appspot.com/o/avatar3.jpeg?alt=media&token=701eb0d3-c81e-47f2-9042-5552fc7c1448'
  },
  {
    avatar: 'https://firebasestorage.googleapis.com/v0/b/tradebud1-729f7.appspot.com/o/avatar4.jpeg?alt=media&token=7b82fba5-a759-4cc6-9850-b91609d4e6f6'
  },
  {
    avatar: 'https://firebasestorage.googleapis.com/v0/b/tradebud1-729f7.appspot.com/o/avt1.png?alt=media&token=a98b4107-7d92-4364-ac9b-ac84a894cafd'
  },
  {
    avatar: 'https://firebasestorage.googleapis.com/v0/b/tradebud1-729f7.appspot.com/o/avt2.png?alt=media&token=b4e636a0-97c3-4db9-ba73-8e3278ab9a77'
  }
]

// function for selecting avatar from list of avatar

const selectAvatar = (index, item)=>{
  setselected(previous => previous == index ? null : index)
  if(selected == index){
    dispatch(addProfilePictureNameLink('https://firebasestorage.googleapis.com/v0/b/tradebud1-729f7.appspot.com/o/Blank-Profile-Picture-1.png?alt=media&token=2320994b-f5fe-4796-b179-ac91376d7e25'))
  } else if(selected == null){
    dispatch(addProfilePictureNameLink(item.avatar))
  }
  dispatch(addImage(''))
  console.log(signup.profile_picture_link)
}

// function for opening the modal

const onOpen = ()=>{
  modalizeRef.current?.open()
}



// function for signin with phone number 
  const signInWithPhoneNumber = async(phoneNumber, navigation, dispatch) => {
    const phone = signup.phoneNo;
    try {
      firestore()
      .collection('user_profile_data')
      .where('phone_number', '==', phone )
      .get()
      .then(quarySnapshot => {
        console.log(quarySnapshot.size)
        if(quarySnapshot.size != 0){
          Alert.alert("Error", "You Already Have An Account")
          setLoading(false)
        } else{
          callOtp(phoneNumber)
        }

      })
    } catch (error) {
      console.log(error)
    }
    
  }
  // function for calling otp
  const callOtp = async (phoneNumber)=>{
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    dispatch(addConfirmation(confirmation))
    navigation.navigate('Otp')
    setLoading(false)
  }

  //function for generating random image 
  const generateFileName = ()=>{
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    const filename = `${timestamp}-${randomString}`;
    return filename;
  }
  const pickImages = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      modalizeRef.current?.close()
      const filename = generateFileName()
      dispatch(addImage((result.assets[0].uri)));
      try {
        await storage().ref(filename).putFile(result.assets[0].uri)
        const url = await storage().ref(filename).getDownloadURL()
        dispatch(addProfilePictureNameLink(url))
        setselected(null)
      } catch (error) {
        console.log(error)
      }
    }
  };
  //function for clicking image from camera 
  const clickImage = async ()=>{
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    })
    if(!result.canceled){
      modalizeRef.current?.close()
      const filename = generateFileName()
      dispatch(addImage((result.assets[0].uri)));
      try {
        await storage().ref(filename).putFile(result.assets[0].uri)
        const url = await storage().ref(filename).getDownloadURL()
        dispatch(addProfilePictureNameLink(url))
        setselected(null)
      } catch (error) {
        console.log(error)
      }
    }
  }






  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView 
          nestedScrollEnabled={true}
         contentContainerStyle={{
          alignItems: 'center',
          width: window.width * 1,
         }}
        >
      <View style={styles.header}>
              <TouchableOpacity
               onPress={()=>{navigation.navigate('Welcome')}}
              >
              <AntDesign name='left' color='white' size={30} />
              </TouchableOpacity>
              <Text 
              style={{
                color: 'white',
                fontSize: 35,
                fontWeight: '900',
                marginHorizontal: window.width * 0.130,
              }}>Registration</Text>
          </View>
          <View style={styles.innerContainers}>
          <View style={styles.namecontainers}>
          <TextInput
            style={styles.email}
            label="First Name"
            theme={{ colors: { primary: "black" } }}
            outlineStyle={{ borderRadius: 10 }}
            mode="flat"
            value={signup.firstName}
            onChangeText={(val)=>{dispatch(addFirstName(val))}}
            maxLength={20}
          />
          <TextInput
            style={styles.email}
            label="Last Name"
            theme={{ colors: { primary: "black" } }}
            outlineStyle={{ borderRadius: 10 }}
            mode="flat"
            value={signup.lastName}
            onChangeText={(val)=>{dispatch(addLastName(val))}}
            maxLength={20}
          />
          </View>
          <View style={styles.emailView}>
          <TextInput
            label="Email"
            theme={{ colors: { primary: "black" } }}
            outlineStyle={{ borderRadius: 10 }}
            mode="flat"
            value={signup.email}
            onChangeText={(val)=>{dispatch(addEmail(val))}}
          />
          </View>
          <View style={styles.phoneInput}>
          <TextInput
            style={{width: window.width * 0.2}}
            theme={{ colors: { primary: "black" } }}
            outlineStyle={{ borderRadius: 10 }}
            mode="flat"
            value='+91'
          />
          <TextInput
            style={{width: window.width * 0.67}}
            label="Phone"
            theme={{ colors: { primary: "black" } }}
            outlineStyle={{ borderRadius: 10 }}
            mode="flat"
            value={signup.phoneNo}
            keyboardType='numeric'
            maxLength={10}
            dataDetectorTypes={'phoneNumber'}
            onChangeText={(val)=>{dispatch(addPhoneNo(val))}}
          />
          </View>
          <TouchableOpacity 
          onPress={onOpen}
          style={styles.uploadImage}>
              <View style={{
                width: window.width * 0.2
              }}>
              {image ? (
                  <Image
                   source={{uri: image}}
                   style={{
                    width: window.width * 0.16,
                    height: window.width * 0.16,
                    borderRadius: window.width * 0.08
                   }}
                  />
              ): (
                <MaterialCommunityIcons name='account-circle' color='white' size={50}/>
              )}
              </View>
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                width: window.width * 0.7,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                padding: 10
              }}>
                <Text style={{
                  color: 'black',
                  fontSize: 15,
                  fontWeight: '800'
                }}>PROFILE PICTURE</Text>
              </View>
          </TouchableOpacity>
          <View style={{
            width: window.width * 0.9,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              color: 'white'
            }}>OR</Text>
          </View>
          <Text 
          style={{
            color: 'white',
            fontSize: 15,
            marginVertical: window.height * 0.01
            }}>Choose Your Avatar</Text>



            {/* section for selecting avatar from list */}


          <View style={styles.avatarView}>
                <FlatList
                        data={Avatar}
                        horizontal={true}
                        renderItem={({item, index})=>
                      <TouchableOpacity
                                    style={{
                                      marginHorizontal: 3
                                    }}
                                    onPress={()=>{
                                      selectAvatar(index, item)
                                    }}
                        >
                         <Image
                          source={{uri: item.avatar}}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            borderWidth: 2,
                            borderColor: selected == index ? 'yellow': 'black'
                          }}
                        />
                      </TouchableOpacity>
                  }
                />
          </View>
          <View style={styles.termsView}>
                <Checkbox
                  value={isChecked}
                  onValueChange={setIsChecked}
                  style={{margin: 5, padding: 13, borderColor: checkboxError ? 'red':'gray'}}
                  
                />
                <Text style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: '500'
                }}>I agree to the  
                  <Text style={{color: 'lightblue'}} onPress={()=>{navigation.navigate('Terms')}} > terms & conditions</Text>
                </Text>
              </View>
          {loading ? (
            <View style={{}}>
            <TouchableOpacity
            style={{
              backgroundColor: 'white',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 15,
              marginVertical: window.height * 0.03,
              borderRadius: window.width * 0.45


             }}
            >
              <ActivityIndicator size={"small"} color='black' style={{}}/>
            </TouchableOpacity>
            </View>
          ):(
            <View style={{}}>
            <TouchableOpacity
            onPress={()=>{
              const fname = signup.firstName;
              const lname = signup.lastName;
              const email = signup.email;
              const phone = signup.phoneNo;
              const profilePic = signup.image;
              const Phone = phone.length == 10;
              if(fname && lname && email && Phone){
                if(isChecked){
                  setLoading(true)
                signInWithPhoneNumber('+91'+ phone, navigation, dispatch)
                } else{
                  setCheckboxError(true)
                }
              }else{
                Alert.alert("Error", 'Fill Your Details')
              }
            }}
  
            // onPress={()=>{navigation.navigate('Otp')}}
             style={{
              backgroundColor: 'white',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              marginVertical: window.height * 0.03,
              borderRadius: window.width * 0.45


             }}
            >
              <Text style={{fontSize: 20, fontWeight: '600'}}>
                REGISTER
              </Text>
            </TouchableOpacity>
            </View>
          )}
          </View>
          </ScrollView>
          <Modalize 
                    ref={modalizeRef}
                    snapPoint={80}
                    handlePosition='inside'
                    velocity={5500}
                    openAnimationConfig={{
                        spring: {
                            speed: 10,
                            bounciness: 4,
                            
                        },
                        timing: {
                            duration: 50
                        }
                    }}
                    modalStyle={{
                        backgroundColor: 'white',
                        justifyContent: 'center'
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: window.width * 1,
                        paddingVertical: 15,
                    }}>
                        

                        <TouchableOpacity 
                            onPress={pickImages}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 20,
                            borderRightWidth: 1,
                            borderColor: 'black'
                        }}>
                            <MaterialIcons name='photo-library' color={'black'} size={35} />
                            <Text style={{
                                color: 'black'
                            }}>Photo Gallery</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={clickImage}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 20
                        }}>
                            <Entypo name='camera' color={'black'} size={35} />
                            <Text style={{
                                color: 'black'
                            }}>
                                Camera</Text>
                        </TouchableOpacity>
                        
                    </View>
                        
                </Modalize>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Registration;


const DisplayAvatar = ({item, index})=>{
  const dispatch = useDispatch()
  const [selected, setselected] = useState(false)


// function for selecting the avatar
const selectAvatar = ()=>{
  setselected(previous=>!previous)
}

  return(
    <TouchableOpacity
        style={{
          marginHorizontal: 3
        }}
        onPress={selectAvatar}
    >
      {selected && <Image
        source={{uri: item.avatar}}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30
        }}
      />}
      {!selected && <Image
        source={{uri: item.avatar}}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          borderWidth: 3,
          borderColor: 'red',
          
        }}
      />}
    </TouchableOpacity>
  )
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    width: window.width * 1,
    alignItems: 'center'
  },
  header: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: window.width * 0.02,
    paddingVertical: window.height * 0.02,
    justifyContent: 'center'
  }, 
  innerContainers: {
    width: window.width * 0.9,
    justifyContent: 'center',
  },
  email: {
    height: window.width * 0.15,
    width: window.width * 0.4,
    color: "white",
  },
  namecontainers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: window.width * 0.9
  },
phoneInput: {
  flexDirection: 'row',
  justifyContent: 'space-between'
},
emailView: {
  marginVertical: window.height * 0.01
},
uploadImage: {
  width: window.width * 0.9,
  backgroundColor: 'black',
  alignItems: 'center',
  flexDirection: 'row',
  marginVertical: window.height * 0.01
},
button: {
  backgroundColor: "white",
  color: "black",
  padding: 10,
  width: window.width*0.89, 
  height: window.width*0.15,
  borderRadius: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  textAlignVertical:"center",
  fontSize:22,
  marginVertical: window.height * 0.02
},
google_button: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  padding: 12,
  borderRadius: 30,
  width: window.width * 0.9,
  marginVertical: window.width * 0.03
},
termsView: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  marginVertical: window.height * 0.015
},
avatarView: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: window.height * 0.01,
  justifyContent: 'space-around'
}
})