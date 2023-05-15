import { Image, StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'


const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

const PhotoScreen = ({navigation}) => {
  const post = useSelector((state)=>state.post)
  const photo_post = post.photo_post;
  console.log(photo_post)
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
        <View style>
          <ImageBackground
            source={{uri: photo_post.image_url}}
            resizeMode='contain'
            style={{
              width: window.width * 1,
              height: window.height* 0.9

            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 1, position: 'absolute', top: 0, backgroundColor: 'black', paddingTop: 10, width: window.width * 1 }}>

          
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
            </ImageBackground>
        </View>
        <StatusBar backgroundColor='black' style='light' />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default PhotoScreen

const styles = StyleSheet.create({})