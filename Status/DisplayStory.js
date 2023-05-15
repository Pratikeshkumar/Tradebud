import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, TurboModuleRegistry } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'
import * as Progress from 'react-native-progress';
import Ionicons from '@expo/vector-icons/Ionicons'
import { Video } from 'expo-av'
import AntDesign from '@expo/vector-icons/AntDesign'
import Progressbar from '../components/ProgressBar'
import { ProgressBar } from 'react-native-paper'

const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}





 const DisplayStory = ({navigation}) => {
  const story = useSelector((state)=>state.story);
  const [isScrollViewReady, setIsScrollViewReady] = useState(false);
  const user = story.user;
  const [active_status, setActive_status] = useState()
  
  const scrollViewRef1 = useRef(null)
  const scrollViewRef = useRef(null)
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: scrollViewRef.current.contentOffset + window.width * 1, // scroll one item width
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [scrollViewRef]);


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
  const size = user.length;
  const width = ((window.width * 1) - (size * 2))/size;
  console.log("width of two status:"+width)
  console.log("total width:", window.width * 1)
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>


         {/* Progress bar  */}
        <View style={{
          width: window.width * 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          
        }}>
        <ScrollView 
          horizontal={true} 
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: window.width * 1
          }}
          ref={scrollViewRef1}>
          {user.map((item, index)=>(
           <HeaderProgressBar width={width} />
          ))}
        </ScrollView>
        </View>
        <View style={{
            width: window.width * 1,
            flexDirection: 'row',
            paddingLeft: 10,
            paddingVertical: 10,

      }}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}} touchSoundDisabled={false}   >
          <Ionicons name='arrow-back' color={'white'} size={40} />
        </TouchableOpacity>
        <Image
            source={{uri: user[0].profile_picture}}
            style={{width: 40, height: 40, borderRadius: 20, marginHorizontal: 5}}
          />
        <View style={{}}>
          <Text style={{color: 'white'}}>{user[0].username}</Text>
          <Text style={{color: 'white'}}>.{beforetime(user[0].timestamp)} ago</Text>
        </View>
      </View>
        <ScrollView horizontal={true} ref={scrollViewRef}  >
          {user.map((item, index) => (
            <Status key={index} item={item} beforetime={beforetime} size={size} navigation={navigation} />
          ))}
        </ScrollView>

        <StatusBar backgroundColor='black' style='light' />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
export default DisplayStory;                            
const Status = ({ item, beforetime, size, navigation }) => {

    const newWidth = (window.width * 1) / size;
    console.log(newWidth)
    
  return(
    <View style={styles.statusItem}>
      
      <View style={{flex: 1, width: window.width * 0.9, justifyContent: 'center', alignItems: 'center' }}>
        {item.text && <Text style={{
          color: 'white',
          fontSize: 30,

        }}>{item.text}</Text>}
        {item.image_url && <Image
            source={{uri: item.image_url}}
            style={{
              width: window.width * 0.95,
              height: window.height * 0.9
            }}
        />}
        {item.video_url && <Video
            source={{uri: item.video_url}}
            style={{
              width: window.width * 0.95,
              height: window.height * 0.9
            }}
            useNativeControls={true}
        />}
      {/* <View style={{
        position: 'absolute',
        bottom: 10,
        right: 10
      }}>
            <AntDesign name='heart' size={30} color={'white'} />
      </View> */}
      </View>

    </View>
  )
}

// function for displaying progress bar

const HeaderProgressBar = ({width})=>{
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId;
    let duration = 100;
    let progressIncrement = 1 / duration;

    intervalId = setInterval(() => {
      if (progress >= 1) {
        clearInterval(intervalId);
        return;
      }
      setProgress(progress + progressIncrement);
    }, 100);

    return () => clearInterval(intervalId);
  }, [progress]);
  return(
    <View style={{
              
    }}> 
      <ProgressBar
        progress={progress}
        color='white'
        width={width}
        style={{
          height: 1,
          backgroundColor: 'grey'
        }}
      
      />
      {/* <Progress.Bar
          width={width}
          borderColor={'white'}
          borderWidth={0} 
          useNativeDriver={true}
          animationType={'decay'}
          height={2}
          unfilledColor='grey'
          animated={true} 
          progress={progress}
          color='white'
      /> */}
    </View>
  )
}















const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  statusItem: {
    flexDirection: 'column',
    alignItems: 'center',
    width: window.width * 1

  },
  statusDetails: {
    marginTop: 4,
  },
  statusName: {
    fontSize: 14,
    color: '#fff',
  },
  statusTime: {
    fontSize: 12,
    color: '#bbb',
  },
  progressBar: {
    width: 50,
    height: 2,
    borderRadius: 2,
  },
})



