import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions
} from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'



const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

const Notification = ({navigation}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'black'
      }}>
        <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    marginTop: window.height * 0.02,
                    width: window.width * 1
                    }}>
                    <TouchableOpacity
                     onPress={()=>{
                        navigation.goBack()
                      }}
                    >
                        <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: window.width * 0.05 }}>
                            <Image style={{
                                width: window.width * 0.09,
                                height: window.height * 0.02,
                            }} source={require("../assets/back.png")} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: window.width * 0.25 }}>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>Notification</Text>
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: 'white'}}>You don't have any notification</Text>
                </View>
        <StatusBar backgroundColor='black' style='light' />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Notification

const styles = StyleSheet.create({})