import BottomHome from './BottomHome'
import BottomProfile from './BottomProfile'
import BottomTrending from './BottomTrending'
import { View, Text, TouchableOpacity, Image, Dimensions, Easing } from 'react-native';
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from '@expo/vector-icons/Feather'
import Icons1 from '@expo/vector-icons/Entypo'
import AntDesign from '@expo/vector-icons/AntDesign'
import Icons2 from '@expo/vector-icons/MaterialCommunityIcons'
import SearchScreen from './SearchScreen';
import Post from './Post';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomHomeHeader from './BottomHomeHeader';
const Tab = createBottomTabNavigator();
const BottomNav = () => {
  const tab = useSelector((state)=>state.tab)
  const {isVisible} = tab.isVisible

  const window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}
 
  return (
    <Tab.Navigator
      initialRouteName="Bottomhome"
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black",
          elevation: 0,
          borderTopWidth: 0,
          position: "absolute",
          height: 55,
          width: window.width * 1,
          display: 'flex'
        },
        tabBarHideOnKeyboard: true,
        tabBarVisibilityAnimationConfig: {
            duration: 500,
            easing: Easing.linear,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "BottomHome") {
          let color;
            color = focused ? true : false;
            iconName = focused ? "active" : "inactive";
            return (
            <View>
            {color ? (
            <View
                  style={{
                  backgroundColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  width: window.width*0.25,
                    height: 55,
                    borderRightWidth: 0.6,
                    borderRightColor: 'white',
                  
                }}
                >
                  <Icons name="home" size={50} color="#f5e490"/>     
                </View>
            ) : (
            <View
                  style={{
                  backgroundColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  width: window.width*0.25,
                    height: 55,
                    borderRightWidth: 0.6,
                    borderRightColor: 'white',
                  
                }}
                >
                  <Icons name="home" size={40} color="white"/>     
                </View>
            )}
            </View>
            )
          } else if (route.name === "Post") {
            let color;
              color = focused ? true : false;
              iconName = focused ? "active" : "inactive";
              return (
              <View>
              {color ? (
              <View
                    style={{
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: "center",
                    width: window.width*0.25,
                    height: 55,
                    borderRightWidth: 0.6,
                    borderRightColor: 'white'
                    
                  }}
                  >
                    <AntDesign name="pluscircleo" size={50} color="#f5e490"/>     
                  </View>
              ) : (
              <View
                    style={{
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: "center",
                    width: window.width*0.25,
                    height: 55,
                    borderRightWidth: 0.6,
                    borderRightColor: 'white'
                    
                  }}
                  >
                    <AntDesign name="pluscircleo" size={40} color="white"/>     
                  </View>
              )}
              </View>
              )
            } 
          else if (route.name === "BottomTrending") {
          let color;
            color = focused ? true : false;
            iconName = focused ? "active" : "inactive";
            return (
            <View>
            {color ? (
            <View
                  style={{
                  backgroundColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  width: window.width*0.25,
                    height: 55,
                    borderRightWidth: 0.6,
                    borderRightColor: 'white'

                }}
                >
                  <Icons1 name="bar-graph" size={50} color="#f5e490"/>     
                </View>
            ) : (
            <View
                  style={{
                  backgroundColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  width: window.width*0.25,
                    height: 55,
                    borderRightWidth: 0.6,
                    borderRightColor: 'white'
                }}
                >
                  <Icons1 name="bar-graph" size={40} color="white"/>     
                </View>
            )}
            </View>
            )
          } 
          else if (route.name === "BottomProfile") {
          let color;
            color = focused ? true : false;
            iconName = focused ? "active" : "inactive";
            return (
            <View>
            {color ? (
            <View
                  style={{
                  backgroundColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  width: window.width*0.25,
                  height: 55,
                  borderRightWidth: 0.6,
                  borderRightColor: 'white'
                }}
                >
                  <Icons2 name="account-circle" size={50} color="#f5e490"/>     
                </View>
            ) : (
            <View
                  style={{
                  backgroundColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  width: window.width*0.25,
                  height: 55,
                }}
                >
                  <Icons2 name="account-circle" size={40} color="white"/>     
                </View>
            )}
            </View>
            )
          } 
          }
        
      })}
      
    >

<Tab.Screen 
    name="BottomHome" 
    component={BottomHome}
    options={{
      header: (props)=>(
       <SafeAreaView style={{backgroundColor: 'black'}}>
         <BottomHomeHeader />
       </SafeAreaView>
      )
    }}
    />

<Tab.Screen 
    name="BottomTrending"
    component={BottomTrending}
    options={{
      headerShown: false,
    }}  
  />
    
<Tab.Screen 
    name="Post" 
    component={Post}
    options={{
      headerShown: false,
    }}/>

<Tab.Screen 
    name="BottomProfile" 
    component={BottomProfile}
    options={{
      headerShown: false,
    }}
    />
  </Tab.Navigator>
  );
}

export default BottomNav