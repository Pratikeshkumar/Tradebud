import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Video } from 'expo-av'
import { useSelector } from 'react-redux'


const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get("window").height
}

const VideoPlayerScreen = ({navigation}) => {
  const post = useSelector((state)=>state.post)
  const video_post = post.video_post;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center'
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: -1,top: 0, backgroundColor: 'black', paddingTop: 10, width: window.width * 1 }}>

          
<TouchableOpacity
onPress={()=>{
  navigation.goBack();
}}
>
<View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: window.width * 0.05 }}>
  <Image style={{
      width: window.width * 0.09,
      height: window.height * 0.03,
  }} source={require("../assets/back.png")} />
</View>
</TouchableOpacity>
<View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: window.width * 0.29 }}>
  <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>Post</Text>
</View>
</View>
        <View>
          <Video 
            source={{uri: video_post.video_url}}
            resizeMode='contain'
            useNativeControls={true}
            shouldPlay={true}
            style={{
              width: window.width * 1, 
              height: window.height * 0.9
            }}
          >
          </Video>
        </View>
        <StatusBar backgroundColor='black' style='light' />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default VideoPlayerScreen

const styles = StyleSheet.create({})