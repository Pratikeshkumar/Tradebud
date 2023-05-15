import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Image } from 'react-native';
import Icons from '@expo/vector-icons/AntDesign'
import Icons1 from '@expo/vector-icons/Entypo'
import Icons2 from '@expo/vector-icons/Feather'
import Icons3 from '@expo/vector-icons/Ionicons'
import { useSelector } from 'react-redux';
const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}
export default function ChatDashboardHeader({navigation}) {
  const userdata = useSelector((state)=>state.userdata)
  const my_profile_data = userdata.my_profile_data;
  return (
    <View style={styles.container}>
     <View 
          style={{
            width: window.width * 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10
        }}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Image 
              style={{
                   width: window.width * 0.09,
                   height: window.height * 0.02, }} 
              source={require("../assets/back.png")} />
        </TouchableOpacity>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '500', marginLeft: 10}}>
                      {my_profile_data.username}
        </Text>
       </View>
     <View style={styles.secondContainers}>
          <View style={styles.searchView}>
            <Icons3 name="search-outline" size={20} color='black'/>
           <TextInput
               placeholder="Search"
               style={styles.search}
               placeholderTextColor={'black'}
            />
          </View>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: window.height * 0.015,
    width: window.width * 1,
    alignItems: 'center'
  },
  firstContainers: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  searchView: {
    width: window.width * 0.9,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center'
  },
  secondContainers: {
    width: '90%',
    marginLeft: 10
  },
  thirdContainers: {
    marginTop: window.height * 0.001,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    width: '100%'
  },
  leftContainers: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between'
  },
  rightContainers: {
    flexDirection: 'row',
    width: '35%',
    justifyContent: 'space-between'
  },
  search: {
    backgroundColor: 'white',
    width: window.width * 0.8,
    fontSize: 20,
    fontWeight: '600',
    paddingLeft: 5
  },
  smallContainers: {
    backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
  }
});