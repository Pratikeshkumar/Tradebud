import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
  ImageBackground,
  ActivityIndicator,
  Share
} from "react-native";
import React, { useEffect, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from "react-redux";
import { myProfileData } from "../store/userdataSlice";
import {StatusBar} from 'expo-status-bar'
import firestore from '@react-native-firebase/firestore'
import MyProfilePost from "../components/MyProfilePost";
import { addStoryUser } from "../store/storySlice";
import { useRoute } from "@react-navigation/native";
const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}



const BottomProfile = ({navigation}) => {
  const userdata = useSelector((state)=>state.userdata)
  const my_profile_data = userdata.my_profile_data;
  const {username, about_us} = my_profile_data;
  const [mediaPost, setMediaPost] = useState()
  const [no_media, setNo_media] = useState()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false);
  const mystory = useSelector((state)=>state.mystory)
  const user = mystory.status;
  const dispatch = useDispatch()


// function for handling the sharing profile of the users

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











// function for fetching user media post from databases
const fetchMediaPost = () => {
  try {
    firestore()
      .collection('user_post_data_with_media')
      .where('username', '==', username)
      .onSnapshot((querySnapshot) => {
        const size = querySnapshot.size;
        const data = querySnapshot.docs.map((documentSnapshot) => {
          const id = documentSnapshot.id;
          const data = documentSnapshot.data();
          return { ...data, id };
        });

        setNo_media(size);
        setMediaPost(data);
      });
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchMediaPost();
  // fetchTextPost() 
}, []);






useEffect(()=>{
  if(mediaPost){
    mediaPost.sort((a, b) => b.timestamp - a.timestamp);
  setData(mediaPost)
  }
}, [mediaPost])




  const modalizeRef = useRef(null);
  const modalizeRef1 = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };


  const onOpen1 = () => {
    modalizeRef1.current?.open();
  };

  const closeModal = () => {
    modalizeRef.current?.close();
  };

  console.log(mediaPost)

  return (
    <>
    { !data ?  (
      <SafeAreaProvider>
        <SafeAreaView style={{
          flex: 1,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ActivityIndicator size={'large'} color="white"/>
          <StatusBar backgroundColor="black" style="light" />
        </SafeAreaView>
      </SafeAreaProvider>
    ):(
      <SafeAreaProvider>
    <SafeAreaView style={{
      backgroundColor: "black",
      flex: 1,
      // height: window.height * 0.96,
    }}>


      {/* Header start */}
      <View style={{
        marginHorizontal: window.width * 0.03,
        marginTop: window.height * 0.03,
        marginBottom: window.height * 0.02,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }} >
        <TouchableOpacity style={{
          width: window.width * 0.5
        }}>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>{my_profile_data.username.slice(0, 16)}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onOpen}>
          <Image style={{
            width: window.width * 0.075,
            height: window.height * 0.035,
          }} source={require("../assets/add.png")} />
        </TouchableOpacity>

        <TouchableOpacity
         onPress={()=>{
          navigation.navigate('Payment')
        }}
        >
          <Image style={{
            width: window.width * 0.075,
            height: window.height * 0.035,
          }} source={require("../assets/wallet.png")} />
        </TouchableOpacity>



        <TouchableOpacity 
         onPress={()=>{navigation.navigate('ChatDashboard')}}
        >
          <Image style={{
            width: window.width * 0.075,
            height: window.height * 0.035,
          }} source={require("../assets/message.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onOpen1}>
          <Image style={{
            width: window.width * 0.07,
            height: window.height * 0.03,
          }} source={require("../assets/three.png")} />
        </TouchableOpacity>
      </View>
          {/* Header End */}

          {/* Inner container start */}
        <View >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: window.width * 0.02 }}>
            <View style={{
              marginHorizontal: window.width * 0.02,
              flexDirection: 'row',
              marginTop: window.height * 0.01
            }} >
              {user ? (
                <View style={{
                  display: 'flex',
                  width: 70,
                  height: 70,
  
                }}>
                  <TouchableOpacity 
                  style={{
                    width: 70,
                    height: 70,
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 35,
                    borderStyle: 'dotted',
                    padding: 2
                  }}
                  onPress={()=>{
            dispatch(addStoryUser(user))
            navigation.navigate('DisplayStory')
        }}>
                  <ImageBackground
                      source={{uri: my_profile_data.profile_picture}}
                      style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 40,
                          position: 'relative',
                          overflow: 'hidden',
                          // borderStyle: 'dotted',
                          // borderWidth: 2,
                          // borderColor: 'white'
                         }}>
                         </ImageBackground>
                         </TouchableOpacity>
                </View>
              ):(
                <View style={{
                  display: 'flex',
                  width: 70,
                  height: 70,
  
                }}>
                  <ImageBackground
                      source={{uri: my_profile_data.profile_picture}}
                      style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 40,
                          position: 'relative',
                          overflow: 'hidden',
                          // borderStyle: 'dotted',
                          // borderWidth: 2,
                          // borderColor: 'white'
                         }}>
                         </ImageBackground>
                </View>
              )}

            </View>

            <View style={{ flexDirection: 'column', textAlign: 'center' }}>
              <Text style={{ fontSize: 15, color: "#fff", textAlign: 'center', fontWeight: '700' }}>
                { no_media}
              </Text>

              <Text style={{ fontSize: 15, color: "#fff", textAlign: 'center' }}>
               Posts
              </Text>
            </View>

            <TouchableOpacity 
                onPress={()=>{
                  navigation.navigate("Followers", {
                    username: my_profile_data.username,
                    followings: my_profile_data.followings,
                    followers: my_profile_data.followers
                  })
                }}
                style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 15, color: "#fff", textAlign: 'center', fontWeight: '700' }}>
              {my_profile_data.followers.length}
              </Text>

              <Text style={{ fontSize: 15, color: "#fff", textAlign: 'center' }}>
                Followers
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={()=>{
                navigation.navigate("Followings", {
                  username: my_profile_data.username,
                  followings: my_profile_data.followings,
                  followers: my_profile_data.followers
                })
              }}
              style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 15, color: "#fff", textAlign: 'center', fontWeight: '700' }}>
                {my_profile_data.followings.length}
              </Text>

              <Text style={{ fontSize: 15, color: "#fff", textAlign: 'center' }}>
                Following
              </Text>
            </TouchableOpacity>
          </View>



            <View style={{ marginLeft: window.width * 0.05, marginTop: window.height * 0.01 }}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>
               {my_profile_data.first_name} {my_profile_data.last_name}
              </Text>
                  {about_us && <Text style={{ color: "#FFF" }}>
                {about_us}
              </Text>}

              {/* <Text style={{ color: "#9ACFFF" }}>
                #trading_trainer
              </Text>

              <Text style={{ color: "#9ACFFF" }}>
                #trade_teacher
              </Text> */}
            </View>

          {/* <TouchableOpacity>
            <View style={{ alignItems: 'center', marginTop: window.height * 0.02 }}>
              <View style={{ backgroundColor: "#BAB8BB", borderRadius: 10, width: window.width * 0.9, padding: window.width * 0.04, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <Text style={{ color: "#000", fontWeight: "600", fontSize: 14 }}>
                  Professional dashboard
                </Text>

                <Text style={{ color: "#000", fontWeight: "400", fontSize: 14 }}>
                  295 accounts reached in the lasy 30 days.
                </Text>
              </View>
            </View>
          </TouchableOpacity> */}

          <View style={{ alignItems: 'center', marginTop: window.height * 0.02, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity onPress={()=>{
              navigation.navigate("EditProfile")
            }}>
              <View style={{ backgroundColor: "#BAB8BB", borderRadius: 10, alignItems: 'center', justifyContent: 'center', width: window.width * 0.4, padding: window.width * 0.02, alignItems: 'center' }}>
                <Text style={{ color: "#000", fontWeight: "600", fontSize: 15 }}>Edit Profile</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={shareMessage}>
              <View style={{ backgroundColor: "#BAB8BB", borderRadius: 10, alignItems: 'center', justifyContent: 'center', width: window.width * 0.4, padding: window.width * 0.02, alignItems: 'center' }}>
                <Text style={{ color: "#000", fontWeight: "600", fontSize: 15 }}>Share Profile</Text>
              </View>
            </TouchableOpacity>
          </View>
          </View>
          <View style={{marginBottom: 70, flex: 1,}}>
          <MyProfilePost data={data} navigation={navigation} username={username} />
          </View>
         



      
       



        <Modalize ref={modalizeRef} scrollViewProps={{ showsVerticalScrollIndicator: false }}
          snapPoint={200} modalStyle={{
            width: window.width * 1,
            height: window.height * 0.1,
            backgroundColor: "#BAB8BB"
          }} withHandle={true} onOverlayPress={closeModal} disableScrollIfPossible={false}    >
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: window.height * 0.02 }}>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Create</Text>
          </View>

          {/* <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.02, marginHorizontal: window.width * 0.04 }}>
              <Image style={{
                width: window.width * 0.08,
                height: window.height * 0.04,
              }} source={require("../assets/reels.png")} />

              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05 }}>Reels</Text>
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity 
          onPress={()=>{
            navigation.navigate('Post')
          }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.02, marginHorizontal: window.width * 0.04 }}>
              <Image style={{
                width: window.width * 0.08,
                height: window.height * 0.04,
              }} source={require("../assets/both.png")} />

              <TouchableOpacity
              >
              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05 }}>Post</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={()=>{
              navigation.navigate('StoryPost')
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.02, marginHorizontal: window.width * 0.04 }}>
              <Image style={{
                width: window.width * 0.08,
                height: window.height * 0.04,
              }} source={require("../assets/posts.png")} />

              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05 }}>Story</Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.02, marginHorizontal: window.width * 0.04 }}>
              <Image style={{
                width: window.width * 0.075,
                height: window.height * 0.035,
              }} source={require("../assets/storyHightlight.png")} />

              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05 }}>Story Highlight</Text>
            </View>
          </TouchableOpacity> */}
        </Modalize>

        <Modalize ref={modalizeRef1} scrollViewProps={{ showsVerticalScrollIndicator: false }}
          snapPoint={300} modalStyle={{
            width: window.width * 1,
            height: window.height * 0.1,
            backgroundColor: "#BAB8BB"
          }} withHandle={true} onOverlayPress={closeModal} disableScrollIfPossible={false}    >
         
          <TouchableOpacity
           onPress={()=>{
            navigation.navigate('Settings')
          }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.04, marginHorizontal: window.width * 0.04 }}>
              <Image style={{
                width: window.width * 0.08,
                height: window.height * 0.04,
              }} source={require("../assets/storyHightlight.png")} />

              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05 }}>Settings</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.02, marginHorizontal: window.width * 0.04 }}>
              <Image style={{
                width: window.width * 0.07,
                height: window.height * 0.03,
              }} source={require("../assets/insight.png")} />

              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05 }}>Get Insight</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.02, marginHorizontal: window.width * 0.04 }}>
              <Image style={{
                width: window.width * 0.08,
                height: window.height * 0.04,
              }} source={require("../assets/storyHightlight.png")} />

              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05 }}>Your Activity</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={()=>{
            navigation.navigate('Payment')
          }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.02, marginHorizontal: window.width * 0.04 }}>
              <Image style={{
                width: window.width * 0.07,
                height: window.height * 0.025,
              }} source={require("../assets/payment.png")} />

              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05 }}>Payment</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.02, marginHorizontal: window.width * 0.04 }}>
              <Image style={{
               width: window.width * 0.065,
               height: window.height * 0.03,
              }} source={require("../assets/favourite.png")} />

              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05 }}>Favorites</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.02, marginHorizontal: window.width * 0.04 }}>
              <Image style={{
                width: window.width * 0.07,
                height: window.height * 0.025,
              }} source={require("../assets/discover.png")} />

              <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05 }}>Discover People</Text>
            </View>
          </TouchableOpacity>
        </Modalize>
      <StatusBar backgroundColor="black" style="light" />
    </SafeAreaView>
    </SafeAreaProvider>
    )}
    </>
  )
}

export default BottomProfile;