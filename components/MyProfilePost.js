import { Alert, FlatList, StyleSheet, Text, View, Dimensions,  Image, TouchableOpacity, RefreshControl } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import { Video, ResizeMode } from 'expo-av';
// import Image from 'expo-image'
import AntDesign from '@expo/vector-icons/AntDesign'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import Entypo from '@expo/vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentChecking } from '../store/commentSlice';
import firestore from '@react-native-firebase/firestore'
import { addPhotoPost } from '../store/postSlice';
const window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}





const MyProfilePost = ({data, navigation, username}) => {
    
  const [refreshing, setRefreshing] = useState(false);

    
  return (
    <View style={{flex: 1}}>
        <FlatList
            data={data}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={()=>{console.log('shubham')}} />
            }
            renderItem={({item, index})=>(
              <DisplayPost item={item} index={index} navigation={navigation} username={username} />
            )}
        
        />
    </View>
  )
}

export default MyProfilePost

const styles = StyleSheet.create({
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})


const DisplayPost = ({item, index, navigation})=>{
  // state for managing data of the users
    const [data, setData] = useState(item)
  // state for managing the video state
    const [status, setStatus] = useState({})
    const userdata = useSelector((state)=>state.userdata)
    const {username} = userdata.my_profile_data;
    const video = React.useRef(null)
    const dispatch = useDispatch()
    const [isliked, setLiked] = useState(true)
    const id = data.id;
  
// function for sharing my post to other users

const shareMessage = async () => {
  try {
    const result = await Share.share({
      message: `tradebud://WatchUserProfileFromFeed/${username}`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    console.error(error);
  }
};


 
  // function for likeing the post 
  const likeThisPost = async()=>{
    try {
      firestore()
      .collection('user_post_data_with_media')
      .doc(data.id)
      .update({
        likes: firestore.FieldValue.arrayUnion(username)
    })
    } catch (error) {
      console.log(error)
    }
  }
  // unlike the post 
  const unlikeThisPost = async()=>{
    try {
      firestore()
      .collection('user_post_data_with_media')
      .doc(data.id)
      .update({
        likes: firestore.FieldValue.arrayRemove(username)
    })
    } catch (error) {
      console.log(error)
    }
  }
  //function for listening the user post 
  useEffect(()=>{
    try {
      firestore()
      .collection('user_post_data_with_media')
      .doc(data.id)
      .onSnapshot(documentSnapshot=>{
        const data = documentSnapshot.data();
        data.id = id;
        setData(data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])
  // function for adding reached
  const addViewed = async()=>{
    try {
      firestore()
      .collection('user_post_data_with_media')
      .doc(item.id)
      .update({
        reached: firestore.FieldValue.arrayUnion(username)
    })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    const viewed = item.reached.includes(username)
    if(!viewed){
      addViewed()
    }
  }, [])
  
  
  
  
  
  // function for calculating how  much time before post has been uploaded
  const beforetime = (time1)=>{
    const currentTime = new Date().getTime()
    const milliseconds = currentTime - time1;
    const minute = 60 * 1000; // milliseconds in a minute
      const hour = 60 * minute; // milliseconds in an hour
      const day = 24 * hour; // milliseconds in a day
      const month = 30 * day; // approximate milliseconds in a month
      const year = 365 * day; // approximate milliseconds in a year
      if (milliseconds < minute) {
        return `1 min`;
      } else if (milliseconds < hour) {
        return `${Math.floor(milliseconds / minute)}min`;
      } else if (milliseconds < day) {
        return `${Math.floor(milliseconds / hour)}h`;
      } else if (milliseconds < month) {
        return `${Math.floor(milliseconds / day)}d`;
      } else if (milliseconds < year) {
        return `${Math.floor(milliseconds / month)}mon`;
      } else {
        return `${Math.floor(milliseconds / year)}y`;
      }
    }
    
  
    return(
        <View style={{flex: 1, width: window.width * 1, marginTop: 10, paddingLeft: window.width * 0.02, paddingRight: window.width * 0.02, flexDirection: 'row' }}>
  
            {/* Post Profile Picture */}
            <View style={{width: window.width * 0.2,}}>
                <Image 
                    source={{uri: data.profile_picture}}
                    style={{width: 56, height: 56, borderRadius: 28}}
                />
            </View>
            {/* Post body content */}
            <View style={{width: window.width * 0.75}} >
                {/* Post Header */}
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>{data.username.substring(0, 15)}</Text>
                    {item.monetize && <Text style={{color: 'grey', fontWeight: '900', fontSize: 10}}>monetize</Text>}
                    </View>
                    <Text style={{color: 'white', marginLeft: 20}}>.{beforetime(data.timestamp)} ago</Text>
                </View>
                {/* Post Text */}
                <View>
                    <Text style={{color: 'white'}}>{data.text}</Text>
                </View>
                {/* Post media */}
                {data.image_url && <TouchableOpacity 
                onPress={()=>{
                  dispatch(addPhotoPost(item))
                  navigation.navigate('PhotoScreen')}}
                style={{flex: 1, width: window.width * 0.75, height: 200 }}>
                    <Image
                        source={{uri: data.image_url}}
                        style={{flex: 1, }}
                        resizeMode='contain'
                        resizeMethod='scale'
                    />
                </TouchableOpacity> 
                }
                {data.video_url &&
                <TouchableOpacity  onPress={()=>{
                  dispatch(addVideoPost(item))
                  navigation.navigate("VideoPlayerScreen")
                }}>
                 <Video
                      ref={video}
                      style={{width: window.width * 0.75, height: 160}}
                      source={{uri: data.video_url}}
                      resizeMode={ResizeMode.CONTAIN}
                      onPlaybackStatusUpdate={status=> setStatus(()=>status)}
                      posterSource={{uri: 'https://firebasestorage.googleapis.com/v0/b/tradebud-727d2.appspot.com/o/blur.png?alt=media&token=f5f059c8-cb06-4f5f-a994-19ac1f8a05f3'}}
                      usePoster={true}
                      isLooping
                     />
                     <TouchableOpacity 
                        onPress={()=>{
                          status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                        }}
                      >
                        {status.isPlaying ? (
                          <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 0.5,
                            borderColor: 'white',
                            padding: 5,
                            backgroundColor: 'white',
                            borderRadius: 30,
                            marginTop: 10,
                            marginBottom: 10
                          }}>
                          <Entypo name='controller-paus' size={30} color={'black'} />
                          </View>
                        ):(
                          <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 0.5,
                            borderColor: 'white',
                            padding: 5,
                            backgroundColor: 'white',
                            borderRadius: 30,
                            marginTop: 10,
                            marginBottom: 10
                          }}>
                            {/* <Text style={{color: 'black', fontSize: 20}}>Pay ₹ 10 to </Text> */}
                            <Entypo name='controller-play' size={30} color={'black'} />
                          </View>
                        )}
                      </TouchableOpacity>
                    </TouchableOpacity>}
  
                    {/* Post Footer */}
            <View style={{width: window.width * 0.75, marginTop: window.height * 0.01, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                {data.likes.includes(username) ? (
                    <TouchableOpacity 
                        style={styles.postFooter}
                        onPress={unlikeThisPost}
                    >
                    <AntDesign name='like1' color={'lightblue'} size={25}/>
                    <Text style={{color: 'white', marginLeft: 5}}>{data.likes.length}</Text>
                </TouchableOpacity>
                ) : (
                    <TouchableOpacity 
                    style={styles.postFooter}
                    onPress={likeThisPost}
                    >
                    <AntDesign name='like2' color={'white'} size={25}/>
                    <Text style={{color: 'white', marginLeft: 5}}>{data.likes.length}</Text>
                </TouchableOpacity>
                )}
                <TouchableOpacity onPress={()=>{navigation.navigate('MyPostComment', {data: data})}}>
                <EvilIcons name='comment' size={25} color={"white"} />
                </TouchableOpacity>
                <View style={styles.postFooter}>
                <EvilIcons name='arrow-up' size={25} color={"white"} />
                <Text style={{color: 'white', marginLeft: 5}}>{data.reached.length}</Text>
                </View>
                <TouchableOpacity onPress={shareMessage}>
                <EvilIcons name='share-google' size={25} color={"white"} />
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
  }