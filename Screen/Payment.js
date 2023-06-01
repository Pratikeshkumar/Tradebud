import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    FlatList,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore'
import { ActivityIndicator } from "react-native-paper";



const window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}



const Payment = ({navigation}) => {
    const userdata = useSelector((state)=>state.userdata)
    const my_profile_data = userdata.my_profile_data;
    const username = my_profile_data.username;
    const [transaction, setTransaction] = useState()
    const [depositedMoney, setDepositedMoney] = useState()
    const [widthdrawMoney, setWithdrawMoney] = useState()
    const [finalPrice, setFinalPrice] = useState()

    useEffect(() => {
        const unsubscribe = firestore()
          .collection('transaction')
          .doc(username)
          .collection('transaction_history')
          .onSnapshot((querySnapshot) => {
            const data = [];
            const deposited = [];
            const widthdraw = [];
      
            querySnapshot.forEach((documentSnapshot) => {
              const Data = documentSnapshot.data();
              const id = documentSnapshot.id;
              Data.id = id;
              data.push(Data);
      
              const deposites = Data.deposited;
              const price = Data.price;
              if (deposites) {
                deposited.push(price);
              } else {
                widthdraw.push(price);
              }
            });
      
            setTransaction(data.sort((a, b) => a.timestamp - b.timestamp));
            setDepositedMoney(deposited);
            setWithdrawMoney(widthdraw);
          });
      
        return () => unsubscribe();
      }, []);
      



    // useEffect(()=>{
    //     if(depositedMoney && widthdrawMoney){
    //         let depo = 0;
    //         for(let i = 0; i < depositedMoney.length; i++ ){
    //             depo += parseInt(depositedMoney[i])
    //         }
    //         let draw = 0;
    //         for(let i = 0; i < widthdrawMoney.length; i++ ){
    //             draw += parseInt(widthdrawMoney[i])
    //         }
    //         setFinalPrice(depo - draw)
    //     } else if(depositedMoney) {
    //         let depo = 0;
    //         for(let i = 0; i < depositedMoney.length; i++ ){
    //             depo += parseInt(depositedMoney[i])
    //         }
    //         setFinalPrice(depo)
    //     } else{
    //         setFinalPrice('0')
    //     }
    // }, [depositedMoney, widthdrawMoney, transaction])
    useEffect(() => {
        if (depositedMoney && widthdrawMoney) {
          let depo = 0;
          let draw = 0;
      
          for (let i = 0; i < depositedMoney.length; i++) {
            depo += parseInt(depositedMoney[i]);
          }
      
          for (let i = 0; i < widthdrawMoney.length; i++) {
            draw += parseInt(widthdrawMoney[i]);
          }
      
          setFinalPrice(depo - draw);
        } else if (depositedMoney) {
          let depo = 0;
      
          for (let i = 0; i < depositedMoney.length; i++) {
            depo += parseInt(depositedMoney[i]);
          }
      
          setFinalPrice(depo);
        } else {
          setFinalPrice('0');
        }
      }, [depositedMoney, widthdrawMoney, transaction]);
      




    return (
        <>
        {!transaction ? (
            <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color="white" />
            </View>
        ):(
            <SafeAreaProvider>
            <SafeAreaView style={{
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                flex: 1,
                alignItems: 'center',
                width: window.width * 1
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
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: window.width * 0.9,
                    padding: window.width * 0.05,
                    borderWidth: 0.4,
                    borderColor: 'white',
                    marginHorizontal: window.width * 0.04,
                    marginTop: 20,
                    borderRadius: window.width * 0.02
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: '800'
                    }}>
                        Total Balance
                    </Text>
                    <Text style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: '800'
                    }}>
                       ₹ {finalPrice}
                    </Text>
                </View>
                {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: window.height * 0.07 }}>
                    <Image style={{
                        width: window.width * 0.44,
                        height: window.height * 0.21,
                    }} source={require("../assets/activity.png")} />
    
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "400", marginTop: window.height * 0.04 }}>No History</Text>
                </View> */}
                <View style={{ marginHorizontal: window.width * 0.05, marginBottom: 15 }}>
                    {/* <Text style={{ color: "#fff", fontSize: 20, fontWeight: "400", marginTop: window.height * 0.04 }}>Settings</Text> */}
    
                    <View style={{ marginTop: window.height * 0.01, width: window.width * 0.9, }}>
                        <TouchableOpacity
                            onPress={()=>{
                                navigation.navigate('AddMoney')
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.02 }}>
                                <Image style={{
                                    width: window.width * 0.09,
                                    height: window.height * 0.03,
                                }} source={require("../assets/pm.png")} />
    
                                <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05, color: "#fff" }}>Add Money</Text>
                            </View>
                            
                        </TouchableOpacity>
    
                        <TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.02 }}>
                                <Image style={{
                                    width: window.width * 0.085,
                                    height: window.height * 0.04,
                                }} source={require("../assets/contact.png")} />
    
                                <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05, color: "#fff" }}>Contact info</Text>
                            </View>
                        </TouchableOpacity>
    
                        <TouchableOpacity 
                            onPress={()=>{navigation.navigate('WithdrawMoney')}}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.02 }}>
                                <Image style={{
                                    width: window.width * 0.09,
                                    height: window.height * 0.03,
                                }} source={require("../assets/pm.png")} />
    
                                <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05, color: "#fff" }}>Withdraw</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    width: window.width * 1,
                    alignItems: 'center',
                    flex: 1,
                }}>
                    <FlatList
                        data={transaction}
                        renderItem={({item, inedx})=>
                        <DisplayHistory item={item} inedx={inedx} />
                    }
                    
                    />
                </View>
                <StatusBar backgroundColor={"black"} style='light' />
            </SafeAreaView>
            </SafeAreaProvider>
        )}
        </>
    )
}
export default Payment;


const DisplayHistory = ({item})=>{
    const date = new Date(item.timestamp)



    return(
        <View style={{
            width: window.width * 0.9,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'pink',
            padding: 10,
            marginTop: 10,
            borderRadius: 4

        }}> 
           <View>
           <Text style={{color: '#3e4e94', fontWeight: '400', fontSize: 15}}>{item.status.toUpperCase()}</Text>
           <Text style={{fontSize: 10}}>{date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()}</Text>
           <Text style={{fontSize: 10}}>{date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()}</Text>
           </View>
            <Text style={{color: 'green', fontWeight: '700', fontSize: 18}}>₹ {item.price}</Text>
            
        </View>
    )
}