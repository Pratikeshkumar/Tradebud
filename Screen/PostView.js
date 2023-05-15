import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'


const data = [
    {
        "likes": [], 
        "reached": 0, 
        "text": "अरविंद केजरीवाल जो को एक और झटका। अपने आप को बार-बार IRS का इंकम टैक्स कमिश्नर होने का दावा करने वाले केजरीवाल को IRS association ने कहा है कि आप कभी भी income tax कमिश्नर नहीं रहे हैं। IRS association ने कहा कि जो बयान आपने दिया कि IRS टैक्स कमिश्नर होने के बावजूद आपने लाखों-करोड़ों नहीं कमाये लेकिन देश सेवा के लिये सब कुछ छोड़ दिया … मतलब आप देश और असोसीएशन को ये बता रहे हैं कि सब IRS चोर हैं और सिर्फ पैसा कमाने के लिये वहाँ नौकरी कर रहे हैं … IRS Association ने चेतावनी दी है कि आप ये झूठी बयानबाज़ी बंद कीजिए नहीं तो आपके ऊपर हम LEGAL ACTION लेंगे। मतलब बिना किसी डर के, खुल कर झूठ बोलता है ये बंदा और खुद को ईमानदार बताने के चक्कर में पूरी association ही चोर बना दी !!!", "timestamp": 1682148711724, "username": "subham_kr"
    },
    
    {
        "likes": [], 
        "reached": 0, 
        "text": "The most important contribution to business by elonmusk will not be Tesla, or SpaceX but his powerful attitude to risk. Most would be terminally daunted by such a ‘failure.’  But when you set up each initiative as a learning experiment (and of course, have raised the resources to do so!) you essentially extend the frontiers of knowledge & progress.  Salute!", "timestamp": 1682149137810, "username": "subham_kr"}, {"likes": [], "media_uri": "https://firebasestorage.googleapis.com/v0/b/tradebud1.appspot.com/o/1682152357563-zi5xk9?alt=media&token=687334b0-a406-4a44-9602-77f219c9bb0f", "monetize": false, "price": "0", "reached": 0, "text": "Let's learn about the cause of climates change 1. Generating power 2. Manufacturing goods 3. Cutting down forests 4. Using transportation 5. Producing food 6. Powering building 7. Consuming too much", 
        "timestamp": 1682152357563, 
        "username": "subham_kr"
    },
    
    {
      "likes": [], 
      "media_uri": "https://firebasestorage.googleapis.com/v0/b/tradebud1.appspot.com/o/1682153210411-nef668?alt=media&token=21c0a653-a767-4742-b136-d31ffa6b647b", 
      "monetize": true, 
      "price": "15",
      "reached": 0, 
      "text": "", 
      "timestamp": 1682153210411, 
      "username": "subham_kr"
    }]



const PostView = () => {
  return (
    <SafeAreaProvider>
        <SafeAreaView>
            <FlatList 

            />
            <StatusBar backgroundColor='rgba(0, 0, 0, 0.9)' style='light' />
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default PostView

const styles = StyleSheet.create({})