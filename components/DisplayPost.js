import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, FlatList, Alert, ImageBackground, ImageBackgroundBase, ActivityIndicator, RefreshControl, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar'
import Ionicons from '@expo/vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore';
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
import { BlurView } from 'expo-blur'
import { addPhotoPost, addVideoPost } from '../store/postSlice';
import { Dialog } from 'react-native-elements';

const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

const DisplayPost = ({ item, index, navigation }) => {
  // state for managing data of the users
  const [data, setData] = useState(item)
  // state for managing the video state
  const [status, setStatus] = useState({})
  const userdata = useSelector((state) => state.userdata)
  const { username, purchased_post } = userdata.my_profile_data;
  const video = React.useRef(null)
  const dispatch = useDispatch()
  const [isliked, setLiked] = useState(true)
  const id = data.id;
  const [purchased_video, setPurchase_video] = useState(purchased_post.includes(id))
  const [loading, setLoading] = useState(false)
  const walletmoney = useSelector((state) => state.walletmoney)

  // function for sharing the post to other users

  const shareMessage = async () => {
    try {
      const result = await Share.share({
        message: `tradebud://ViewSharedPostScreen/${id}`,
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



  // function for like the post 
  const likeThisPost = async () => {
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
  const unlikeThisPost = async () => {
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
  useEffect(() => {
    let unsubscribe;

    try {
      const query = firestore()
        .collection('user_post_data_with_media')
        .doc(data.id);

      unsubscribe = query.onSnapshot(documentSnapshot => {
        const data = documentSnapshot.data();
        data.id = id;
        setData(data);
      });
    } catch (error) {
      console.log(error);
    }

    return () => {
      // Unsubscribe from the snapshot listener when component unmounts
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);




  // function for adding reached
  const addViewed = async () => {
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
  useEffect(() => {
    const viewed = item.reached.includes(username)
    if (!viewed) {
      addViewed()
    }
  }, [])





  // function for calculating how  much time before post has been uploaded
  const beforetime = (time1) => {
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
  // function for purchasing the video
  // const purchasedVideo = async ()=>{
  //   const walletMoney = walletmoney.money;
  //   const videoPrice = data.price
  //   if(walletMoney >= videoPrice){
  //     setLoading(true)
  //   try {
  //     firestore()
  //     .collection('user_profile_data')
  //     .doc(username)
  //     .update({
  //       purchased_post: firestore.FieldValue.arrayUnion(id)
  //     })
  //     .then(()=>{
  //       try {
  //       firestore()
  //       .collection('transaction')
  //       .doc(username)
  //       .collection('transaction_history')
  //       .add({
  //         deposited: false,
  //         price: data.price,
  //         status: 'Post Purchase',
  //         post_id: data.id,
  //         timestamp: new Date().getTime()
  //       })
  //       .then(()=>{
  //         setPurchase_video(true)
  //         setLoading(false)
  //         try {
  //           firestore()
  //           .collection('transaction')
  //           .doc(data.username)
  //           .collection('transaction_history')
  //           .add({
  //             deposited: true,
  //             price: data.price,
  //             status: 'Post Income',
  //             post_id: data.id,
  //             timestamp: new Date().getTime()
  //           })
  //         } catch (error) {
  //           console.log(error)
  //         }
  //       })
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   } else{
  //     Alert.alert("insufficient balance", "You don't have sufficient balance in your wallet, add money to see")

  //   }

  // }
  const purchasedVideo = async () => {
    const walletMoney = walletmoney.money;
    const videoPrice = data.price;

    if (walletMoney >= videoPrice) {
      setLoading(true);

      try {
        await firestore()
          .collection('user_profile_data')
          .doc(username)
          .update({
            purchased_post: firestore.FieldValue.arrayUnion(id),
          });

        const timestamp = new Date().getTime();

        const transactionData = {
          deposited: false,
          price: videoPrice,
          status: 'Post Purchase',
          post_id: data.id,
          timestamp: timestamp,
        };

        const incomeData = {
          deposited: true,
          price: videoPrice,
          status: 'Post Income',
          post_id: data.id,
          timestamp: timestamp,
        };

        const batch = firestore().batch();

        const transactionRef = firestore()
          .collection('transaction')
          .doc(username)
          .collection('transaction_history')
          .doc();

        const incomeRef = firestore()
          .collection('transaction')
          .doc(data.username)
          .collection('transaction_history')
          .doc();

        batch.set(transactionRef, transactionData);
        batch.set(incomeRef, incomeData);

        await batch.commit();

        setPurchase_video(true);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert(
        'Insufficient balance',
        "You don't have sufficient balance in your wallet, add money to proceed."
      );
    }
  };




  return (
    <View style={{ flex: 1, width: window.width * 1, paddingLeft: window.width * 0.02, paddingRight: window.width * 0.02, flexDirection: 'row' }}>

      {/* Post Profile Picture */}
      <View style={{ width: window.width * 0.18}}>
        <TouchableOpacity
          onPress={() => {
            // dispatch(addWatchUserName(data.username))
            navigation.navigate("WatchUserProfileFromFeed", {
              username: data.username
            })
          }}
        >
          <Image
            source={{ uri: data.profile_picture, cache: 'reload' }}
            style={{ width: 56, height: 56, borderRadius: 28 }}
          />
        </TouchableOpacity>
      </View>
      {/* Post body content */}
      <View style={{ width: window.width * 0.75}} >
        {/* Post Header */}
        <View style={{width:window.width*1,height:4,backgroundColor:"#000"}}></View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' , width:window.width*.82,paddingVertical:10}}>
          <View style={{width:window.width*.50}}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>
              { data?.username?.length > 10 ? data.username.substring(0, 10)+ '...' : data?.username}
              </Text>
            {item.monetize && <Text style={{ color: 'grey', fontWeight: '900', fontSize: 10 }}>paid</Text>}
          </View>
          <View style={{width:window.width*.38}}>
          <Text style={{ color: 'white' }}>.{beforetime(data.timestamp)} ago</Text>
          </View>
         
        </View>
        {/* Post Text */}
        <View>
          <Text style={{ color: 'white' }}>{data.text}</Text>
        </View>
        {/* Post media */}
        {data.image_url && data.monetize && !purchased_video && <View
          style={{ flex: 1, width: window.width * 0.75, height: 200 }} >
          <Image
            source={{ uri: data.image_url, cache: 'reload' }}
            style={{ flex: 1, }}
            resizeMode='contain'
            resizeMethod='scale'
          />
          <BlurView
            intensity={130}
            tint="light"
            style={[StyleSheet.absoluteFill, { flex: 1, width: window.width * 0.75, height: 200 }]}>
          </BlurView>
        </View>}
        {data.image_url && data.monetize && !purchased_video && !loading &&
          <View>
            <TouchableOpacity
              onPress={purchasedVideo}
              style={{
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
              <Text>Pay ₹ {data.price} to see</Text>
            </TouchableOpacity>
          </View>}
        {data.image_url && data.monetize && !purchased_video && loading &&
          <View>
            <TouchableOpacity
              style={{
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
              <ActivityIndicator size={'small'} color={'black'} />
            </TouchableOpacity>
          </View>}
        {data.image_url && data.monetize && purchased_video && <TouchableOpacity
          onPress={() => {
            dispatch(addPhotoPost(item))
            navigation.navigate('PhotoScreen')
          }}
          style={{ flex: 1, width: window.width * 0.75, height: 200 }}>
          <Image
            source={{ uri: data.image_url, cache: 'reload' }}
            style={{ flex: 1, }}
            resizeMode='contain'
            resizeMethod='scale'
          />
        </TouchableOpacity>
        }
        {data.image_url && !data.monetize && <TouchableOpacity
          onPress={() => {
            dispatch(addPhotoPost(item))
            navigation.navigate('PhotoScreen')
          }}
          style={{ flex: 1, width: window.width * 0.75, height: 200 }}>
          <Image
            source={{ uri: data.image_url, cache: 'reload' }}
            style={{ flex: 1, }}
            resizeMode='contain'
            resizeMethod='scale'
          />
        </TouchableOpacity>
        }







        {data.video_url && data.monetize && !purchased_video &&
          <View>
            <Video
              ref={video}
              style={{ width: window.width * 0.75, height: 160 }}
              source={{ uri: data.video_url }}
              resizeMode={ResizeMode.CONTAIN}
              onPlaybackStatusUpdate={status => setStatus(() => status)}
              posterSource={{ uri: 'https://firebasestorage.googleapis.com/v0/b/tradebud-727d2.appspot.com/o/blur.png?alt=media&token=f5f059c8-cb06-4f5f-a994-19ac1f8a05f3' }}
              usePoster={true}
              isLooping
            />
          </View>}
        {data.video_url && data.monetize && !purchased_video && !loading &&
          <View>
            <TouchableOpacity
              onPress={purchasedVideo}
              style={{
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
              <Text>Pay ₹ {data.price} to play</Text>
            </TouchableOpacity>
          </View>}



        {data.image_url && data.monetize && loading &&
          <View>
            <TouchableOpacity
              style={{
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
              <ActivityIndicator size={'small'} color={'black'} />
            </TouchableOpacity>
          </View>}
        {data.video_url && purchased_video &&
          <TouchableOpacity
            onPress={() => {
              dispatch(addVideoPost(item))
              navigation.navigate("VideoPlayerScreen")
            }}
          >
            <Video
              ref={video}
              style={{ width: window.width * 0.75, height: 160 }}
              source={{ uri: data.video_url }}
              resizeMode={ResizeMode.CONTAIN}
              onPlaybackStatusUpdate={status => setStatus(() => status)}
              // posterSource={{uri: 'https://firebasestorage.googleapis.com/v0/b/tradebud-727d2.appspot.com/o/blur.png?alt=media&token=f5f059c8-cb06-4f5f-a994-19ac1f8a05f3'}}
              // usePoster={true}
              isLooping
            />
            <TouchableOpacity
              onPress={() => {
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
              ) : (
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

        {data.video_url && !data.monetize &&
          <TouchableOpacity onPress={() => {
            dispatch(addVideoPost(item))
            navigation.navigate("VideoPlayerScreen")
          }}>
            <Video
              ref={video}
              style={{ width: window.width * 0.75, height: 160 }}
              source={{ uri: data.video_url }}
              resizeMode={ResizeMode.CONTAIN}
              onPlaybackStatusUpdate={status => setStatus(() => status)}
              // posterSource={{uri: 'https://firebasestorage.googleapis.com/v0/b/tradebud-727d2.appspot.com/o/blur.png?alt=media&token=f5f059c8-cb06-4f5f-a994-19ac1f8a05f3'}}
              usePoster={true}
              isLooping
            />
            <TouchableOpacity
              onPress={() => {
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
              ) : (
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
        <View style={{ width: window.width * 0.75, marginTop: window.height * 0.01, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {data.likes.includes(username) ? (
            <TouchableOpacity
              style={styles.postFooter}
              onPress={unlikeThisPost}
            >
              <AntDesign name='like1' color={'lightblue'} size={25} />
              <Text style={{ color: 'white', marginLeft: 5 }}>{data.likes.length}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.postFooter}
              onPress={likeThisPost}
            >
              <AntDesign name='like2' color={'white'} size={25} />
              <Text style={{ color: 'white', marginLeft: 5 }}>{data.likes.length}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => { navigation.navigate('MyPostComment', { data: data }) }}>
            <EvilIcons name='comment' size={25} color={"white"} />
          </TouchableOpacity>
          <View style={styles.postFooter}>
            <EvilIcons name='arrow-up' size={25} color={"white"} />
            <Text style={{ color: 'white', marginLeft: 5 }}>{data.reached.length}</Text>
          </View>
          <TouchableOpacity onPress={shareMessage}>
            <EvilIcons name='share-google' size={25} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default DisplayPost;

const styles = StyleSheet.create({
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})