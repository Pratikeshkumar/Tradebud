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

const Privacy = ({navigation}) => {


    const window = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }



    return (
        <View style={{
            backgroundColor: "black",
            height: window.height * 1.03,
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: window.height * 0.05, marginBottom: window.height*0.02 }}>
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
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>Privacy Policy</Text>
                </View>
            </View>

            <ScrollView>

                <View style={{ marginHorizontal: window.width * 0.015}}>

                    <View style={{ marginTop: window.height * 0.01 }}>


                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                            <Text style={{ fontSize: 16, fontWeight: "400", marginHorizontal: window.width * 0.03, color: "#fff" }}>Lorem ipsum dolor sit amet consectetur. Tristique varius augue felis habitasse nibh ut commodo. Fames et id commodo aliquet. Enim ac ultrices ante netus sit vitae facilisi massa sed. Diam accumsan egestas fringilla consectetur risus. Consectetur fringilla viverra odio arcu. Sed elit pulvinar nibh mi arcu cras suspendisse purus. In in malesuada integer quam faucibus varius quis non feugiat.
                                Quisque nullam quisque amet viverra in viverra facilisis. Ullamcorper nunc aliquet tempor ut ultricies auctor dignissim libero scelerisque. Adipiscing lectus quam adipiscing adipiscing enim ultricies a vitae tellus. Amet proin amet quam mi eu accumsan placerat sodales. Tortor rhoncus tellus urna magna viverra neque. Purus commodo a nunc dapibus enim morbi. Urna convallis velit auctor tempor quis aenean elit libero.
                                Odio metus leo tortor nam ultrices consectetur sociis mauris. In nisl tellus feugiat non. Volutpat elementum amet vitae non metus. Augue vulputate augue consectetur nunc. Eget rhoncus tristique ut gravida. Viverra nullam sed ipsum donec ut mauris arcu urna mauris. A ante mauris sagittis fermentum sed non. Sapien penatibus eros morbi sagittis. Bibendum neque habitasse lorem commodo volutpat auctor sed cras ultrices. Odio consequat venenatis orci tellus. In tempor magna justo feugiat viverra sit mattis vitae diam. Tincidunt tellus tristique elit morbi. Ornare imperdiet tellus neque faucibus blandit sapien facilisis id sed. Malesuada sapien mauris turpis ac tellus donec gravida.
                                Sed id diam a magna et purus sagittis cursus. Elementum aliquam tristique dictum interdum lobortis laoreet non orci. Urna dis integer facilisi auctor hendrerit. Dictum enim euismod varius orci nam. Lectus tempor vitae posuere scelerisque. Dui sit cras massa bibendum sit ultrices nulla facilisis. Condimentum ultricies aliquet facilisi ut diam mattis. Gravida duis amet eget vestibulum pretium eleifend dui magna ipsum. Felis proin viverra dignissim nibh amet. Aliquam vehicula mi mauris purus integer et posuere. At porta ornare consequat aliquam nisl integer. Amet mauris habitant quis volutpat viverra non porttitor quis tristique. Fermentum aliquet quisque sit egestas pellentesque. Aliquet mattis vitae amet elit nulla vulputate turpis.
                                Eget ut pretium cras odio lectus orci mattis. Amet in fermentum viverra quisque. Vitae urna diam faucibus ultrices. Pharetra pulvinar ultrices facilisi ultrices ut. Etiam at massa facilisis in eget malesuada sagittis vivamus nisl. Viverra et tortor cras in. Diam blandit quam id odio et odio. Pellentesque risus etiam sit praesent quis. Malesuada pellentesque amet pellentesque nibh feugiat in. Semper lectus habitasse pharetra quis sem proin ut tellus suspendisse. Aliquet fames phasellus bibendum amet netus mollis.
                                Nunc aliquam justo sapien eget nec est. Sit luctus condimentum aliquam gravida lacinia. Platea ipsum commodo scelerisque egestas. Imperdiet quisque egestas quam lorem scelerisque nibh aenean suspendisse. Rhoncus mattis pellentesque odio praesent eget sed mauris fermentum. Auctor sagittis vehicula vel vel nec.
                                Arcu arcu scelerisque feugiat dignissim malesuada sed. Dui consequat amet proin metus odio. Ullamcorper lacus pellentesque proin elit imperdiet. Arcu etiam ullamcorper tortor feugiat justo. Odio pulvinar nulla in massa erat morbi id. Amet imperdiet aliquet dictum mauris integer. Proin lacus orci suspendisse ac scelerisque. Sit etiam viverra massa non morbi diam vitae sit. Nulla convallis tortor ut lacus non vitae. Volutpat quis suspendisse consectetur pharetra vivamus in egestas leo facilisis. Aliquet tristique pharetra lacus justo aliquet.
                                Tempor sit vel tristique pretium. Bibendum mi pellentesque eu nunc pulvinar faucibus ut. Non pharetra turpis lectus diam sed. Gravida duis viverra tincidunt odio id nisl velit. Curabitur aliquet vestibulum tortor porttitor duis tempor tincidunt molestie pharetra. Eu mi sed accumsan semper massa. Commodo quis dictumst massa elit commodo tristique nisi cursus magna. Cras sed massa fermentum sit orci et velit eget dolor. Neque scelerisque aenean sodales adipiscing purus dis ipsum in. Tortor nibh in molestie curabitur id. Viverra malesuada interdum cras nullam ipsum proin. Venenatis a et ut pharetra adipiscing proin tristique. Egestas mi sed risus a gravida id faucibus sit.
                                Massa adipiscing quam ac ac leo adipiscing ornare venenatis. Arcu ut pretium sit erat adipiscing ridiculus porttitor ultrices porta. Est quis elit nisl egestas nulla nisi facilisi nunc. Tristique enim lorem fusce lorem. Dignissim convallis adipiscing eu eu ipsum. Vel in massa sollicitudin dictum.
                                Sit blandit enim ut massa suspendisse sit. Accumsan cursus vitae pellentesque mollis fames iaculis. Bibendum dictumst lacinia arcu morbi ac scelerisque magna sit.</Text>
                        </View>

                    </View>
                </View>
            </ScrollView>


        </View>
    )
}

export default Privacy;