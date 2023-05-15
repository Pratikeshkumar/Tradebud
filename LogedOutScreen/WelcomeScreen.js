import React, {useCallback} from 'react'
import { StatusBar } from 'expo-status-bar';
import {   ScrollView, TouchableOpacity,StyleSheet,
   Text, View, Image, Button, Dimensions } from 'react-native';
import Signup from '../assets/signup.png'
import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const window = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

const Home=({navigation})=> {
  return (
    <SafeAreaProvider>
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: 'black'
    }}>
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/tradebud.png')}
        />
        
        <TouchableOpacity 
           onPress={()=>{navigation.navigate("Registration")}}
           style={{
            width: window.width * 0.6,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: window.width * 0.25,
            padding: 12,
            marginVertical: window.height * 0.02
          }}
        >
          
         <Text style={{fontSize: 20, fontWeight: '600'}}>REGISTRATION</Text> 
          
        </TouchableOpacity>

        
        <TouchableOpacity
                onPress={()=>{navigation.navigate("Login")}}
                style={{
                  width: window.width * 0.6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  borderRadius: window.width * 0.25,
                  padding: 12
                }}
         >
        <Text style={{fontSize: 20, fontWeight: '600'}}>LOG IN</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" backgroundColor='black'/>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    height: window.height * 1.03
  },
  tinyLogo: {
    width: window.width * 1,
    height: window.height * 0.4,
    marginVertical: window.width * 0.2
  },
  
  
  
});

export default Home;