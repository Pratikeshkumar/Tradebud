import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Alert, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Entypo from '@expo/vector-icons/Entypo'
import firestore from '@react-native-firebase/firestore';
import { addmessageUser } from '../store/messageSlice'
import { selectedUser } from '../store/userSlice'
import { myProfileData } from '../store/userdataSlice'
import AntDesign from '@expo/vector-icons/AntDesign'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import { Video, ResizeMode } from 'expo-av'
import { addCommentChecking } from '../store/commentSlice'
import DisplayPost from '../components/DisplayPost'

const window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }

const WatchUserProfile = () => {
    const [isfollowers, setisFolllowers] = useState()
    const dispatch = useDispatch()  
    const user = useSelector((state)=>state.user)
    const selected_user = user.selected_user;
    const navigation = useNavigation()
    const {username, followers, followings, profile_picture,  } = selected_user[0];
    // const No_Of_followers = followers.length;
    // const No_of_followings = followings.length;
    const userdata = useSelector((state)=>state.userdata)
    const my_profile_data = userdata.my_profile_data;
    const myusername = userdata.my_profile_data.username;
    const [mediaPost, setMediaPost] = useState()
    const [no_media, setNo_media] = useState()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);


// function for managing the real time change of user profile
    useEffect(()=>{
        const data = firestore()
        .collection('user_profile_data')
        .doc(username)
        .onSnapshot(documentSnapshot =>{
            dispatch(selectedUser(documentSnapshot.data()))
            setLoading(false)
        })
        return () => data();
    }, [])

//function for handling real time changes of myprofiledata
    useEffect(()=>{
        const data = firestore()
        .collection('user_profile_data')
        .where('username', '==', myusername)
        .onSnapshot(quarySnapshot=>{
            quarySnapshot.forEach(documentSnapshot=>{
                dispatch(myProfileData(documentSnapshot.data()))
            })
            
        })
        return () => data();
    }, [])


// function for fetching media post data and no_of_post
const fetchMediaPost = async()=>{
    try {
        firestore()
        .collection('user_post_data_with_media')
        .where('username', '==', username)
        .get()
        .then(quarySnapshot =>{
            const size = quarySnapshot.size;
            setNo_media(size)
            const mediaData = []
            quarySnapshot.forEach(documentSnapshot=>{
                const data = documentSnapshot.data()
                const id = documentSnapshot.id
                data.id = id
                mediaData.push(data)
            })
            setMediaPost(mediaData)
        })
    } catch (error) {
        console.log(error)
    }
}

useEffect(()=>{
    fetchMediaPost()
}, [])
// function for joining both type of data
useEffect(()=>{
        if(mediaPost){
            setData(mediaPost)
            setLoading(false)
        }
}, [mediaPost])


//function for followings other people 
const followThisGuy = async (username)=>{
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
//function for unfollowing other people 
const unfollowThisGuy = async (username)=>{
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
 

// function for showing what we show follow, followings, unfollow
const displayfollowsection = ()=>{
    const user_followers = selected_user[0].followers.includes(myusername)
    const user_followings = selected_user[0].followings.includes(myusername)
    const my_followers = my_profile_data.followers.includes(username)
    const my_followings = my_profile_data.followings.includes(username)
    console.log(user_followers, user_followings, my_followers, my_followings)
    if(!user_followers && !my_followings){
        return(
                <TouchableOpacity 
                    onPress={()=>{followThisGuy(selected_user[0].username)}}
                    style={[styles.button, {backgroundColor: '#5a5ff2'}]}>
                    <Text style={{color: '#e6e4e1', fontSize: 17}}>Follow</Text>
                </TouchableOpacity>
        )
    } else if(user_followers && my_followings){
        return(
            <TouchableOpacity 
                    onPress={()=>{unfollowThisGuy(selected_user[0].username)}}
                    style={[styles.button, {backgroundColor: '#e6e4e1'}]}>
                    <Text style={{color: 'black', fontSize: 17}}>Following</Text>
            </TouchableOpacity>
        )
    }
}






  return (
    <>
    {loading ? (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.9)'
        }}>
            <ActivityIndicator size={'large'} color={'white'} />
        </View>
    ):(
        <SafeAreaProvider>
        <SafeAreaView style={styles.containers}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.goBack()
                    }}
                >
                <Ionicons
                    size={40}
                    color={'white'}
                    name='arrow-back'
                />
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    width: window.width * 0.8,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>
                    {username}
                </Text>
                <Entypo
                    name='dots-three-vertical'
                    size={20}
                    color={"white"}
                    
                />
                </View>
            </View>
            <View style={styles.secondView}>
                <View style={{
                    width: window.width * 0.3
                }}>
                <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image
                        source={{uri: selected_user[0].profile_picture}}
                        style={{
                            width: 70,
                            height: 70,
                            borderRadius: 35
                        }}
                    />
                    </TouchableOpacity>
                    <Text style={styles.txt}>{selected_user[0].first_name} {selected_user[0].last_name}</Text>
                    <Text style={styles.txt}>{selected_user[0].about_us}</Text>
                </View>
                <View style={styles.followersView}>
                    <View style={styles.textView}>
                        <Text style={[styles.txt, {}]}>{no_media}</Text>
                        <Text style={[styles.txt, {}]}>Posts</Text>
                    </View>
                    <View style={styles.textView}>
                        <Text style={[styles.txt, {}]}>{selected_user[0].followers.length}</Text>
                        <Text style={[styles.txt, {}]}>Followers</Text>
                    </View>
                    <View style={styles.textView}>
                        <Text style={[styles.txt, {}]}>{selected_user[0].followings.length}</Text>
                        <Text style={[styles.txt, {}]}>Following</Text>
                    </View>
                </View>
            </View>
            <View style={styles.thirdView}>
                <View style={{backgroundColor: 'white', width: window.width * 0.4, borderRadius: window.width * 0.2, height: 40}}>
                   {displayfollowsection()}
                </View>
                <TouchableOpacity 
                    onPress={()=>{
                        dispatch(addmessageUser(selected_user[0]))
                        navigation.navigate("UserChat")
                    }}                
                    style={styles.button}>
                    <Text style={{color: 'black', fontSize: 17}}>message</Text>
                </TouchableOpacity>
            </View>
            {!data ? (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size={'small'} color={'white'} />
                </View>
            ):(
                <View style={styles.postView}>
                <FlatList
                   data={data}
                   refreshControl={
                     <RefreshControl refreshing={refreshing} onRefresh={()=>{console.log('shubham')}} />  
                   }
                   renderItem={({item, index})=>(
                       <DisplayPost item={item} index={index} navigation={navigation} />
                   )}
               
               />
       </View>
            )}
            <View style={{height: 70,}}>

            </View>
            <StatusBar backgroundColor='black' style="light" />
        </SafeAreaView>
    </SafeAreaProvider>
    )}
    </>
  )
}
export default WatchUserProfile









const styles = StyleSheet.create({
    containers: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        width: window.width * 0.96,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    followersView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: window.width * 0.55
    },
    txt: {
        color: 'white',
        
    },
    secondView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: window.width * 1,
        marginTop: 0,
    },
    textView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    thirdView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: window.width * 0.9,
       // paddingHorizontal: 20,
        marginTop: 5,
        paddingBottom: 10
    },
    button: {
        backgroundColor: '#fff',
        width: window.width * 0.4,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderRadius: window.width * 0.2,
        height: 40
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})