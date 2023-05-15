import { StatusBar, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native'
import React, {useRef, useState} from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Modalize } from 'react-native-modalize'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { ActivityIndicator } from 'react-native-paper';

const window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

const EditProfile = ({navigation}) => {
    const userdata = useSelector((state)=>state.userdata)
    const my_profile_data = userdata.my_profile_data;
    const modalizeRef = useRef(null)
    const [profile_picture, setProfile_picture] = useState(my_profile_data.profile_picture);
    const [first_name, setFirst_name] = useState(my_profile_data.first_name)
    const [last_name, setLast_name] = useState(my_profile_data.last_name);
    const [email, setEmail] = useState(my_profile_data.email);
    const [about_us, setAbout_us] = useState(my_profile_data.about_us)
    const [loading, setloading] = useState(false)
    // function for opening the modal
    const onOpen = ()=>{
        modalizeRef.current?.open()
    }
    // function for picking picture from user devices
const pickImages = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
        modalizeRef.current?.close();
        setProfile_picture(result.assets[0].uri)
        const image = result.assets[0].uri;
        const time = new Date().getTime()
        const randomString = Math.random().toString(36).substring(2, 8);
        const filename = `${time}-${randomString}`;
        try {
            storage().ref(filename).putFile(image)
            const url = await storage().ref(filename).getDownloadURL();
            setProfile_picture(url)
        } catch (error) {
            console.log(error)
        }
    }
  };
  // function for clicking picture from camera
  const clickImage = async()=>{
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        })
        if(!result.canceled){
            modalizeRef.current?.close();
        setProfile_picture(result.assets[0].uri)
        const image = result.assets[0].uri;
        const time = new Date().getTime()
        const randomString = Math.random().toString(36).substring(2, 8);
        const filename = `${time}-${randomString}`;
        try {
            storage().ref(filename).putFile(image)
            const url = await storage().ref(filename).getDownloadURL();
            setProfile_picture(url)
        } catch (error) {
            console.log(error)
        }
        }
  }
//  function for updating user_profile
  const UpdateProfile = ()=>{
    setloading(true)
    try {
        firestore()
        .collection('user_profile_data')
        .doc(my_profile_data.username)
        .update({
            first_name: first_name,
            last_name: last_name,
            about_us: about_us,
            email: email,
            profile_picture: profile_picture
        })
        .then(()=>{
            Alert.alert("Success", "Successfully Updated")
            setloading(false)
        })
        
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <SafeAreaProvider>
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'black'
        }}>
            <View 
                style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    marginTop: window.height * 0.02,
                    width: window.width * 1
                    }}>
                    <TouchableOpacity
                     onPress={()=>{
                        navigation.goBack()
                      }}
                    >
                        <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: window.width * 0.05 }}>
                            <Image style={{
                                width: window.width * 0.09,
                                height: window.height * 0.02,
                            }} source={require("../assets/back.png")} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: window.width * 0.25 }}>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>
                            Edit Profile
                        </Text>
                    </View>
                </View>
            <ScrollView 
                nestedScrollEnabled={true}
                contentContainerStyle={{
                    width: window.width * 1,

                }}
            >
                {/* Image containers */}
            <View style={{
                width: window.width * 1, 
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: window.height * 0.05
            }}>
                <Image 
                    source={{uri: profile_picture}}
                    style={{
                        width: 90, height: 90, borderRadius: 45 
                    }}
                />
                <Text
                    onPress={onOpen}
                style={{
                    color: 'white',
                    fontSize: 20,
                    marginTop: window.height * 0.01

                }}>Edit</Text>
            </View>
            
            {/* TextInput containers  */}
                <View style={{
                    flex: 1,
                    width: window.width * 1,
                    alignItems: 'center',
                    marginTop: window.height * 0.01
                }}>
                    <TextInput
                    placeholder='Username'
                    placeholderTextColor={'black'}
                    value={my_profile_data.phone_number}
                    editable={false}
                    style={{
                        width: window.width * 0.9,
                        backgroundColor: 'pink',
                        padding: 15,
                        fontSize: 18,
                        marginTop: window.height * 0.02,
                        borderRadius: 5
                    }}

                />
                     <TextInput
                    placeholder='Username'
                    placeholderTextColor={'black'}
                    value={my_profile_data.username}
                    editable={false}
                    style={{
                        width: window.width * 0.9,
                        backgroundColor: 'pink',
                        padding: 15,
                        fontSize: 18,
                        marginTop: window.height * 0.02,
                        borderRadius: 5
                    }}

                />
                    <TextInput
                    placeholder='About Us'
                    placeholderTextColor={'black'}
                    value={about_us}
                    onChangeText={(val)=>{setAbout_us(val)}}
                    style={{
                        width: window.width * 0.9,
                        backgroundColor: 'white',
                        padding: 15,
                        fontSize: 18,
                        marginTop: window.height * 0.02,
                        borderRadius: 5
                    }}

                />
                <TextInput
                    placeholder='First Name'
                    placeholderTextColor={'black'}
                    value={first_name}
                    onChangeText={(val)=>{setFirst_name(val)}}
                    style={{
                        width: window.width * 0.9,
                        backgroundColor: 'white',
                        padding: 15,
                        fontSize: 18,
                        marginTop: window.height * 0.02,
                        borderRadius: 5
                    }}

                />
                <TextInput
                    placeholder='Last Name'
                    placeholderTextColor={'black'}
                    value={last_name}
                    onChangeText={(val)=>{setLast_name(val)}}
                    style={{
                        width: window.width * 0.9,
                        backgroundColor: 'white',
                        padding: 15,
                        fontSize: 18,
                        marginTop: window.height * 0.02,
                        borderRadius: 5
                    }}

                />
                
                <TextInput
                    placeholder='Email'
                    placeholderTextColor={'black'}
                    value={email}
                    onChangeText={(val)=>{setEmail(val)}}
                    style={{
                        width: window.width * 0.9,
                        backgroundColor: 'white',
                        padding: 15,
                        fontSize: 18,
                        marginTop: window.height * 0.02,
                        borderRadius: 5
                    }}

                />
                {loading ? (<TouchableOpacity 
                    style={{
                        width: window.width * 0.9,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 15,
                        marginTop: window.height * 0.02,
                        borderRadius: window.width * 0.45
                        
                    }}>
                    <ActivityIndicator size={'small'} color='black' />
                </TouchableOpacity>):(
                    <TouchableOpacity 
                    onPress={UpdateProfile}
                    style={{
                        width: window.width * 0.9,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 15,
                        marginTop: window.height * 0.02,
                        borderRadius: window.width * 0.45,
                        marginBottom: window.height * 0.05
                        
                    }}>
                    <Text style={{
                        fontWeight: '600'
                    }}>UPDATE</Text>
                </TouchableOpacity>
                )}
                </View>
                

                
            </ScrollView>

                                    {/* modal for capturing the picture from camera and from gallery */}
                <Modalize 
                    ref={modalizeRef}
                    snapPoint={90}
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
            <StatusBar backgroundColor={'black'} style='light' />
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default EditProfile

const styles = StyleSheet.create({})