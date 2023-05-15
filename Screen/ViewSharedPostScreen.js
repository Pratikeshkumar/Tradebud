import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import DisplayPost from '../components/DisplayPost'


const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}



const ViewSharedPostScreen = ({navigation, route}) => {
    const {id} = route.params;
    const [post_data, setPost_data] = useState()

    useEffect(()=>{
        try {
            firestore()
            .collection('user_post_data_with_media')
            .doc(id)
            .onSnapshot(documentSnapshot=>{
              const data = documentSnapshot.data()
              data.id = id;
              setPost_data(data)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{
         backgroundColor: 'black',
         width: window.width * 1,
         height: window.height * 1,
         justifyContent: 'center',
         alignItems: 'center'
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
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>Payments</Text>
                    </View>
                </View>
        <DisplayPost item={post_data} index={1} navigation={navigation} />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default ViewSharedPostScreen

const styles = StyleSheet.create({})












