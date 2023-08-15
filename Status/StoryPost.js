import { StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput, Image, FlatList, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Entypo from '@expo/vector-icons/Entypo'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { ActivityIndicator } from 'react-native-paper'
import { useSelector } from 'react-redux'


const window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}


const StoryPost = ({navigation}) => {
    const [isText, setIstext] = useState(true)
    const [ispicture, setIsPicture] = useState(false)
    const [isVideo, setIsVideo] = useState(false)
    const [text, setText] = useState()
    const [image, setImage] = useState()
    const [video, setVideo] = useState()
    const [loading, setIsLoading] = useState(false)
    const userdata = useSelector((state)=>state.userdata)
    const my_profile_data = userdata.my_profile_data;
    const username = my_profile_data.username;
    const profile_picture = my_profile_data.profile_picture;


// function for sending text story post
const postText = ()=>{
    const time = new Date().getTime()
    setIsLoading(true)
    try {
        firestore()
        .collection('user_status')
        .add({
            username: username,
            timestamp: time,
            profile_picture: profile_picture,
            content: text,
            content_type:"word",
            likes: [],
            reached: [],
            finish:0
        })
        .then(()=>{
            setText('')
            setIsLoading(false)
            Alert.alert("Success", 'Posted Successfully')
        })  
    } catch (error) {
        console.log(error)
    }
}
// function for sending image data 
const postImages = async()=>{
    const time = new Date().getTime()
    const randomString = Math.random().toString(36).substring(2, 8);
    const filename = `${time}-${randomString}`;
    setIsLoading(true)
    try {
        await storage().ref(filename).putFile(image)
        const image_url = await storage().ref(filename).getDownloadURL()
        try {
            firestore()
            .collection('user_status')
            .add({
                username: username,
                timestamp: time,
                profile_picture: profile_picture,
                content: image_url,
                content_type:"photo",
                likes: [],
                reached: [],
                finish:0
            })
            .then(()=>{
                setIsLoading(false)
                setIsPicture(false)
                setIstext(true)
                setImage('')
                Alert.alert('Success', "Posted Successfully")
            })
        } catch (error) {
            Alert.alert("Error", error)
        }
        
    } catch (error) {
        Alert.alert("Error", error)
    }
}
// function for posting video story
const postVideo = async()=>{
    const time = new Date().getTime()
    const randomString = Math.random().toString(36).substring(2, 8);
    const filename = `${time}-${randomString}`;
    setIsLoading(true)
    try {
        await storage().ref(filename).putFile(video)
        const video_url = await storage().ref(filename).getDownloadURL()
        try {
            firestore()
            .collection('user_status')
            .add({
                username: username,
                timestamp: time,
                profile_picture: profile_picture,
                content: video_url,
                content_type:"filevideo",
                likes: [],
                reached: [],
                finish:0
            })
            .then(()=>{
                setIstext(true)
                setIsVideo(false)
                setIsLoading(false)
                setVideo('')
                Alert.alert("Success", 'Posted Successfully')
            })
            
        } catch (error) {
            Alert.alert("Error", error)
        }
        
    } catch (error) {
        Alert.alert("Error", error)
    }
}






// function for selecting image from user device
const selectImage = async ()=>{
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, 
        allowsEditing: false,
        quality: 1,
        aspect: [16, 9]
        
    })
    if(!result.canceled){
        setImage(result.assets[0].uri)
        setIsPicture(true)
        setIstext(false)
        setIsVideo(false)
    }

}
// function for selecting video from userdevice
const selectVideo = async()=>{
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos, 
        allowsEditing: false,
        quality: 1,
        aspect: [16, 9]
    })
    if(!result.canceled){
        setVideo(result.assets[0].uri)
        setIsPicture(false)
        setIstext(false)
        setIsVideo(true)
    }
}






  return (
    <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', alignItems: 'center'}}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: window.width * 0.02,
                paddingTop: window.height * 0.01,
                alignItems: 'center',
                width: window.width * 1
            }}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                    <Entypo name='cross' size={40} color={'white'} />
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    width: window.width * 0.6,
                    justifyContent: 'space-evenly'
                }}>
                    <TouchableOpacity
                        onPress={()=>{
                            setIstext(true)
                            setIsPicture(false)
                            setIsVideo(false)
                        }}
                        style={{width: 60, height: 60, backgroundColor: isText ? '#fad5d2': 'white', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <MaterialCommunityIcons name='format-text' size={30} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={selectImage}
                    style={{width: 60, height: 60, backgroundColor: ispicture ? '#fad5d2': 'white', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <MaterialIcons size={30} name='perm-media' color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={selectVideo}
                    style={{width: 60, height: 60, backgroundColor: isVideo ? '#fad5d2': 'white', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <MaterialIcons size={30} name='video-library' color={'black'} />
                    </TouchableOpacity>
                </View>
            </View>
            {isText &&   <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: window.width * 0.9
            }}>
                <TextInput
                    placeholderTextColor={'white'}
                    placeholder='Type a status'
                    multiline={true}
                    style={{
                        fontSize: 30,
                        //width: window.width * 0.5,
                        alignItems: 'center',
                        color: 'white',
                        justifyContent: 'center',
                        // borderWidth: 0.5,
                        // borderColor: 'white',
                        padding: 20,
                        fontWeight: '300'
                    }}  
                    value={text}
                    onChangeText={(val)=>{setText(val)}}
                />
            </View>}
            {isVideo && <View style={{flex: 1,}}>
                    <Video
                        source={{uri: video}}
                        resizeMode='cover'
                        useNativeControls={true}
                        style={{
                            width: window.width * 0.95,
                            height: window.height * 0.85
        
                        }}
                        />
                </View>}
                {ispicture && <View style={{
                    flex: 1,
                }}>
                        <Image
                                source={{uri: image}}
                                style={{
                                    width: window.width * 0.95,
                                    height: window.height * 0.9
                                }}
                            
                            />
                    </View>}

           {text && <View>
                    {loading ? (
                        <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: 30,
                            backgroundColor: '#1007fa',
                            padding: 15,
                            zIndex: 100,
                            width: window.width * 0.3,
                            borderRadius: window.width * 0.15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            left: 60

                        }}
                    >
                        <ActivityIndicator size={'small'} color='white' />
                    </TouchableOpacity>
                    ):(
                        <TouchableOpacity
                        onPress={postText}
                        style={{
                            position: 'absolute',
                            bottom: 30,
                            backgroundColor: '#1007fa',
                            padding: 15,
                            zIndex: 100,
                            width: window.width * 0.3,
                            borderRadius: window.width * 0.15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            left: 60

                        }}
                    >
                        <Text style={{fontSize: 20, color: 'white'}}>Post</Text>
                    </TouchableOpacity>
                    )}
                </View>}
                {image && <View>
                    {loading ? (
                        <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: 30,
                            backgroundColor: '#1007fa',
                            padding: 15,
                            zIndex: 100,
                            width: window.width * 0.3,
                            borderRadius: window.width * 0.15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            left: 60

                        }}
                    >
                        <ActivityIndicator size={'small'} color='white' />
                    </TouchableOpacity>
                    ):(
                        <TouchableOpacity
                        onPress={postImages}
                        style={{
                            position: 'absolute',
                            bottom: 30,
                            backgroundColor: '#1007fa',
                            padding: 15,
                            zIndex: 100,
                            width: window.width * 0.3,
                            borderRadius: window.width * 0.15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            left: 60

                        }}
                    >
                        <Text style={{fontSize: 20, color: 'white'}}>Post</Text>
                    </TouchableOpacity>
                    )}
                </View>}
                {video && <View>
                    {loading ? (
                        <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: 30,
                            backgroundColor: '#1007fa',
                            padding: 15,
                            zIndex: 100,
                            width: window.width * 0.3,
                            borderRadius: window.width * 0.15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            left: 60

                        }}
                    >
                        <ActivityIndicator size={'small'} color='white' />
                    </TouchableOpacity>
                    ):(
                        <TouchableOpacity
                        onPress={postVideo}
                        style={{
                            position: 'absolute',
                            bottom: 30,
                            backgroundColor: '#1007fa',
                            padding: 15,
                            zIndex: 100,
                            width: window.width * 0.3,
                            borderRadius: window.width * 0.15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            left: 60

                        }}
                    >
                        <Text style={{fontSize: 20, color: 'white'}}>Post</Text>
                    </TouchableOpacity>
                    )}
                </View>}

            
            <StatusBar backgroundColor='black' style='light' />
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default StoryPost

const styles = StyleSheet.create({})