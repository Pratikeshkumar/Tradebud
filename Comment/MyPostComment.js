import { Alert, FlatList, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Video, ResizeMode } from 'expo-av';
import { BlurView } from 'expo-blur';
// import Image from 'expo-image'
import AntDesign from '@expo/vector-icons/AntDesign'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import Entypo from '@expo/vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentChecking } from '../store/commentSlice';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore'
const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}


const MyPostComment = ({ navigation, route }) => {
  // const comment = useSelector((state)=>state.comment)
  // const comment_person = comment.comment_person;
  const { data } = route.params;
  const comment_person = data;
  const id = data.id;
  const [status, setStatus] = useState({})
  const userdata = useSelector((state) => state.userdata)
  const { username, profile_picture, purchased_post } = userdata.my_profile_data;
  const video = useRef(null);
  const [comment_text, setComment_text] = useState();
  const [comment_data, setComment_data] = useState();
  const [comment_size, setComment_size] = useState()
  const [purchased_video, setPurchase_video] = useState(purchased_post.includes(id))
  const [loading, setLoading] = useState(false)
  // function for recieving comment data of media in realtime 
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('user_post_data_with_media')
      .doc(comment_person.id)
      .collection('comment')
      .orderBy('timestamp', 'desc')
      .limit(10) // Limit the number of documents to retrieve
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((documentSnapshot) => {
          const Data = documentSnapshot.data();
          const id = documentSnapshot.id;
          Data.id = id;
          data.push(Data);
        });
  
        setComment_data(data);
        setComment_size(querySnapshot.size);
      });
  
    return () => {
      unsubscribe(); // Cleanup the Firestore listener
    };
  }, [comment_person.id]); // Add comment_person.id as a dependency
  
console.log(purchased_video)


  // useEffect(() => {
  //   if (comment_person.video_url || comment_person.image_url) {
  //     try {
  //       firestore()
  //         .collection('user_post_data_with_media')
  //         .doc(comment_person.id)
  //         .collection('comment')
  //         .onSnapshot(quarySnapshot => {
  //           const size = quarySnapshot.size;
  //           setComment_size(size)
  //           const data = []
  //           quarySnapshot.forEach(documentSnapshot => {
  //             const Data = documentSnapshot.data()
  //             const id = documentSnapshot.id;
  //             Data.id = id;
  //             data.push(Data)
  //           })
  //           data.sort((a, b) => b.timestamp - a.timestamp);
  //           setComment_data(data)
  //         })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   } else {
  //     try {
  //       firestore()
  //         .collection('user_post_data_without_media')
  //         .doc(comment_person.id)
  //         .collection('comment')
  //         .onSnapshot(quarySnapshot => {
  //           const size = quarySnapshot.size;
  //           setComment_size(size)
  //           const data = []
  //           quarySnapshot.forEach(documentSnapshot => {
  //             const Data = documentSnapshot.data()
  //             const id = documentSnapshot.id;
  //             Data.id = id;
  //             data.push(Data)
  //           })
  //           setComment_data(data)
  //         })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }, [])



  // function for sending comment on post
  const sendComment = async () => {
    Keyboard.dismiss();
  
    try {
      const batch = firestore().batch();
      const commentRef = firestore()
        .collection('user_post_data_with_media')
        .doc(comment_person.id)
        .collection('comment')
        .doc();
  
      const commentData = {
        comment_text: comment_text,
        timestamp: firestore.FieldValue.serverTimestamp(),
        username: username,
        profile_picture: profile_picture,
      };
  
      batch.set(commentRef, commentData);
      await batch.commit();
  
      setComment_text(undefined);
    } catch (error) {
      console.log(error);
    }
  };
  
  // const sendComment = async () => {
  //   const time = new Date().getTime()
  //   Keyboard.dismiss()
  //   if (comment_person.video_url || comment_person.image_url) {
  //     try {
  //       firestore()
  //         .collection('user_post_data_with_media')
  //         .doc(comment_person.id)
  //         .collection('comment')
  //         .add({
  //           comment_text: comment_text,
  //           timestamp: time,
  //           username: username,
  //           profile_picture: profile_picture
  //         })
  //         .then(() => {
  //           setComment_text(undefined)
  //         })

  //     } catch (error) {
  //       console.log(error)
  //     }
  //   } else {
  //     try {
  //       firestore()
  //         .collection('user_post_data_without_media')
  //         .doc(comment_person.id)
  //         .collection('comment')
  //         .add({
  //           comment_text: comment_text,
  //           timestamp: time,
  //           username: username,
  //           profile_picture: profile_picture,
  //         })
  //         .then(() => {
  //           setComment_text(undefined)
  //         })

  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  // }





  // function for calculating before time 
  const beforetime = (time1) => {
    const currentTime = new Date().getTime()
    const milliseconds = currentTime - time1;
    const minute = 60 * 1000; // milliseconds in a minute
    const hour = 60 * minute; // milliseconds in an hour
    const day = 24 * hour; // milliseconds in a day
    const month = 30 * day; // approximate milliseconds in a month
    const year = 365 * day; // approximate milliseconds in a year
    if (milliseconds < minute) {
      return `${milliseconds}ms`;
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


  return (
    <>
    {comment_person && <SafeAreaProvider>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',

      }}>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.02 }}>


          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: window.width * 0.05 }}>
              <Image style={{
                width: window.width * 0.09,
                height: window.height * 0.03,
              }} source={require("../assets/back.png")} />
            </View>
          </TouchableOpacity>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: window.width * 0.25 }}>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>Post</Text>
          </View>
        </View>



        <View style={{ width: window.width * 1, marginTop: 10, paddingLeft: window.width * 0.02, paddingRight: window.width * 0.02, flexDirection: 'row' }}>

          {/* Post Profile Picture */}
          <View style={{ width: window.width * 0.18, }}>
            <TouchableOpacity
              onPress={() => {
                // dispatch(addWatchUserName(data.username))
                navigation.navigate("WatchUserProfileFromFeed", {
                  username: comment_person.username
                })
              }}
            >
              <Image
                source={{ uri: comment_person.profile_picture }}
                style={{ width: 56, height: 56, borderRadius: 28 }}
              />
            </TouchableOpacity>
          </View>
          {/* Post body content */}
          <View style={{ width: window.width * 0.75 }} >
            {/* Post Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <View>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>{comment_person.username.substring(0, 19)}</Text>
                {comment_person.monetize && <Text style={{ color: 'grey', fontWeight: '900', fontSize: 10 }}>paid</Text>}
              </View>
              <Text style={{ color: 'white', marginLeft: 20 }}>.{beforetime(comment_person.timestamp)} ago</Text>
            </View>
            {/* Post Text */}
            <View>
              <Text style={{ color: 'white' }}>{comment_person.text}</Text>
            </View>

            {/* Post media */}
            {comment_person.image_url && comment_person.monetize && !purchased_video && <View
              style={{width: window.width * 0.75, height: 200 }} >
              <Image
                source={{ uri: data.image_url }}
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
            {comment_person.image_url && comment_person.monetize && !purchased_video && !loading &&
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
                  <Text>Pay ₹ {comment_person.price} to see</Text>
                </TouchableOpacity>
              </View>}
            {comment_person.image_url && comment_person.monetize && !purchased_video && loading &&
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
            {comment_person.image_url && comment_person.monetize && purchased_video && <TouchableOpacity
              onPress={() => {
                dispatch(addPhotoPost(item))
                navigation.navigate('PhotoScreen')
              }}
              style={{ width: window.width * 0.75, height: 200 }}>
              <Image
                source={{ uri: comment_person.image_url }}
                style={{ flex: 1, }}
                resizeMode='contain'
                resizeMethod='scale'
              />
            </TouchableOpacity>
            }
            {comment_person.image_url && !comment_person.monetize && <TouchableOpacity
              onPress={() => {
                dispatch(addPhotoPost(comment_person))
                navigation.navigate('PhotoScreen')
              }}
              style={{ width: window.width * 0.75, height: 200 }}>
              <Image
                source={{ uri: comment_person.image_url }}
                style={{ flex: 1, }}
                resizeMode='contain'
                resizeMethod='scale'
              />
            </TouchableOpacity>
            }







            {comment_person.video_url && comment_person.monetize && !purchased_video &&
              <View>
                <Video
                  ref={video}
                  style={{ width: window.width * 0.75, height: 160 }}
                  source={{ uri: comment_person.video_url }}
                  resizeMode={ResizeMode.CONTAIN}
                  onPlaybackStatusUpdate={status => setStatus(() => status)}
                  posterSource={{ uri: 'https://firebasestorage.googleapis.com/v0/b/tradebud-727d2.appspot.com/o/blur.png?alt=media&token=f5f059c8-cb06-4f5f-a994-19ac1f8a05f3' }}
                  usePoster={true}
                  isLooping
                />
              </View>}
            {comment_person.video_url && comment_person.monetize && !purchased_video && !loading &&
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
                  <Text>Pay ₹ {comment_person.price} to play</Text>
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
              {comment_person.likes.includes(username) ? (
                <TouchableOpacity
                  style={styles.postFooter}
                >
                  <AntDesign name='like1' color={'lightblue'} size={25} />
                  <Text style={{ color: 'white', marginLeft: 5 }}>{comment_person.likes.length}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.postFooter}
                >
                  <AntDesign name='like2' color={'white'} size={25} />
                  <Text style={{ color: 'white', marginLeft: 5 }}>{comment_person.likes.length}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.postFooter} >
                <EvilIcons name='comment' size={25} color={"white"} />
                <Text style={{ color: 'white', marginLeft: 5 }} >{comment_size}</Text>
              </TouchableOpacity>
              <View style={styles.postFooter}>
                <EvilIcons name='arrow-up' size={25} color={"white"} />
                <Text style={{ color: 'white', marginLeft: 5 }}>{comment_person.reached.length}</Text>
              </View>
              <TouchableOpacity>
                <EvilIcons name='share-google' size={25} color={"white"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{
          flex: 1,
          // marginTop: 95
        }}>
          {comment_data ? (
            <FlatList
              data={comment_data}
              renderItem={({ item, index }) =>
                <DisplayComment item={item} index={index} />
              }
            />
          ) : (
            <View style={{ flex: 1, }}>
              <ActivityIndicator size={'large'} color={'white'} />
            </View>
          )}
        </View>
        {/* Comment section */}
        <View style={{ flexDirection: 'row', width: window.width * 1, backgroundColor: 'white', paddingRight: 20, position: 'absolute', justifyContent: 'space-between', alignItems: 'center', bottom: 0, }}>
          <TextInput
            placeholder='write comment'
            value={comment_text}
            onChangeText={(val) => { setComment_text(val) }}
            placeholderTextColor={'black'}
            style={{
              backgroundColor: 'white',
              color: 'black',
              padding: 15,
              fontSize: 15,
              width: window.width * 0.9

            }}
            multiline={true}
          />
          <TouchableOpacity
            onPress={() => {
              if (comment_text) {
                sendComment()
              }
            }}
          >
            <Ionicons name='ios-send-sharp' size={20} color={"blue"} />
          </TouchableOpacity>

        </View>
        <StatusBar backgroundColor='black' style='light' />
      </SafeAreaView>
    </SafeAreaProvider>}
    {!comment_person && <SafeAreaProvider>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'black'
      }}>
        <ActivityIndicator size={'large'} color={'white'} />
      </SafeAreaView>
    </SafeAreaProvider>}
    </>
  )
}

export default MyPostComment

const styles = StyleSheet.create({
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})


const DisplayComment = ({ item, index }) => {
  // function for calculating before time 
  const beforetime = (time1) => {
    const currentTime = new Date().getTime()
    const milliseconds = currentTime - time1;
    const minute = 60 * 1000; // milliseconds in a minute
    const hour = 60 * minute; // milliseconds in an hour
    const day = 24 * hour; // milliseconds in a day
    const month = 30 * day; // approximate milliseconds in a month
    const year = 365 * day; // approximate milliseconds in a year
    if (milliseconds < minute) {
      return '1min';
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

  return (
    <View style={{
      width: window.width * 1,
      flexDirection: 'row',
      paddingLeft: window.width * 0.2,
      marginTop: 10,
      flex: 1
    }}>
      <View style={{

      }}>
        <TouchableOpacity>
          <Image
            source={{ uri: item.profile_picture }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{
        marginLeft: 5,
        marginRight: 10,
        alignItems: 'flex-start'
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '800' }}>{item.username}</Text>
          <Text style={{ color: 'white', fontWeight: '400', marginLeft: 10 }}>.{beforetime(item.timestamp)} ago</Text>
        </View>
        <View style={{
          backgroundColor: '#7e827f',
          padding: 10,
          margin: 10,
          borderRadius: 10,

        }}>
          <Text>{item.comment_text}</Text>
        </View>

      </View>

    </View>
  )
}