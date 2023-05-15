import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Alert, ScrollView, Modal } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { ActivityIndicator, TextInput } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { Switch, colors } from 'react-native-elements';
import AntDesign from '@expo/vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux';
import storage from '@react-native-firebase/storage'
import { addImagePath } from '../store/postingSlice';
import Entypo from '@expo/vector-icons/Entypo'
import { Modalize } from 'react-native-modalize'


const window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}




 const Post = ({navigation}) => {
    const [videoUri, setVideoUri] = useState();
    const [text, setText] = useState('')
    const [isPrice, setIsPrice] = useState(false)
    const [price, setPrice] = useState('0')
    const [isLoading, setIsLoading] = useState(false)
    const userdata = useSelector((state)=>state.userdata)
    const {username, profile_picture} = userdata.my_profile_data;
    const [image, setImage] = useState()
    const [picModalVisible, setPicModalVisible] = useState(false)
    const toggleSwitch = () => setIsPrice(previousState => !previousState);
    const modalizeRef = useRef(null); 
    const modalizeRef1 = useRef(null)



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
        setVideoUri('')
        setImage(result.assets[0].uri)
        
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
            setVideoUri('')
            setImage(result.assets[0].uri)
        }
  }

// function for oening the modal

const onOpen = () => {
    modalizeRef.current?.open();
  };
const onOpen1 = ()=>{
    modalizeRef1.current?.open()
}








// function for monetize 
const monetize = ()=>{
    if(image || videoUri){
        return true;
    } else{
        return false;
    }
}


// function for picking up video from user devices
const pickvideo = async() =>{
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if(status == 'granted'){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos, // or ImagePicker.MediaTypeOptions.Videos for videos
            allowsEditing: true,
            quality: 1,
        });
        if(!result.canceled){
            modalizeRef1.current?.close()
            setImage('')
            setVideoUri(result.assets[0].uri)
        }

    }

}
// function for clicking video from camera 

const clickVideo = async ()=>{
    let result = ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        videoQuality: 1,      
    })
    if(!result.canceled){
        modalizeRef1.current?.close()
        setImage('')
        result.then((res)=>{
            setVideoUri(res.assets[0].uri)
        })
    }
}





const sendPostData = async ()=>{
    const time = new Date().getTime()
    const randomString = Math.random().toString(36).substring(2, 8);
    const filename = `${time}-${randomString}`;
    if(text || image || videoUri){
      setIsLoading(true)  
        if(image){
            try {
                await storage().ref(filename).putFile(image)
                const image_uri = await storage().ref(filename).getDownloadURL();
                firestore()
                .collection('user_post_data_with_media')
                .add({
                    username: username,
                    text: text,
                    timestamp: time,
                    likes: [],
                    reached: [],
                    image_url: image_uri,
                    price: price,
                    monetize: isPrice,
                    profile_picture: profile_picture,
                })
                .then(()=>{
                Alert.alert("Success", "Posted successfully")
                setIsLoading(false)
                setText('')
                setImage(undefined)
                setVideoUri(undefined)
                setIsPrice(false)
                })
                } catch (err) {
                    Alert.alert("Error", "You have an error in uploading picture")
                }
        } else if(videoUri){
            try {
                await storage().ref(filename).putFile(videoUri);
                const video_uri = await storage().ref(filename).getDownloadURL();
                firestore()
                .collection('user_post_data_with_media')
                .add({
                    username: username,
                    text: text,
                    timestamp: time,
                    likes: [],
                    reached: [],
                    video_url: video_uri,
                    price: price,
                    monetize: isPrice,
                    profile_picture: profile_picture,
                })
                .then(()=>{
                Alert.alert("Success", "Posted successfully")
                setIsLoading(false)
                setText("")
                setImage(undefined)
                setVideoUri(undefined)
                setIsPrice(false)
                })
                } catch (err) {
                    console.log(err)
                }
        } else{
            try {
                firestore()
            .collection('user_post_data_with_media')
            .add({
                username: username,
                text: text,
                timestamp: time,
                likes: [],
                reached: [],
                profile_picture: profile_picture,
                monetize: isPrice,
            })
            .then(()=>{
               Alert.alert("Success", "Posted successfull")
               setIsLoading(false)
               setText('')
                setImage(undefined)
                setVideoUri(undefined)
                setIsPrice(false)

            })
            } catch (error) {
                console.log(error)
            }
        }
    } else{
        Alert.alert("Error", "Please Enter something")
    }
}
 

// functions for increment 
const increaseCount = () => {
    const intPrice = parseInt(price) + 1;
    const pric = intPrice.toString()
    if(intPrice <= 1001){
        setPrice(pric)
    }
    
  };
//function for decrement
const decreaseCount = () => {
    const intPrice = parseInt(price) - 1;
    const pric = intPrice.toString()
    if(price >= 1){
        setPrice(pric)
    }
  };

// functions for setting color of post button
const color = ()=>{
    if(text || videoUri || image){
        return true;
    } else{
        return false;
    }
}



  return (
    <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', alignItems: 'center'}}>
        <ScrollView contentContainerStyle={{}} >
            <View style={{ alignItems: 'center', marginTop: window.height * 0.01, justifyContent: 'space-between', width: window.width * 0.9, flexDirection: 'row' }}>
            <TouchableOpacity onPress={()=>{
                setIsLoading(false)
                setText('')
                 setImage(undefined)
                 setVideoUri(undefined)
                 setIsPrice(false)
                navigation.goBack()}}>
                <Entypo name='cross' color={"white"} size={40} />
            </TouchableOpacity>
            {isLoading ? (
                <TouchableOpacity 
                style={{
                    backgroundColor: '#1007fa',
                    paddingHorizontal: 30,
                    borderRadius: 10,
                    paddingVertical: 7

                }}>
            <ActivityIndicator size={'small'} color='white' />
            </TouchableOpacity>
            ) : (
                <TouchableOpacity 
                onPress={sendPostData} 
                style={{
                    backgroundColor: color() ? '#1007fa' : 'grey',
                    paddingHorizontal: 30,
                    borderRadius: 10,
                    paddingVertical: 7

                }}>
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>Post</Text>
            </TouchableOpacity>
            )}
             </View>
            <View style={styles.innerContainers}>
                <View style={{flex: 1, backgroundColor: 'white', width: window.width * 0.9, borderRadius: 10, padding: 5}}>
                    <TextInput
                        style={{backgroundColor: 'white', width: window.width * 0.85, color: 'black', marginBottom: 10}}
                        placeholder="What's on your mind?"
                        value={text}
                        onChangeText={(val)=>{setText(val)}}
                        multiline={true}
                    />
                    <View style={{flexDirection: 'row', marginHorizontal: 1 }}>
                    <TouchableOpacity 
                        style={{width: 60, height: 60, backgroundColor: '#fad5d2', borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}
                        onPress={onOpen}>
                    <MaterialIcons name='perm-media' size={30} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                         style={{width: 60, height: 60, backgroundColor: '#fad5d2', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}
                         onPress={onOpen1}
                    >
                    <MaterialIcons name='video-library' size={30} color={'black'} />
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop: window.height * 0.01}}>
                {image && <Image source={{uri: image}} style={{width: window.width * 0.9, height: window.height * 0.3}} />}
                    {videoUri && <Video source={{uri: videoUri}} useNativeControls={true} style={{width: window.width * 0.9, height: window.height * 0.3, }} resizeMode='cover' />}
                </View>
                {monetize() && <View style={{flexDirection: 'row', width: window.width * 0.9, justifyContent: 'space-around', marginTop: window.height * 0.00, height: window.height * 0.1, alignItems: 'center', marginBottom: 50}}>
                    <Text style={{color: 'white', fontSize: 20}}>Do you want to monetize it?</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        value={isPrice}
                        onValueChange={toggleSwitch}
                        thumbColor={isPrice ? '#f5dd4b' : '#f4f3f4'}
                    />
                </View>}
                {isPrice && <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: window.width * 0.7, marginTop: -60, marginBottom: 50, height: window.height * 0.1}}>
                    <TextInput
                        value={price}
                        onChangeText={(val)=>{setPrice(val)}}
                        style={{width: window.width * 0.5, height: 50}}
                        label={"Enter Amount In ₹"}
                        keyboardType='numeric'
                        maxLength={2}
                    />
                    <TouchableOpacity onPress={decreaseCount}>
                    <AntDesign name='minuscircle' color={"white"} size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={increaseCount}
                    >
                    <AntDesign name='pluscircle' color={"white"} size={30} />
                    </TouchableOpacity>
                </View>}
            </View>
            </ScrollView>

                {/* modal for capturing the picture from camera and from gallery */}
                <Modalize 
                    ref={modalizeRef}
                    snapPoint={130}
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

                {/* modal for capturing video from camera and selecting videos from gallery */}
                <Modalize 
                    ref={modalizeRef1}
                    snapPoint={130}
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
                            onPress={pickvideo}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 20,
                            borderRightWidth: 1,
                            borderColor: 'black'
                        }}>
                            <MaterialIcons name='video-library' color={'black'} size={35} />
                            <Text style={{
                                color: 'black'
                            }}>Video Gallery</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={clickVideo}
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

            <StatusBar backgroundColor='black' style='light' />
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Post;

const styles = StyleSheet.create({
    innerContainers: {
        // width: window.width * 1,
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        // 
        marginTop: 10
    },

})


