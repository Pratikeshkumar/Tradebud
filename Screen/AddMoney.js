import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Alert } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons'
import { ActivityIndicator, TextInput } from 'react-native-paper';
import {useState} from 'react'
import functions from '@react-native-firebase/functions';
import { useSelector } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios'
import firestore from '@react-native-firebase/firestore'


const window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

const AddMoney = ({navigation}) => {
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState()
    const [razorpay_order_id, setrazorpay_order_id] = useState()
    const [razorpay_payment_id, setrazorpay_payment_id] = useState()
    const [razorpay_signature, setrazorpay_signature] = useState()
    const [editable, setEditable] = useState(true)
    const userdata = useSelector((state)=>state.userdata)
    const my_profile_data = userdata.my_profile_data;
    const {email, phone_number, first_name, last_name, profile_picture, username} = my_profile_data;  
    const full_name = first_name +" "+ last_name; 
    

const launchRazorpay = ()=>{
    if(price < 10001){
        const time = new Date().getTime()
    setEditable(false)
    setLoading(true)
    const data = { 
        price
    } 
    axios.post('https://us-central1-tradebud1-729f7.cloudfunctions.net/create_order', data).then((res)=>{
        const order_id = res.data.id;
        const amount = res.data.amount;
        var options = {
            description: 'Add Money In Wallet',
            image: profile_picture,
            currency: 'INR',
            key: 'rzp_test_q1FFrVpL7htGYn',
            amount: amount,
            name: full_name,
            order_id: order_id,//Replace this with an order_id created using Orders API.
            prefill: {
              email: email,
              contact: phone_number,
              name: full_name
            },
            theme: {color: '#1b1b1b'}
          }
          RazorpayCheckout.open(options).then((data)=>{
            const razorpay_order_id = data.razorpay_order_id;
            const razorpay_payment_id = data.razorpay_payment_id;
            const razorpay_signature = data.razorpay_signature;
            setrazorpay_order_id(razorpay_order_id)
            setrazorpay_payment_id(razorpay_payment_id)
            setrazorpay_signature(razorpay_signature)
            const data1 = {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            }
            axios.post('https://us-central1-tradebud1-729f7.cloudfunctions.net/order_verify', data1).then((res)=>{
                const message = res.data.message;
                if(message === 'success'){
                    console.log(username, time)
                    try {
                        firestore()
                        .collection('transaction')
                        .doc(username)
                        .collection('transaction_history')
                        .add({
                            deposited: true,
                            timestamp: time,
                            razorpay_order_id: razorpay_order_id,
                            razorpay_payment_id: razorpay_payment_id,
                            razorpay_signature: razorpay_signature,
                            price: price,
                            status: 'deposited'
                        })
                        .then(()=>{
                            Alert.alert('Success', "Money Added successfully")
                            setLoading(false)
                            navigation.navigate('Payment')
                    setEditable(true)
                        }).catch((err)=>{
                            console.log(err)
                        })
                    } catch (error) {
                        console.log(error)
                        
                    }
                }else{
                    Alert.alert("Error", "you have some error in")
                    setLoading(false)
                    setEditable(true)
                }
            }).catch((err)=>{
                console.log(err)
            })

          }).catch((err)=>{
            console.log(err)
          })

        console.log(order_id)
    }).catch((err)=>{
        console.log(err)
    })
    } else{
        Alert.alert("Invalid", "Invalid Amount")
    }
    
}

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
                <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>ADD MONEY</Text>
                <View style={{width: window.width * 0.9, flexDirection: 'row', justifyContent: 'space-between', paddingTop: window.height * 0.08 }}>
            <TextInput
                style={{width: window.width * 0.55}}
                label="ENTER AMOUNT IN ₹"
                theme={{ colors: { primary: "black" } }}
                outlineStyle={{ borderRadius: 10 }}
                mode="flat"
                value={price}
                onChangeText={(val)=>{setPrice(val)}}
                editable={editable}
                keyboardType='numeric'
                maxLength={5}
            />
            {loading ? (
                <TouchableOpacity 
                onPress={launchRazorpay}
                style={{
                    backgroundColor: 'white',
                    width: window.width * 0.3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5
                }}>
                    <ActivityIndicator size={'small'} color='blacks' />
                </TouchableOpacity>
            ):(
                <TouchableOpacity 
                onPress={launchRazorpay}
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
                    }}>ADD </Text>
                </TouchableOpacity>
            )}
            </View>
            <View style={{
                width: window.width * 0.9
            }}>
            <Text style={{color: 'white'}}>maximum limit is ₹ 10000</Text>
            </View>

            </View>
            <StatusBar backgroundColor='black' style='light' />
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default AddMoney

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