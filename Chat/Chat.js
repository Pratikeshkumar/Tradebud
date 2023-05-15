import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TextInput } from 'react-native';
import Icons from '@expo/vector-icons/Feather'
import Icons1 from '@expo/vector-icons/FontAwesome'
import Icons2 from '@expo/vector-icons/AntDesign'
import Icons3 from '@expo/vector-icons/MaterialIcons'



export default function Chat() {
  return (
    <View style={{ backgroundColor: 'black', flex: 1}}>
    <Text>chat</Text>
    </View>
    )
}

const styles = StyleSheet.create({
  containers: {
    backgroundColor: '#1b1b1b',
    flexDirection: 'row'
  },
  textInput: {
    backgroundColor: 'white'
  }
})