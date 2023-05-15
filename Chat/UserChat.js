import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import UserChatHeader from './UserChatHeader'
import Chat from './Chat'
import ChatBottom from './ChatBottom'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { GiftedChat } from 'react-native-gifted-chat'
import React, { useState, useCallback, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { Colors } from 'react-native/Libraries/NewAppScreen';



export default function UserChat({navigation}) {
  const userdata = useSelector((state)=>state.userdata)
  const messageuser = useSelector((state)=>state.messageuser)
  const [messages, setMessages] = useState([]);
  const myusername = userdata.my_profile_data.username;
  const peopleUsername = messageuser.message_user.username;
  const profile_picture = messageuser.message_user.profile_picture;
  const documentsName = myusername > peopleUsername ? myusername+"-"+peopleUsername : peopleUsername+'-'+myusername;
  




  const onSend = useCallback((text) => {
    const data = text[0];
    firestore()
    .collection('user_chat')
    .doc(documentsName)
    .collection('message')
    .add(data)
    setMessages(previousMessages => GiftedChat.append(previousMessages, text))
  }, [])

// function for getting user chat from firestore
const getAllMessages =  ()=>{
    const messagesRef = firestore().collection('user_chat').doc(documentsName)
    .collection('message')
    .orderBy('createdAt', 'desc')
    messagesRef.onSnapshot((quarySnap)=>{
      const allMsg = quarySnap.docs.map(docSnap=>{
        const data = docSnap.data()
        if(data.createdAt){
          return {
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt.toDate()
          }
        } else {
          return {
            ...docSnap.data(),
            createdAt: new Date()
          }
        }
      })
      setMessages(allMsg)
    })
    
}

useEffect(()=>{
    getAllMessages()
}, [])
console.log(messages)





  return (
    <SafeAreaProvider>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
      }}>
             <UserChatHeader navigation={navigation}/>
                 <GiftedChat
                         messages={messages}
                         onSend={text => onSend(text)}
                         user={{
                               _id: peopleUsername,
                               avatar: profile_picture,
                               name: peopleUsername,
                               seen: false
                               }}
                               showUserAvatar={false}
                               isTyping={true}
                               

                 />
      </SafeAreaView>
    </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
  
})