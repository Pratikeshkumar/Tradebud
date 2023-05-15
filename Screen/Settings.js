import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SearchBar } from "react-native-elements";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store'
import {useDispatch} from 'react-redux'
import { setLogined } from "../store/authSlice";



const Settings = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch()

    const deleteItem = async()=>{
      await SecureStore.deleteItemAsync('username')
      dispatch(setLogined(false))
      navigation.navigate('GettingStarted')
    }


    const window = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }



    return (
      <SafeAreaProvider>
        <SafeAreaView style={{
            backgroundColor: "black",
            flex: 1
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.02 }}>

          
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
                <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: window.width * 0.25 }}>
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>Settings</Text>
                </View>
            </View>

            <SearchBar
        placeholder="Search"
        onChangeText={(search) => setSearch(search)}
        value={search}
        containerStyle={{
          marginTop: window.width * 0.04,
          backgroundColor: "#000",
          borderRadius: 20,
          marginHorizontal: window.width * 0.03
        }}
       placeholderTextColor={"#fff"}
       
        inputContainerStyle={{ backgroundColor: "rgba(255, 255, 255, 0.4)", borderRadius: 20 }}
      />

            <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.03, marginHorizontal: window.width * 0.04 }}>
              <Image style={{
                width: window.width * 0.08,
                height: window.height * 0.03,
              }} source={require("../assets/discover_white.png")} />

              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05 , color: "#fff"}}>Follow & Invite friends</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{
            navigation.navigate('Notification')
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.03, marginHorizontal: window.width * 0.06 }}>
              <Image style={{
                width: window.width * 0.05,
                height: window.height * 0.03,
              }} source={require("../assets/notifications.png")} />

              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.055, color: "#fff" }}>Notifications</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
           onPress={()=>{
            navigation.navigate('BottomProfile')
          }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.03, marginHorizontal: window.width * 0.04 }}>
              <Image style={{
                width: window.width * 0.08,
                height: window.height * 0.04,
              }} source={require("../assets/contact.png")} />

              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05, color: "#fff" }}>Account</Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
           onPress={()=>{
            navigation.navigate('About')
          }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.03, marginHorizontal: window.width * 0.04 }}>
              <Image style={{
                width: window.width * 0.07,
                height: window.height * 0.035,
              }} source={require("../assets/help.png")} />

              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.06, color: "#fff" }}>About us</Text>
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={deleteItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.03, marginHorizontal: window.width * 0.04 }}>
              <Image style={{
               width: window.width * 0.07,
               height: window.height * 0.035,
              }} source={require("../assets/logout.png")} />

              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.06, color: "#fff" }}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Settings;