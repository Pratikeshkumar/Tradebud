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

const Terms = ({navigation}) => {


    const window = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }



    return (
        <View style={{
            backgroundColor: "black",
            height: window.height * 1.03,
            alignItems: 'center'
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.05, marginBottom: window.height*0.02, width: window.width * 1 }}>
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
                <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: window.width * 0.2 }}>
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>Terms of Use</Text>
                </View>
            </View>

            <ScrollView>
                <View style={{width: window.width * 0.9, }}>
                    <Text style={styles.text}>
                    Welcome to Tradebud, a social media platform for stock market traders. These Terms and Conditions govern your use of the Tradebud app and its related services. By accessing and using our app, you agree to be bound by these terms.
                    </Text>
                    <Text style={styles.header}>
                    Eligibility
                    </Text>
                    <Text style={styles.text}>
                    Tradebud is intended for use by individuals who are 18 years or older. By accessing the app, you confirm that you are above 18 years old. If you are below 18 years old, you are not permitted to use the app.
                    </Text>
                    <Text style={styles.header}>
                    Use of the app 
                    </Text>
                    <Text style={styles.text}>
                    You are solely responsible for your use of the app and its related services. We do not provide any investment advice, and all content provided on the app is for informational purposes only. You are responsible for your own investment decisions, and we do not accept any liability for any losses or damages you may incur as a result of using the app.
                    </Text>
                    <Text style={styles.header}>
                    No SEBI registration
                    </Text>
                    <Text style={styles.text}>
                    We are not registered with the Securities and Exchange Board of India (SEBI), and we do not provide any investment advisory services. The app is only a platform for users to share their trading ideas and experiences.
                   </Text>
                   <Text style={styles.header}>
                   User-generated content
                   </Text>
                   <Text style={styles.text}>
                   The app allows users to generate and share content, including comments, posts, and other material. We do not endorse, guarantee the accuracy of, or take responsibility for any user-generated content. You are solely responsible for the content you generate and share on the app, and you agree not to post any misleading or inaccurate information.
                   </Text>
                   <Text style={styles.header}>
                   User conduct
                   </Text>
                   <Text style={styles.text}>
                   You agree to use the app in a responsible and lawful manner. You are prohibited from engaging in any activities that may harm the app or its users, including but not limited to hacking, distributing viruses, and spamming. You also agree not to engage in any activities that may infringe on the intellectual property rights of others.
                   </Text>
                   <Text style={styles.header}>
                   Privacy
                   </Text>
                   <Text style={styles.text}>
                   We are committed to protecting your privacy. Our Privacy Policy explains how we collect, use, and share your personal information. By using the app, you consent to the collection, use, and sharing of your personal information as described in our Privacy Policy.
                   </Text>
                   <Text style={styles.header}>
                   Modifications to the app
                   </Text>
                   <Text style={styles.text}>
                   We reserve the right to modify, suspend, or discontinue the app at any time without notice. We also reserve the right to modify these Terms and Conditions at any time. You are responsible for reviewing the Terms and Conditions regularly.
                   </Text>
                   <Text style={styles.header}>
                   Disclaimer of warranties
                   </Text>
                   <Text style={styles.text}>
                   THE APP AND ITS RELATED SERVICES ARE PROVIDED ON AN "AS IS" BASIS WITHOUT ANY WARRANTIES OF ANY KIND. WE DO NOT WARRANT THAT THE APP WILL BE ERROR-FREE OR UNINTERRUPTED. WE ALSO DO NOT WARRANT THE ACCURACY OR COMPLETENESS OF ANY CONTENT PROVIDED ON THE APP.
                   </Text>
                   <Text style={styles.header}>
                   Limitation of liability
                   </Text>
                   <Text style={styles.text}>
                   WE SHALL NOT BE LIABLE FOR ANY DAMAGES WHATSOEVER ARISING OUT OF YOUR USE OR INABILITY TO USE THE APP OR ITS RELATED SERVICES, INCLUDING BUT NOT LIMITED TO DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES.
                   </Text>
                   <Text style={styles.header}>
                   Indemnification
                   </Text>
                   <Text style={styles.text}>
                   You agree to indemnify and hold us harmless from any claims, damages, liabilities, or expenses arising out of your use of the app or your breach of these Terms and Conditions.
                   </Text>
                   <Text style={styles.header}>
                   Governing law
                   </Text>
                   <Text style={styles.text}>
                   These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of these Terms and Conditions shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 1996.
                   </Text>
                   <Text style={styles.header}>
                   Entire agreement
                   </Text>
                   <Text style={styles.text}>
                   These Terms and Conditions constitute the entire agreement between you and us regarding your use of the app and its related services. If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.

                   </Text>
                </View>
            </ScrollView>


        </View>
    )
}

export default Terms;

const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
    header: {
        fontSize: 18,
        fontWeight: '900',
        color: 'white'
    }
})