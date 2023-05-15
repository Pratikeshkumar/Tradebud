import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import ChatDashboardHeader from './ChatDashboardHeader'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux';
import { addmessageUser } from '../store/messageSlice';

const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

export default function ChatDashboard({navigation}) {
  const [chatedPoepleData, setChatedPepoleData] = useState()
  const userdata = useSelector((state)=>state.userdata)
  const my_profile_data = userdata.my_profile_data;
  const message_user = my_profile_data.message_user;
  const dispatch = useDispatch()
  
// function for getting the message user details from profile

useEffect(()=>{
  try {
    firestore()
    .collection('user_profile_data')
    .where('username', 'in', message_user)
    .get()
    .then(quarySnapshot=>{
      const data = []
      quarySnapshot.forEach(documentSnapshot=>{
        const Data = documentSnapshot.data()
        data.push(Data)
      })
      setChatedPepoleData(data)
    })
  } catch (error) {
    console.log(error)
  }
}, [])
  

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ChatDashboardHeader navigation={navigation} />
        <View>
          <FlatList
              data={chatedPoepleData}
              renderItem={({item, index})=>(
                <TouchableOpacity 
                onPress={()=>{
                  dispatch(addmessageUser(item))
                  navigation.navigate("UserChat")
                }}
              style={styles.searchView}>
                <Image
                  source={{uri: item.profile_picture}}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22
                  }}
                />
                <View style={styles.textView}>
                  <Text style={styles.text}>{item.username}</Text>
                  <Text style={styles.text}>{item.first_name} {item.last_name}</Text>
                </View>
              </TouchableOpacity>
              )}

          />
        </View>
        <StatusBar backgroundColor='black' style='light'/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const DisplayChatUsers = ({item, index})=>{
  return(
    <View>
      <View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    width: window.width * 1
  },
  userView: {
    width: '100%',
    flexDirection: 'row'
  },
  textView: {
    marginHorizontal: 10,
    marginVertical: 10,
    
  },
  text: {
    color: 'white'
  },
  searchView: {
    width: window.width * 0.90,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: 'white',
    borderWidth: 0.1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'black'
  },
  textView: {
    width: window.width * 0.6,
    marginHorizontal: 5
  }
});