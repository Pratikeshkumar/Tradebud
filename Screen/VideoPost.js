import { StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';


const window = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};


const VideoPost = () => {
    const [money, setMoney] = useState(0)
    const [video1, setVideo] = useState()
    const [caption, setCaption] = useState()
    const [loading, setLoading] = useState(false) 
    const userdata = useSelector((state)=>state.userdata)
    const my_profile_data = userdata.my_profile_data;
    

    const generateFileName = ()=>{
      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(2, 8);
      const filename = `${timestamp}-${randomString}`;
      return filename;
    }


const postVideo = async()=>{
  setLoading(true)
  const filename = generateFileName()
try {
  await storage().ref(filename).putFile(video1)
  const url = await storage().ref(filename).getDownloadURL();
  firestore()
  .collection('user_posts')
  .add({
    username: my_profile_data.username,
    profile_picture: my_profile_data.profile_picture,
    video_url: url,
    caption: caption,
    money_value: money,
    likes: [],
    comment: [],
    timestamp: new Date().getTime(),
    first_name: my_profile_data.first_name,
    price: money
  })
  .then(()=>{
    Alert.alert("Success", 'Video Uploaded')
    setLoading(false)
  })
} catch (error) {
  console.log(error)
}
}





    const video = React.useRef(null);

    // function for adding ny one
    const addonerupee = ()=>{
      setMoney(prevMoney => (Number(prevMoney) + 1).toString());
    }
//function for substracting money
    const lessmoney = ()=>{
      setMoney(prevMoney => (Number(prevMoney) - 1).toString());        
      }



// function for selection videos
const pickVideo = async()=>{
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status == 'granted'){
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setVideo(result.uri);
      console.log(result.uri)
    }



  }


}







// function for getting camera permissions
const getPermissionAsync = async () => {
  
};








// return display value
  return (
     <View style={styles.container}>
      <View style={styles.videoContainers}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0, 0, 0, 1)',
                justifyContent: 'center',
                position: 'absolute',
                top: 5,
                left: 5,
                zIndex: 2,
                borderRadius: 10
              }}
              onPress={()=>{
                pickVideo()
              }}
            >
              <Ionicons
                  name='cloud-upload'
                  size={40}
                  color={"white"}
              />
            </TouchableOpacity>
            <Video 
                  style={{flex: 1, width: window.width * 0.9, height: window.height * 0.3}}
                  ref={video}
                  source={{uri: video1}}
                  resizeMode={ResizeMode}
                  useNativeControls
                  isLooping
            />
      </View>
      <View style={styles.textContainers}>
          <TextInput
              style={{
                width: window.width * 0.9,
                padding: 10,
                backgroundColor: 'white',
                color: 'black',
                fontSize: 20,
                borderRadius: 5,
                justifyContent: 'center'
              }}
              placeholder='Write Caption For Video(optional)'
              multiline
              maxLength={300}
              value={caption}
              onChangeText={(val)=>{setCaption(val)}}
          />
      </View> 
      <View style={styles.moneyView}>
          <View style={{
            width: window.width * 0.45,

          }}>
              <Text style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '800'
              }}> 
              ADD MONEY </Text>
          </View>
          <View style={{
            width: window.width * 0.45,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly'
            
          }}>
            <TouchableOpacity
              onPress={addonerupee}
            >
            <Text style={{
              color: 'white',
              fontSize: 30,
              fontWeight: '900'
            }}>+</Text>
            </TouchableOpacity>


            <TextInput
                value={money}
                onChangeText={(val)=>{
                  setMoney(val)
                }}
                maxLength={3}
                style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 5,
                  fontSize: 20,
                  fontWeight: '600',
                  paddingLeft: 10,
                  width: window.width * 0.12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white'
                }}
            />

                <TouchableOpacity
                  onPress={lessmoney}
                >
                <Text style={{
              color: 'white',
              fontSize: 40,
              fontWeight: '900'
            }}>-</Text>
                </TouchableOpacity>
            
          </View>
      </View>
      {loading ? (
        <TouchableOpacity style={styles.button}>
        <ActivityIndicator size={'small'} color='black'/>
    </TouchableOpacity>
      ):(
        <TouchableOpacity 
          onPress={()=>{
            if(video1){
              postVideo()
            }
          }}
        style={styles.button}>
        <Text
            style={{
              fontSize: 25,
              fontWeight: '600'

            }}
        >UPLOAD</Text>
    </TouchableOpacity>
      )}
    </View> 
  )
}

export default VideoPost

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    width: window.width * 1,
    alignItems: 'center',
    // justifyContent: 'center'
  },
  videoContainers: {
    width: window.width * 0.95,
    height: window.height * 0.3,
    backgroundColor: 'white',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  textContainers: {
    width: window.width * 0.9,
    // backgroundColor: 'white',
    marginTop: window.height * 0.02
  },
  button: {
    width: window.width * 0.9,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: window.height * 0.01,
    padding: 10,
    borderRadius: window.width * 0.45,
  },
  moneyView: {
    width: window.width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    padding: 2
  }
})





    