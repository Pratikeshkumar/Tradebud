import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TextInput } from 'react-native';
import Icons from '@expo/vector-icons/Feather'
import Icons1 from '@expo/vector-icons/FontAwesome'
import Icons2 from '@expo/vector-icons/AntDesign'
import Icons3 from '@expo/vector-icons/MaterialIcons'
export default function ChatBottom() {
  return (
    <View style={styles.containers}>
        <Icons name="camera" size={25} color="white" />
        <TextInput style={styles.input} placeholder='message' />
        <Icons1 name="microphone" size={25} color="white" />
        <Icons2 name="picture" size={25} color="white" />
        <Icons3 name="gif" size={25} color="white" />
        <Icons2 name="pluscircleo" size={25} color="white" />
    </View>
    )
}

const styles = StyleSheet.create({
  containers: {
    backgroundColor: '#1b1b1b',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  input: {
    color: 'white',
    width: 120,
    backgroundColor: 'black',
    padding: 5
    
  }
})