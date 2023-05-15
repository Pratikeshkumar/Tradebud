import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView,
} from "react-native";
import React, { useRef } from 'react';

const About = ({ navigation }) => {


    const window = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }



    return (
        <View style={{
            backgroundColor: "black",
            height: window.height * 1.2,
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.05 }}>
                <TouchableOpacity
                 onPress={()=>{
                    navigation.goBack();
                  }}
                >
                    <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: window.width * 0.05 }}>
                        <Image style={{
                            width: window.width * 0.09,
                            height: window.height * 0.03,
                        }} source={require("../assets/back.png")} />
                    </View>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: window.width * 0.25 }}>
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>About</Text>
                </View>
            </View>


            <View style={{ marginHorizontal: window.width * 0.015, marginTop: window.height * 0.02 }}>

                <View style={{ marginTop: window.height * 0.01 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Privacy') }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.02 }}>
                            <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05, color: "#fff" }}>Privacy Policy</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('Terms') }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.03 }}>


                            <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: window.width * 0.05, color: "#fff" }}>Terms of Use</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}

export default About;