import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Text, TouchableOpacity, Alert } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { searchPeople } from "../GlobalFunction";
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import { searchResult } from "../store/userSlice";


const SearchBar = ({navigation}) => {
    const [clicked, setClicked] = useState(false)
    const [searchValue, setSearchValue] = useState()
    const dispatch = useDispatch()
    const {search_result} = useSelector((state)=>state.user)
    const SearchedData = []
    const PoepleUsername = []
    //function for fetching data from firestore
    // useEffect(()=>{
    //   const searchUser = (val)=>{
    //     const valz = val+'z'
    //     firestore()
    //     .collection('user_profile_data')
    //     .where('username', '>=', val).where('title', '<', valz)
    //     .get()
    //     .then(querySnapshot =>{
    //       querySnapshot.forEach(documentSnapshot=>{
    //         const data = documentSnapshot.data()
    //         console.log(data)
    //         // SearchedData.push(data)
    //         // const username = data.username;
    //         // PoepleUsername.push(username)
    //       })
    //     })
    // }
    // searchUser(searchValue)
    // }, [searchValue])

// function for getting search result
// const getUser = async(val)=>{
// try {
//   const snapshot = await firestore()
//   .collection('user_profile_data')
//   .where('username', 'array-contains', val)
//   .get()
//   .then(quarySnapshot => {
//     quarySnapshot.forEach(documentSnapshot => {
//       console.log(documentSnapshot.data())
//     })
//   })
// } catch (error) {
//   console.log(error)
// }
// }



// the function is running every time when i enter something inside input filed
    const getUser = (val)=>{
      const postsCollection = firestore().collection('user_profile_data');
      const query = postsCollection.where('username', '>=', val.toLowerCase()).where('username', '<', val.toLowerCase() + 'z')
      query.get().then((querySnapshot) => {
        const data = []
        querySnapshot.forEach((documentSnapshot) => {
          data.push(documentSnapshot.data());
        });
        dispatch(searchResult(data));
      });
    }
    // my problem is every time i ran this function we are pushing similar data 
    //inside our array 
    // so, from this approach we similar type of data indise our array



//function for data filltring
const filterData = (val)=>{
   const filterPeople = PoepleUsername.filter(item => item.startsWith(val))
   const indexes = filterPeople.map(item => PoepleUsername.indexOf(item));
   const selectedItems = indexes.map(index => SearchedData[index]);
   console.log(selectedItems)
    dispatch(searchResult(selectedItems))
}
// useEffect(()=>{
//   filterData(searchValue)
// }, [searchValue])




  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={(val)=>{
            if(val){
              getUser(val)
            }
          }}
          // value={searchValue}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} 
          onPress={() => {
            setSearchValue("")
          }}/>
        )}
      </View>
      {clicked && (
        <View>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
              navigation.goBack()
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 20,

            }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'

  },
  searchBar__unclicked: {
    padding: 8,
    flexDirection: "row",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 8,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    paddingLeft: 10,
    width: "90%",
  },
});