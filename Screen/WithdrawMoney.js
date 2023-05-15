import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';

// Initialize Razorpay with your API key
//RazorpayCheckout.setApiKey('YOUR_API_KEY');


const window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

const WithdrawMoney = ({navigation}) => {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.containers}>
            <View style={{width: window.width * 1, padding: 10}}>
                <TouchableOpacity 
                        onPress={()=>{navigation.goBack()}}
                    >
                    <Image style={{
                            width: window.width * 0.09,
                            height: window.height * 0.03,
                        }} source={require("../assets/back.png")} 
                    />          
               </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>WITHDRAW MONEY</Text>
                <View style={{width: window.width * 0.9, flexDirection: 'row', justifyContent: 'space-between', paddingTop: window.height * 0.08 }}>
            <TextInput
                style={{width: window.width * 0.55}}
                label="ENTER UPI ADDRESS"
                theme={{ colors: { primary: "black" } }}
                outlineStyle={{ borderRadius: 10 }}
                mode="flat"
               // value={price}
                //onChangeText={(val)=>{setPrice(val)}}
                
            />
            <TouchableOpacity 
            //onPress={()=>{initialtePayents()}}
            style={{
                backgroundColor: 'white',
                width: window.width * 0.3,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5
            }}>
                <Text style={{
                    fontSize: 17,
                    fontWeight: '500'
                }}> PAYOUT </Text>
            </TouchableOpacity>
            </View>
            </View>
            <StatusBar backgroundColor='black' style='light' />
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default WithdrawMoney

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    header: {
        width: window.width * 1,
        backgroundColor: 'black'
    },
    body: {
        width: window.width * 1,
        alignItems: 'center'
    }
})