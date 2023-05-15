import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, TurboModuleRegistry, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { myProfileData } from '../store/userdataSlice';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';



const window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

const Followings = ({navigation, route}) => {
        const {username, followings, followers} = route.params
        const userdata = useSelector((state)=>state.userdata)
        const my_profile_data = userdata.my_profile_data;
        const [following_list, setFollowings_list] = useState('')
        const [loading, setLoading] = useState(false)
        const [isList, setIsList] = useState(false)
        

        // fetching the followings users data from firestore
useEffect(()=>{
    if(followings.length){
        try {
            firestore()
            .collection('user_profile_data')
            .where('username', 'in', followings)
            .get()
            .then(quarySnapshot=>{
                const data = []
                const size = quarySnapshot.size;
                if(size){
                    quarySnapshot.forEach(documentSnapshot=>{
                        const Data = documentSnapshot.data()
                        const id = documentSnapshot.id;
                        Data.id = id;
                        data.push(Data)
                    })
                    setFollowings_list(data)
                } else{
                    setIsList(true)
                }
            })
            
        } catch (error) {
            console.log(error)
        }
    } else{
        setIsList(true)
    }
}, [])




  return (
    <SafeAreaProvider>
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'black'
        }}>
            <View 
                style={{ 
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
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>
                           Followings
                        </Text>
                    </View>
                </View>
                {following_list && <View style={{flex: 1,}}>
                    <FlatList
                        data={following_list}
                        renderItem={({item, index})=>(
                            <DisplayFollowingsList item={item} index={index} />
                        )}
                    />
                </View>}
                { !following_list && !isList && <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}> 
                        <ActivityIndicator size={'small'} color='white' />
                    </View>}
                    {isList && <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                            <Text style={{color: 'white'}}>You doesn't have any following</Text>
                        </View>}
                    
            <StatusBar backgroundColor='black' style='light' />
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Followings;

const DisplayFollowingsList = ({item, index})=>{
    const userdata = useSelector((state)=>state.userdata)
    const my_profile_data = userdata.my_profile_data;
    const myusername = my_profile_data.username;
    const username = item.username;
    const [data, setData] = useState(item)
    const [myProfileData, setMyProfileData] = useState(my_profile_data)
    const followings = myProfileData.followings;
    const isFollowings = followings.includes(data.username);
    const navigation = useNavigation()

// function for fetching the my profile data from firestore 
    useEffect(()=>{
        try {
            firestore()
            .collection('user_profile_data')
            .doc(myusername)
            .onSnapshot(documentSnapshot=>{
                const data = documentSnapshot.data()
                setMyProfileData(data)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])




// function for getting the latest data of user
    useEffect(()=>{
            try {
                firestore()
                .collection('user_profile_data')
                .doc(username)
                .onSnapshot(documentSnapshot=>{
                    const data = documentSnapshot.data();
                    setData(data)
                })
                
            } catch (error) {
                console.log(error)
            }
    }, [])





    // function for followings user
    const followThisGuy = async ()=>{
        try {
         firestore()
         .collection('user_profile_data')
         .doc(username)
         .update({
             followers: firestore.FieldValue.arrayUnion(myusername)
         })
         .then(()=>{
             console.log("success")
         })
         try {
             firestore()
             .collection('user_profile_data')
             .doc(myusername)
             .update({
                 followings: firestore.FieldValue.arrayUnion(username)
             })
             .then(()=>{
                 console.log('success')
             })
         } catch (error) {
             console.log(error)
         }
         
        } catch (error) {
         console.log(error)
        }
     }

     // function for unfollowings the users
     const unfollowThisGuy = async ()=>{
        try {
         firestore()
         .collection('user_profile_data')
         .doc(username)
         .update({
             followers: firestore.FieldValue.arrayRemove(myusername)
         })
         .then(()=>{
             console.log('success')
         })
         try {
            firestore()
             .collection('user_profile_data')
             .doc(myusername)
             .update({
                 followings: firestore.FieldValue.arrayRemove(username)
             })
             .then(()=>{
                console.log("success")
             })
         } catch (error) {
            console.log(error)
         }
         
        } catch (error) {
         console.log(error)
        }
     }
     

    
    return(
        <View style={{
            flex: 1,
            flexDirection: 'row',
            marginBottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            width: window.width * 1,
            paddingHorizontal: window.width * 0.05,
            justifyContent: 'space-between',
            marginTop: 15,
            alignItems: 'center',
            
        }}>
           <View style={{
            flexDirection: 'row',
            width: window.width * 0.6
           }}>
            <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate("WatchUserProfileFromFeed", {
                        username: item.username
                    })
                }}
            >
            <Image
                    source={{uri: item.profile_picture}}
                    style={{width: 46, height: 46, borderRadius: 23}}
                />
            </TouchableOpacity>
            <View style={{
                marginLeft: 10
            }}>
            <Text style={{color: 'white'}}>{item.first_name +" "+ item.last_name}</Text>
            <Text style={{color: 'white'}}>{item.username }</Text>
            </View>
           </View>
           {}
           {!isFollowings && <TouchableOpacity 
            onPress={followThisGuy}
                style={{
                    backgroundColor: '#5a5ff2',
                    paddingVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 40,
                    borderRadius: 35

                }}>
            <Text style={{color: 'white', }}>Follow</Text>
           </TouchableOpacity>}
           {isFollowings && <TouchableOpacity 
            onPress={unfollowThisGuy}
                style={{
                    backgroundColor: 'white',
                    paddingVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 30,
                    borderRadius: 35

                }}>
            <Text style={{color: 'black', }}>Following</Text>
           </TouchableOpacity>}
            
        </View>
    )
}






const styles = StyleSheet.create({})