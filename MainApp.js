import { Alert, DatePickerIOS, StyleSheet, Text, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer,  } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from './LogedOutScreen/WelcomeScreen'
import Login from './LogedOutScreen/Login'
import Otp from './LogedOutScreen/Otp'
import Registration from './LogedOutScreen/Registration'
import Username from './LogedOutScreen/Username'
import GettingStarted from './LogedOutScreen/GettingStarted'
import HomeStack from './Screen/HomeStack'
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from './GlobalFunction' 
import * as SecureStore from 'expo-secure-store'
import LoginOtp from './LogedOutScreen/LoginOtp'
import Terms from './Screen/Terms'
import Privacy from './Screen/Privacy'
import { addEventListener } from 'expo-linking'
import * as Linking from 'expo-linking'

const Stack = createNativeStackNavigator()

const MainApp = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state)=>state.auth)
  const login = auth.login;



useEffect(()=>{
  getItems(dispatch)
}, [login])


const config = {
  screens: {
    Terms: 'Terms',
    HomeStack : {
      screens : {
        BottomNav: {
          screens : {
            BottomProfile: 'BottomProfile',
            Post: 'Post',
            BottomHome: 'BottomHome'
          },
        },
        Payments: 'Payments',
          Settings: 'Settings',
          ChatDashboard: 'ChatDashboard',
          UserChat: 'UserChat',
          WatchUserProfile: 'WatchUserProfile',
          SearchScreen: 'SearchScreen',
          AddMoney: 'AddMoney',
          WatchUserProfileFromFeed: 'WatchUserProfileFromFeed/:username',
          ViewSharedPostScreen: 'ViewSharedPostScreen/:id'
      }
    }
  }
}
const prefix = Linking.createURL('/')
const linking = {
  prefixes: [prefix],
  config: login ? config : null
}

// const handleDeepLink = (event) => {
//   console.log("event:"+ event)
//   const { path, queryParams } = Linking.parse(event.url);
//   console.log("Path:"+ path)
//   console.log("quaryParms:"+ queryParams)
//   const screen = linking.config.screens[path];
//   console.log("screen:"+ screen)

//   if (screen) {
//     // Navigate to the specified screen
//     navigation.navigate(screen, queryParams);
//   }
// };

// Linking.addEventListener('url', handleDeepLink);

// const deepLink = 'tradebud://HomeStack/BottomNav/BottomProfile'
// Linking.openURL(deepLink)

  return (
      <NavigationContainer 
        linking={linking}
        
      >
      {login ? (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
      >
        <Stack.Screen name='HomeStack' component={HomeStack} />
      </Stack.Navigator>
      ) : (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
      >
        <Stack.Screen name='GettingStarted' component={GettingStarted} />
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Registration' component={Registration} />
        <Stack.Screen name='Otp' component={Otp} />
        <Stack.Screen name='LoginOtp' component={LoginOtp} />
        <Stack.Screen name='Username' component={Username} />
        <Stack.Screen name='HomeStack' component={HomeStack} />
        <Stack.Screen name='Terms' component={Terms} />
        <Stack.Screen name='Privacy' component={Privacy} />
      </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default MainApp

const styles = StyleSheet.create({})



// i am explaining you the structure of navigation in my application

// 1. firstly i have a StackNavigator.
// inside of this StackNavigator i have a HomeStack Screen
// and Homestack is also a StackNavigator and inside of this i have a BottomNav screen
// BottomNav is a TabNavigator and inside of this i have a three screen BottomHome, Post, and BottomProfile 
// i want to open the BottomProfile Secreen from deep linik can you explain me how can i do this actually