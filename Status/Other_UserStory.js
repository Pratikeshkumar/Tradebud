import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { Video } from "expo-av";

// import { useRoute } from '@react-navigation/native';

const window = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

const Userstory = ({  route }) => {
  const navigation = useNavigation();
  const story = useSelector((state) => state.story);
  // console.log(story,"STORYnbgfgf")

  const user = [story.username];
 
  const [story_content, setStory_content] = useState(user);
  const [current, setcurrent] = useState(0);

  const storyData = route.params?.storyData;
  const index = route.params?.index;
  // console.log(storyData,"stoooryDATA")
  const progress = useRef(new Animated.Value(0)).current;
  // function for calculating how  much time before post has been uploaded
  const beforetime = (time1) => {
    const currentTime = new Date().getTime();
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
  };
  
 
  const close = () => {
    progress.setValue(0);
    navigation.goBack();
  };

  const next = () => {
    if (current < storyData.length - 1) {
      let tempData = [...storyData]; // Create a copy of the array to avoid directly modifying the state
      tempData[current].finish = 1;
      setStory_content(tempData);
      setcurrent(current + 1);
      progress.setValue(0);
    } else {
      close();
    }
  };

  // function for moving previous story
  const previous = () => {
    if (current - 1 >= 0) {
      let tempData = [...storyData]; // Create a copy of the array to avoid directly modifying the state
      tempData[current].finish = 0;
      setStory_content(tempData);
      progress.setValue(0);
      setcurrent(current - 1);
    } else {
      close();
    }
  };
  const start = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        next();
      } 
    });
  };
 

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          position: "absolute",
          backgroundColor: "black",
          width: window.width * 1,
          height: window.height * 1,
        }}
      >
        <View style={styles.display_view}>
          {storyData.text && (
            <Text
              onLayout={() => {
                progress.setValue(0);
                start();
              }}
              style={styles.text}
            >
              {storyData.text}
            </Text>
          )}
          {storyData.image_url && (
            <Image
              onLoadEnd={() => {
                progress.setValue(0);
                start();
              }}
              source={{ uri: storyData.image_url }}
              style={styles.image_view}
              resizeMode="cover"
            />
          )}
          {storyData.video_url && (
            <Video
              onLoadEnd={() => {
                progress.setValue(0);
                start();
              }}
              source={{ uri: storyData.video_url }}
              style={{
                width: window.width * 1,
                height: window.height * 1,
              }}
            />
          )}
          <View
            style={{
              position: "absolute",
              top: 20,
              left: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: window.width * 0.09,
                height: window.height * 0.03,
              }}
              source={require("../assets/back.png")}
            />
            <View style={{ marginLeft: 10 }}>
              <Image
                source={{ uri: storyData.profile_picture }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}
              />
            </View>

            <View style={{ marginLeft: 10 }}>
              <Text style={styles.txt}>{storyData.username}</Text>
              <Text style={styles.txt}>{beforetime(storyData.timestamp)}</Text>
            </View>
          </View>
          <View style={styles.main_touch}>
            <TouchableOpacity
              onPress={() => {
                previous();
              }}
              style={{
                width: window.width * 0.35,
                height: window.height * 1,
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                next();
              }}
              style={{
                width: window.width * 0.35,
                height: window.height * 1,
              }}
            ></TouchableOpacity>
          </View>

          <View
            style={{
              position: "absolute",
              top: 10,
              flex: 1,
              flexDirection: "row",
            }}
          >
            {user.map((item, index) => (
              <View
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  height: 2,
                  flex: 1,
                  margin: 2,
                }}
              >
                <Animated.View
                  style={{
                    flex:
                      current === index ? progress : storyData[index].finish,
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    // margin: 2,
                    // height: 2
                  }}
                ></Animated.View>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Userstory;

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: "white",
  },
  main_touch: {
    width: window.width * 1,
    height: window.height * 1,
    position: "absolute",
    top: 0,
    left: 0,
    // backgroundColor: 'green',
    flexDirection: "row",
    justifyContent: "space-between",
  },
  display_view: {
    width: window.width * 1,
    height: window.height * 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image_view: {
    width: window.width * 1,
    height: window.height * 1,
  },
  text: {
    fontSize: 30,
    color: "white",
  },
  main_touch: {
    width: window.width * 1,
    height: window.height * 1,
    position: "absolute",
    top: 0,
    left: 0,
    // backgroundColor: 'green',
    flexDirection: "row",
    justifyContent: "space-between",
  },
  display_view: {
    width: window.width * 1,
    height: window.height * 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image_view: {
    width: window.width * 1,
    height: window.height * 1,
  },
  txt: {
    color: "white",
  },
});
