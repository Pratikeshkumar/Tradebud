import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import { Video } from "expo-av";
const window = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

const DisplayStory = () => {
  const navigation = useNavigation();
  const story = useSelector((state) => state.story);
  const user = story.user;
  // console.log(user,"USERHHH")

  const [instastory, setInstastory] = useState(user);

  const { width, height } = useWindowDimensions();
  const flatlistRef = useRef(null);
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

  const styles = StyleSheet.create({
    main_conatiner: {
      position: 'absolute',
      backgroundColor: 'black',
      width: window.width * 1,
      height: window.height * 1,
      top:30
    },
    story_page: {
      backgroundColor: "#1b1b1b",
      width: width,
      height: height,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      alignItems: "center",
      paddingVertical: 10,
      position: "absolute",
      width: width,
      top: 10,
      left: 0,
      right: 0,
      zIndex: 2,
    },
    image_view: {
      flexDirection: "row",
      alignItems: "center",
    },
    next_view: {
      width: width * 0.4,
      height: height,
      backgroundColor: "rgba(0,0,0.4",
      position: "absolute",
      top: 0,
      bottom: 0,
    },
  });

  const RenderStory = ({ stories, progress, start }) => {
    // console.log(stories, "ST");
    const type = stories?.content_type;
    switch (type) {
      case "word":
        return (
          <View
            style={{
              width: window.width * 1,
              height: window.height * 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 30, color: "white" }}
              onLayout={() => {
                progress.setValue(0);
                start();
              }}
            >
              {stories?.content}
            </Text>
          </View>
        );
      case "photo":
        return (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              bottom: 40,
            }}
          >
            <Image
              source={{ uri: stories?.content }}
              style={{ width: width, height: height }}
              onLoad={() => {
                progress.setValue(0);
                start();
              }}
              resizeMode="contain"
            />

            <View style={{ backgroundColor: "white", bottom: 20 }}></View>
          </View>
        );
      case "filevideo":
        return (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              bottom: 40,
            }}
          >
            <Video
              source={{ uri: stories?.content }}
              style={{ width: width, height: height }}
              resizeMode="contain"
              paused={false}
              onLoad={() => {
                progress.setValue(0);
                start();
              }}
              shouldPlay
              useNativeControls
              isLooping
            />
          </View>
        );
    }
  };
  const RenderItem = ({ item, index }) => {
    const [current_story_index, setCurrent_story_index] = useState(0);
    const timestampDifference =
      new Date().getTime() - instastory[current_story_index].timestamp;
    const isWithin24Hours = timestampDifference < 24 * 60 * 60 * 1000;
    if (!isWithin24Hours) {
      close(); // Post has expired, close the story view
      return null;
    }
    const stories_length = user.length;
    const handleNextStory = () => {
      if (current_story_index < stories_length - 1) {
        progress.setValue(0);
        setCurrent_story_index((p) => p + 1);
      } else {
        close();
        console.log("error in next  story");
      }
    };

    const close = () => {
      progress.setValue(0);
      navigation.goBack();
    };

    const handlePrevoiusStory = () => {
      if (current_story_index > 0) {
        progress.setValue(0);
        setCurrent_story_index((p) => p - 1);
      } else {
        close();
        console.log("error in previous story");
      }
    };
   
    const progress = useRef(new Animated.Value(0)).current;
    const start = () => {
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          handleNextStory();
        }
      });
    };

    return (
      <View style={styles.story_page}>
        <View
          style={{
            width: width,
            top: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            position: "absolute",
          }}
        >
          {user.map((item, key) => {
            return (
              <View
                style={{
                  flex: 1,
                  height: 5,
                  backgroundColor: "#525861",
                  marginLeft: 10,
                }}
              >
                <Animated.View
                  style={{
                    flex:
                      current_story_index == key
                        ? progress
                        : user[index].finish,
                    height: 5,
                    backgroundColor: "#bac3d1",
                  }}
                ></Animated.View>
              </View>
            );
          })}
        </View>

        <View style={styles.header}>
          <View style={styles.image_view}>
            <Image
              source={{ uri: item?.profile_picture }}
              style={{ width: 40, height: 40, borderRadius: 100 }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ color: "#fff" }}>{item?.username}</Text>
              <Text style={{ color: "#fff" }}>
                {beforetime(instastory[current_story_index].timestamp)}
              </Text>
            </View>
          </View>
        </View>

        <RenderStory
          stories={instastory[current_story_index]}
          progress={progress}
          start={start}
        />
        <Pressable
          style={[styles.next_view, { right: 0 }]}
          onPress={handleNextStory}
        />
        <Pressable
          style={[styles.next_view, { left: 0 }]}
          onPress={handlePrevoiusStory}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.main_conatiner}>
      <FlatList
        data={instastory}
        horizontal={true}
        pagingEnabled={true}
        ref={flatlistRef}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} />;
        }}
      />
    </SafeAreaView>
  );
};

export default DisplayStory;
