import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const window = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};
const BottomHomeHeader = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingHorizontal: window.width * 0.02,
        paddingTop: window.height * 0.025,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#000",
      }}
    >
      <Image
        style={{
          width: 70,
          height: 60,
        }}
        source={require("../assets/signup.png")}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: window.width * 0.34,

          marginBottom: window.height * 0.01,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ChatDashboard");
          }}
          style={{
            paddingRight: 8,
          }}
        >
          {/* <Image style={{
          width: window.width * 0.079,
          height: window.height * 0.039,
          
        }} source={require("../assets/message.png")} /> */}
          <MaterialCommunityIcons
            name="comment-multiple"
            color={"white"}
            size={34}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Notification");
          }}
        >
          <Ionicons name="notifications-circle" color={"white"} size={42} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SearchScreen");
          }}
        >
          <Ionicons name="md-search-circle-sharp" color={"white"} size={42} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomHomeHeader;

const styles = StyleSheet.create({});
