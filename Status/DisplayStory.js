import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, Animated, } from 'react-native'
import React, { useRef, useEffect, useState, startTransition } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Video } from 'expo-av'
import AntDesign from '@expo/vector-icons/AntDesign'
import { ProgressBar } from 'react-native-paper'

const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}



const DisplayStory = ({ navigation }) => {
  const story = useSelector((state) => state.story);
  const [isScrollViewReady, setIsScrollViewReady] = useState(false);
  const user = story.user;
  const [story_content, setStory_content] = useState(user)
  const [current, setcurrent] = useState(0)
  const [active_status, setActive_status] = useState()
  const [currentWidth, setCurrentWidth] = useState(0)
  const scrollViewRef1 = useRef(null)


  const scrollViewRef = useRef(null);
  const itemWidth = window.width * 1;
  const numItems = user.length;
  const scrollInterval = useRef(null);



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

  // console.log(user)
  // function for moving next story 
  const next = () => {
    if (current != story_content.length - 1) {
      let tempData = story_content;
      tempData[current].finish = 1;
      setStory_content(tempData)
      setcurrent(current + 1)
      progress.setValue(0)
    } else {
      close()
    }
  }



  const close = () => {
    progress.setValue(0)
    navigation.goBack()
  }

  //function for moving previous story
  const previous = () => {
    if (current - 1 >= 0) {
      let tempData = story_content;
      tempData[current].finish = 0;
      setStory_content(tempData)
      progress.setValue(0)
      setcurrent(current - 1)
    } else {
      close()
    }
  }


  const progress = useRef(new Animated.Value(0)).current;

  const start = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        next()
      } else {
        navigation.goBack()
      }
    })
  }





  return (
    <SafeAreaProvider>
      <SafeAreaView style={{
        position: 'absolute',
        backgroundColor: 'black',
        width: window.width * 1,
        height: window.height * 1,
      }}>
        <View style={styles.display_view}>
          {story_content[current].text && <Text onLayout={() => {
            progress.setValue(0)
            start()
          }} style={styles.text}>{story_content[current].text}</Text>}
          {story_content[current].image_url && <Image onLoadEnd={() => {
            progress.setValue(0)
            start()
          }} source={{ uri: story_content[current].image_url }} style={styles.image_view} resizeMode='cover' />}
          {story_content[current].video_url && <Video onLoadEnd={() => {
            progress.setValue(0)
            start()
          }} source={{ uri: story_content[current].video_url }} style={{
            width: window.width * 1,
            height: window.height * 1
          }} />}
          <View style={{
            position: 'absolute',
            top: 20,
            left: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image style={{
              width: window.width * 0.09,
              height: window.height * 0.03,
            }} source={require("../assets/back.png")} />
            <View style={{marginLeft: 10}}>
            <Image
              source={{ uri: story_content[current].profile_picture }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
            />
            </View>
            
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.txt}>{story_content[current].username}</Text>
              <Text style={styles.txt}>{beforetime(story_content[current].timestamp)}</Text>
            </View>
          </View>
          <View style={styles.main_touch}>
            <TouchableOpacity
              onPress={() => {
                previous()
              }}
              style={{
                width: window.width * 0.35,
                height: window.height * 1
              }}
            >

            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                next()
              }}
              style={{
                width: window.width * 0.35,
                height: window.height * 1
              }}>

            </TouchableOpacity>
          </View>

          <View style={{
            position: 'absolute',
            top: 10,
            flex: 1,
            flexDirection: 'row'
          }}>

            {user.map((item, index) => (
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                height: 2,
                flex: 1,
                margin: 2
              }}>
                <Animated.View
                  style={{
                    flex: current === index ? progress : story_content[index].finish,
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    // margin: 2,
                    // height: 2
                  }}
                >

                </Animated.View>
              </View>
            ))}

          </View>



        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  )
}


export default DisplayStory;





const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'white'
  },
  main_touch: {
    width: window.width * 1,
    height: window.height * 1,
    position: 'absolute',
    top: 0,
    left: 0,
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  display_view: {
    width: window.width * 1,
    height: window.height * 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image_view: {
    width: window.width * 1,
    height: window.height * 1,

  },
  txt: {
    color: 'white',

  }
})







