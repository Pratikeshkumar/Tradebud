import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Alert,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import firestore from "@react-native-firebase/firestore";
import { addmessageUser } from "../store/messageSlice";
import { selectedUser } from "../store/userSlice";
import { myProfileData } from "../store/userdataSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Video, ResizeMode } from "expo-av";
import { addCommentChecking } from "../store/commentSlice";
import DisplayPost from "../components/DisplayPost";

const window = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

const WatchUserProfileFromFeed = ({ navigation, route }) => {
  // const watchuser = useSelector((state)=>state.watchuser);
  // const username = watchuser.username;
  const { username } = route.params;
  const [user_profile_data, setUser_profile_data] = useState();
  const [user_post_data, setUser_post_data] = useState();
  const [no_of_post, setNo_of_post] = useState();
  const userdata = useSelector((state) => state.userdata);
  const my_profile_data = userdata.my_profile_data;
  const myusername = my_profile_data.username;
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector((state) => state.user);
  const selected_user = user.selected_user;
  const [error, setError] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isFollow, setIsFollow] = useState(
    my_profile_data?.followings?.includes(username)
  );
  const dispatch = useDispatch();

  //   function changed by me by refresing?
  const refreshPage = () => {
    setShouldRefresh(true);
  };

  useEffect(() => {
    if (shouldRefresh) {
      // Your logic to fetch updated data goes here
      const fetchUserProfileData = async () => {
        try {
          const documentSnapshot = await firestore()
            .collection("user_profile_data")
            .doc(username)
            .get();

          if (documentSnapshot.exists) {
            setUser_profile_data(documentSnapshot.data());
          } else {
            setError(true);
          }
        } catch (error) {
          console.log(error);
        }
      };

      // Call the function to fetch user profile data
      fetchUserProfileData();

      // Reset the 'shouldRefresh' state to false after the refresh is done
      setShouldRefresh(false);
    }
  }, [shouldRefresh, username]);

  // function for storing chating people data

  const store_chating_user = () => {
    const message_user = my_profile_data.message_user;
    const alreadyInData = message_user.includes(username);
    if (alreadyInData) {
      dispatch(addmessageUser(user_profile_data));
      navigation.navigate("UserChat");
    } else {
      try {
        firestore()
          .collection("user_profile_data")
          .doc(myusername)
          .update({
            message_user: firestore.FieldValue.arrayUnion(username),
          })
          .then(() => {
            dispatch(addmessageUser(user_profile_data));
            navigation.navigate("UserChat");
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // function for getting real time user profile data from firestore
  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const documentSnapshot = await firestore()
          .collection("user_profile_data")
          .doc(username)
          .get();

        if (documentSnapshot.exists) {
          setUser_profile_data(documentSnapshot.data());
        } else {
          setError(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfileData();
  }, [username]);

  // listening the my profile data from firestore in real time
  useEffect(() => {
    const unsubscribe = firestore()
      .collection("my_profile_data")
      .doc(myusername)
      .onSnapshot((documentSnapshot) => {
        console.log(documentSnapshot.data());
        // dispatch(myProfileData(documentSnapshot.data()))
      });

    return () => unsubscribe();
  }, []);

  //function for getting userpost data from firestore
  useEffect(() => {
    const unsubscribe = firestore()
      .collection("user_post_data_with_media")
      .where("username", "==", username)
      .onSnapshot((querySnapshot) => {
        const data = [];
        const size = querySnapshot.size;
        setNo_of_post(size);
        querySnapshot.forEach((documentSnapshot) => {
          const Data = documentSnapshot.data();
          const id = documentSnapshot.id;
          Data.id = id;
          data.push(Data);
        });
        setUser_post_data(data);
      });

    return () => unsubscribe();
  }, [username]);

  //function for followings other people
  const followThisGuy = (username) => {
    try {
      firestore()
        .collection("user_profile_data")
        .doc(username)
        .update({
          followers: firestore.FieldValue.arrayUnion(myusername),
        })
        .then(() => {
          console.log("success");
        });
      refreshPage();
      try {
        firestore()
          .collection("user_profile_data")
          .doc(myusername)
          .update({
            followings: firestore.FieldValue.arrayUnion(username),
          })
          .then(() => {
            console.log("success");
          });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //function for unfollowing other people
  const unfollowThisGuy = (username) => {
    try {
      firestore()
        .collection("user_profile_data")
        .doc(username)
        .update({
          followers: firestore.FieldValue.arrayRemove(myusername),
        })
        .then(() => {
          console.log("success");
        });
      refreshPage();
      try {
        firestore()
          .collection("user_profile_data")
          .doc(myusername)
          .update({
            followings: firestore.FieldValue.arrayRemove(username),
          })
          .then(() => {
            console.log("success");
          });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function for showing the button
  const displayfollowsection = () => {
    const user_followers = user_profile_data.followers.includes(myusername);
    const user_followings = user_profile_data.followings.includes(myusername);
    const my_followers = my_profile_data.followers.includes(username);
    const my_followings = my_profile_data.followings.includes(username);

    console.log(user_followers, user_followings, my_followers, my_followings);
    if (!user_followers && !my_followings) {
      return (
        <TouchableOpacity
          onPress={() => {
            followThisGuy(user_profile_data.username);
          }}
          style={[styles.button, { backgroundColor: "#5a5ff2" }]}
        >
          <Text style={{ color: "#e6e4e1", fontSize: 14.5 }}>Follow</Text>
        </TouchableOpacity>
      );
    } else if (user_followers && my_followings) {
      return (
        <TouchableOpacity
          onPress={() => {
            unfollowThisGuy(user_profile_data.username);
          }}
          style={[styles.button, { backgroundColor: "#e6e4e1" }]}
        >
          <Text style={{ color: "black", fontSize: 14.5 }}>Following</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <>
      {!user_post_data && !error && (
        <SafeAreaProvider>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"large"} color={"white"} />
          </SafeAreaView>
        </SafeAreaProvider>
      )}
      {user_profile_data && (
        <SafeAreaProvider>
          <SafeAreaView style={styles.containers}>
            <ScrollView
              contentContainerStyle={{
                width: window.width * 1,
                alignItems: "center",
              }}
            >
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Ionicons size={40} color={"white"} name="arrow-back" />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    width: window.width * 0.8,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 20, fontWeight: "700" }}
                  >
                    {user_profile_data.username}
                  </Text>
                 
                </View>
              </View>
              <View style={styles.secondView}>
                <View style={{ width: window.width * 0.3 }}>
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={{ uri: user_profile_data.profile_picture }}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                      }}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.txt,{alignSelf:"center"}]}>
                    {user_profile_data.first_name} {user_profile_data.last_name}
                  </Text>
                </View>
                <View style={styles.followersView}>
                  <View style={styles.textView}>
                    <Text style={[styles.txt, {}]}>{no_of_post}</Text>
                    <Text style={[styles.txt, {}]}>Posts</Text>
                  </View>
                  <View style={styles.textView}>
                    <TouchableOpacity
                      style={{ alignItems: "center", justifyContent: "center" }}
                      onPress={() => {
                        navigation.navigate("Followers", {
                          username: user_profile_data.username,
                          followings: user_profile_data.followings,
                          followers: user_profile_data.followers,
                        });
                      }}
                    >
                      <Text style={[styles.txt, {}]}>
                        {user_profile_data.followers.length}
                      </Text>
                      <Text style={[styles.txt, {}]}>Followers</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.textView}>
                    <TouchableOpacity
                      style={{ alignItems: "center", justifyContent: "center" }}
                      onPress={() => {
                        navigation.navigate("Followings", {
                          username: user_profile_data.username,
                          followings: user_profile_data.followings,
                          followers: user_profile_data.followers,
                        });
                      }}
                    >
                      <Text style={[styles.txt, {}]}>
                        {user_profile_data.followings.length}
                      </Text>
                      <Text style={[styles.txt, { fontSize: 14.5 }]}>
                        Following
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: window.width * 0.9,
                  marginVertical: window.height * 0.01,
                }}
              >
                <Text style={styles.txt}>{user_profile_data.about_us}</Text>
              </View>
              <View style={styles.thirdView}>
                <View
                  style={{
                    backgroundColor: "white",
                    width: window.width * 0.4,
                    borderRadius: window.width * 0.2,
                    height: 40,
                  }}
                >
                  {!isFollow && (
                    <TouchableOpacity
                      onPress={() => {
                        setIsFollow( p => !p)
                        followThisGuy(user_profile_data.username);
                      }}
                      style={[styles.button, { backgroundColor: "#5a5ff2" }]}
                    >
                      <Text style={{ color: "#e6e4e1", fontSize: 14.5 }}>
                        Follow
                      </Text>
                    </TouchableOpacity>
                  )}
                  {isFollow && (
                    <TouchableOpacity
                      onPress={() => {
                        setIsFollow( p => !p)
                        unfollowThisGuy(user_profile_data.username);
                      }}
                      style={[styles.button, { backgroundColor: "#e6e4e1" }]}
                    >
                      <Text style={{ color: "black", fontSize: 14.5 }}>
                        Following
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <TouchableOpacity
                  onPress={store_chating_user}
                  style={styles.button}
                >
                  <Text style={{ color: "black", fontSize: 14.5 }}>
                    message
                  </Text>
                </TouchableOpacity>
              </View>
              {user_post_data && (
                <SafeAreaView style={styles.postView}>
                  <FlatList
                    data={user_post_data}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                          console.log("shubham");
                        }}
                      />
                    }
                    renderItem={({ item, index }) => (
                      <DisplayPost
                        item={item}
                        index={index}
                        navigation={navigation}
                      />
                    )}
                  />
                </SafeAreaView>
              )}
              <View style={{ marginBottom: 70, flex: 1 }}></View>
            </ScrollView>
            <StatusBar backgroundColor="black" style="light" />
          </SafeAreaView>
        </SafeAreaProvider>
      )}
      {error && (
        <SafeAreaProvider>
          <SafeAreaView style={styles.containers}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons size={40} color={"white"} name="arrow-back" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "black",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>
                There is no account with this username
              </Text>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      )}
    </>
  );
};

export default WatchUserProfileFromFeed;

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: window.width * 0.96,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  followersView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: window.width * 0.55,
  },
  txt: {
    color: "white",
  },
  secondView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: window.width * 0.9,
    marginTop: 0,
  },
  textView: {
    justifyContent: "center",
    alignItems: "center",
  },
  thirdView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: window.width * 0.9,
    // paddingHorizontal: 20,
    marginTop: 5,
    paddingBottom: 10,
  },
  button: {
    backgroundColor: "#fff",
    width: window.width * 0.4,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderRadius: window.width * 0.2,
    height: 40,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
