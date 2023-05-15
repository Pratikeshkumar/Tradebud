import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'expo-linking'




const window = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};



const GettingStarted = ({navigation}) => {
   

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', width: window.width * 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={require('../assets/tradebud.png')}
          style={{width: window.width * 1, height: window.height * 0.4}}
        />
        <View style={{width: window.width * 1, alignItems: 'center', justifyContent: 'center', marginVertical: window.height * 0.05}}>
          <Text style={{fontSize: 30, fontWeight: '600', color: 'white'}}>WELCOME !</Text>
        </View>
        <TouchableOpacity 
        onPress={()=>{navigation.navigate('Welcome')}}
        style={{
          width: window.width * 0.6,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: window.width * 0.25,
          padding: 12
        }}>
          <Text style={{fontSize: 20, fontWeight: '600'}}>LET'S GO !</Text>
        </TouchableOpacity>
        <StatusBar backgroundColor={"black"} style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default GettingStarted

const styles = StyleSheet.create({})