import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, FlatList, Alert, ImageBackground, ImageBackgroundBase, ActivityIndicator, RefreshControl, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {StatusBar} from 'expo-status-bar'
import Ionicons from '@expo/vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore';
import BottomHomeHeader from './BottomHomeHeader';
import { Video, ResizeMode } from 'expo-av';
import { useSelector, useDispatch } from "react-redux";
import commentSlice from '../store/commentSlice';
import { myProfileData } from '../store/userdataSlice';
import AntDesign from '@expo/vector-icons/AntDesign'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import StatusHeader from '../Status/StatusHeader';
import { addWatchUserName } from '../store/watchuserSlice';
import { selectedUser } from '../store/userSlice';
import { addWalletMoney } from '../store/walletmoneySlice';
import {BlurView} from 'expo-blur'
import DisplayPost from '../components/DisplayPost';
const window = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }



    
const BottomHome = ({}) => {
  const userdata = useSelector((state)=>state.userdata)
  const [media_post, setMedia_post] = useState();
  const [joined_post, setJoined_post] = useState();
  const my_profile_data = userdata.my_profile_data;
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false);
  const [transaction, setTransaction] = useState()
  const [depositedMoney, setDepositedMoney] = useState()
  const [widthdrawMoney, setWithdrawMoney] = useState()
  const [finalPrice, setFinalPrice] = useState()
  const dispatch = useDispatch()
  const walletmoney = useSelector((state)=>state.walletmoney)
  const [noPost, setNoPost] = useState(false)
// function for loading wallet balance 
useEffect(()=>{
  if(my_profile_data){
    const username = my_profile_data.username;
    try {
      firestore()
      .collection('transaction')
      .doc(username)
      .collection('transaction_history')
      .onSnapshot(quarySnapshot=>{
              const data = [] 
              const deposited = []
              const widthdraw = []
          quarySnapshot.forEach(documentSnapshot=>{
              const Data = documentSnapshot.data();
              const id = documentSnapshot.id;
              Data.id = id;
              data.push(Data)
              const deposites = documentSnapshot.data().deposited;
              const price = Data.price;
              if(deposites){
                  deposited.push(price)
              } else{
                  widthdraw.push(price)
              }
          })
          setTransaction(data.sort((a, b) => a.timestamp - b.timestamp))
          setDepositedMoney(deposited)
          setWithdrawMoney(widthdraw)
      })
  } catch (error) {
      console.log(error)
  }
  }

}, [my_profile_data])
useEffect(()=>{
  if(depositedMoney && widthdrawMoney){
      let depo = 0;
      for(let i = 0; i < depositedMoney.length; i++ ){
          depo += parseInt(depositedMoney[i])
      }
      let draw = 0;
      for(let i = 0; i < widthdrawMoney.length; i++ ){
          draw += parseInt(widthdrawMoney[i])
      }
      dispatch(addWalletMoney(depo - draw))
  } else if(depositedMoney) {
      let depo = 0;
      for(let i = 0; i < depositedMoney.length; i++ ){
          depo += parseInt(depositedMoney[i])
      }
      dispatch(addWalletMoney(depo))
  } else{
      setFinalPrice('0')
  }
}, [depositedMoney, widthdrawMoney, transaction])


// function for loading post data from firestore
  useEffect(()=>{
    if(my_profile_data){
      const followings = my_profile_data.followings;
      if(followings.length != 0){
        try {
          firestore()
          .collection('user_post_data_with_media')
          .where('username', 'in', followings)
          .limit(10)
          .onSnapshot(quarySnapshot=>{
              const data = [];
              const size = quarySnapshot.size;
              console.log(size)
              if(size != 0){
                quarySnapshot.forEach(documentSnapshot=>{
                  const Data = documentSnapshot.data();
                  const id = documentSnapshot.id;
                  Data.id = id;
                  data.push(Data)
              })
              setMedia_post(data)
              } else{
                setNoPost(true)
              }
          })
          
           } catch (error) {
          console.log(error)
        }
      } else{
        setNoPost(true)
      }
    }
  }, [my_profile_data])
  
// function for joining both types of post by the basis of time
useEffect(()=>{
  if(media_post){
    media_post.sort((a, b) => b.timestamp - a.timestamp);
    setJoined_post(media_post)
  }
}, [media_post])
  



// function for calculating how  much time before post has been uploaded
const beforetime = (time1)=>{
  const currentTime = new Date().getTime()
  const milliseconds = currentTime - time1;
  console.log(milliseconds)
  const minute = 60 * 1000; // milliseconds in a minute
    const hour = 60 * minute; // milliseconds in an hour
    const day = 24 * hour; // milliseconds in a day
    const month = 30 * day; // approximate milliseconds in a month
    const year = 365 * day; // approximate milliseconds in a year
    if (milliseconds < minute) {
      return `1 min`;
    } else if (milliseconds < hour) {
      return `${Math.floor(milliseconds / minute)} min`;
    } else if (milliseconds < day) {
      return `${Math.floor(milliseconds / hour)} h`;
    } else if (milliseconds < month) {
      return `${Math.floor(milliseconds / day)} d`;
    } else if (milliseconds < year) {
      return `${Math.floor(milliseconds / month)} mon`;
    } else {
      return `${Math.floor(milliseconds / year)} y`;
    }
  }
  // function for fetching the next data
const fetchData = async () => {
  const usersQuery = firestore()
    .collection('user_post_data_with_media')
    .where('username', 'in', my_profile_data.followings)
    .orderBy('createdAt', 'desc')
    .startAfter(media_post[media_post.length - 1])
    .limit(3)
  const [usersSnapshot, postsSnapshot] = await Promise.all([usersQuery.get()]);
  const usersData = usersSnapshot.docs.map(doc => doc.data());

  setMedia_post(prevMediaPost => prevMediaPost.concat(usersData));
  setText_post(prevTextPost => prevTextPost.concat(postsData));
}

  

  
  return (
    
      <ScrollView 
        nestedScrollEnabled={true}
        contentContainerStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          flex: 1,
     }}>
      <StatusHeader navigation={navigation} my_profile_data={my_profile_data} />
     {joined_post && <FlatList
            data={joined_post}
            onEndReached={fetchData}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={()=>{console.log('shubham')}}  />
            }
            renderItem={({item, index})=>
            <DisplayPost item={item} index={index} navigation={navigation} />
          }
        
         /> }
         {!joined_post && !noPost && <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}> 
            <ActivityIndicator size={'large'} color={'white'} />
          </View>}
        {noPost && <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            <Text style={{color: 'white'}}>Follow someone to see </Text>
          </View>}

      
      <StatusBar backgroundColor='black' style='light'  />
      </ScrollView>
    
  )
}

export default BottomHome

const styles = StyleSheet.create({
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
}
})




