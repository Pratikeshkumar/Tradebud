import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icons from '@expo/vector-icons/AntDesign'
import Icons1 from '@expo/vector-icons/MaterialIcons'
import { useSelector } from 'react-redux';




const window = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};



export default function UserChatHeader({navigation}) {
  const messageuser = useSelector((state)=>state.messageuser)
  const message_user = messageuser.message_user;
  


  return (
    <View style={styles.containers}>
      <View style={{marginRight: 20, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity 
             onPress={()=>{navigation.goBack()}}
          >
            <View style={{marginRight: 20, marginLeft: 5}}>
        <Icons name='arrowleft' size={25} color="white" />
      </View>
          </TouchableOpacity>
        <View>
          <Text style={{color: 'white', fontWeight: '800', fontSize: 20}}>{message_user.username}</Text>
        <Text style={{color: 'white', fontWeight: '500'}}>active 8m ago </Text>
        </View>
      </View>
      <View style={{
        marginRight: 10
      }}>
        <Icons1 name='local-offer' size={20} color='white' />
      </View>
    </View>
    )
}
const styles = StyleSheet.create({
  containers: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    
    
  }
})