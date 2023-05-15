import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, FlatList, Alert } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'



const window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
const BottomHomeHeader = () => {

const navigation = useNavigation()

  return (
    <View style={{
        paddingHorizontal: window.width * 0.03,
        paddingTop: window.height * 0.025,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'black'
      }} >
        <Image style={{
          width: 70,
          height: 60,
        }} source={require("../assets/signup.png")} />

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: window.width * 0.35

        }}>
          <TouchableOpacity
            onPress={()=>{navigation.navigate('ChatDashboard')}}
            style={{
              paddingRight: 5
            }}
          >
          <Image style={{
          width: window.width * 0.079,
          height: window.height * 0.039,
        }} source={require("../assets/message.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('Notification')}}>
            <Ionicons name="notifications-circle" color={"white"} size={42}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{
              navigation.navigate('SearchScreen')
            }}
          >
          <Ionicons name="md-search-circle-sharp" color={"white"} size={42}/>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default BottomHomeHeader

const styles = StyleSheet.create({})