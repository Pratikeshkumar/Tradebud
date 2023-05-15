import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import SearchBar from '../components/SearchBar'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native"
import firestore from "@react-native-firebase/firestore"
import List from "../components/List";

const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

const SearchScreen = ({navigation}) => {
  
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.root}>
      <View style={{width: window.width * 1, paddingTop: 15, paddingLeft: 15, backgroundColor: 'black', paddingBottom: 10}}>
      <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Image 
              style={{
                   width: window.width * 0.09,
                   height: window.height * 0.02, }} 
              source={require("../assets/back.png")} />
        </TouchableOpacity>
      </View>
      <SearchBar navigation={navigation} />
      <List />
      <StatusBar backgroundColor={"black"} style="light" />
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    backgroundColor: 'black',
    flex: 1,

  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});