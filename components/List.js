import { FlatList, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectedUser } from '../store/userSlice'
import { useNavigation } from '@react-navigation/native'
import { colors } from 'react-native-elements'
import { myProfileData } from '../store/userdataSlice'


const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

const List = ({searched_result}) => {
  const user = useSelector((state)=>state.user)
  const search_result = user.search_result;
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const userdata = useSelector((state)=>state.userdata)
  const my_profile_data = userdata.my_profile_data;
  const username = my_profile_data.username;

  return (
    <>
    {search_result ? (
        <FlatList
            data={search_result}
            renderItem={({item, index, seperators})=>(
              <TouchableOpacity 
                onPress={()=>{
                  if(item.username == username){
                      navigation.navigate('BottomProfile')
                  }else{
                    // dispatch(selectedUser(item))
                  // navigation.navigate("WatchUserProfile")
                  navigation.navigate('WatchUserProfileFromFeed', {
                    username: item.username
                  })
                  }

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
    ):(
      <View>
      <Text style={{color: 'white'}}>start searching</Text>
      </View>
    )}
    </>
  )
}

export default List;

const styles = StyleSheet.create({
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
})