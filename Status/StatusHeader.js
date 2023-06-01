import { StyleSheet, Text, View, Dimensions, ScrollView, ImageBackground, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AntDesign from '@expo/vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore'
import { addStoryUser } from '../store/storySlice'
import { addMystory } from '../store/mystorySlice'
import { myProfileData } from '../store/userdataSlice'
import { current } from '@reduxjs/toolkit'
import DisplayPost from '../components/DisplayPost'


const window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}




const StatusHeader = ({ navigation, }) => {
    const [myStatus, setmyStatus] = useState()
    const dispatch = useDispatch()
    const [other_people_story, setOther_people_story] = useState()
    const scrollViewRef = useRef();
    const userdata = useSelector((state) => state.userdata)
    const my_profile_data = userdata.my_profile_data;
    const currentTime = new Date().getTime()
    const last24Hours = currentTime - (24 * 60 * 60 * 1000);



    // function for fetching the real time sttaus from my profile 
    // useEffect(() => {
    //     try {
    //         firestore()
    //             .collection('user_status')
    //             .where('username', '==', my_profile_data.username)
    //             .onSnapshot((querySnapshot) => {
    //                 if (querySnapshot && !querySnapshot.empty) {
    //                     const data = []
    //                     querySnapshot.forEach(documentSnapshot => {
    //                         const Data = documentSnapshot.data();
    //                         const id = documentSnapshot.id;
    //                         const timestamp = Data.timestamp;
    //                         if (timestamp >= last24Hours) {
    //                             Data.id = id;
    //                             Data.finish = 0;
    //                             data.push(Data)

    //                         } else {
    //                             setmyStatus(undefined)
    //                             dispatch(addMystory(undefined))
    //                         }
    //                     })
    //                     if (data.length) {
    //                         const sorted_status = data.sort((a, b) => a.timestamp - b.timestamp);
    //                         setmyStatus(sorted_status)
    //                         dispatch(addMystory(sorted_status))
    //                         console.log("sorted status: " + sorted_status)
    //                     }
    //                 } else {
    //                     console.log('No data found')
    //                 }
    //             })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }, [my_profile_data])
    useEffect(() => {
        try {
            const fetchData = async () => {
                const querySnapshot = await firestore()
                    .collection('user_status')
                    .where('username', '==', my_profile_data.username)
                    .get();

                if (querySnapshot && !querySnapshot.empty) {
                    const data = querySnapshot.docs
                        .map((documentSnapshot) => {
                            const Data = documentSnapshot.data();
                            return { ...Data, id: documentSnapshot.id };
                        })
                        .filter(({ timestamp }) => timestamp >= last24Hours);

                    if (data.length) {
                        const sorted_status = data.sort((a, b) => a.timestamp - b.timestamp);
                        setmyStatus(sorted_status);
                        dispatch(addMystory(sorted_status));
                        console.log("sorted status: ", sorted_status);
                    } else {
                        setmyStatus(undefined);
                        dispatch(addMystory(undefined));
                    }
                } else {
                    console.log('No data found');
                }
            };

            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [my_profile_data]);



    // function for fetching my following story from databases
    // useEffect(() => {
    //     const currentTime = new Date().getTime()
    //     const last24Hours = currentTime - (24 * 60 * 60 * 1000);
    //     try {
    //         firestore()
    //             .collection('user_status')
    //             .where('username', 'in', my_profile_data.followings)
    //             .onSnapshot(quarySnapshot => {
    //                 if (quarySnapshot && !quarySnapshot.empty) {
    //                     const data = []
    //                     quarySnapshot.forEach(documentSnapshot => {
    //                         const Data = documentSnapshot.data();
    //                         const id = documentSnapshot.id;
    //                         Data.id = id;
    //                         Data.finish = 0;
    //                         data.push(Data)
    //                     })
    //                     // const uniqueData = data.reduce((acc, current) => {
    //                     //     if (!acc[current.username]) {
    //                     //       acc[current.username] = current;
    //                     //     }
    //                     //     return acc;
    //                     //   }, {});
    //                     //   const Data = [uniqueData]
    //                     const uniqueData = Object.values(
    //                         data.reduce((acc, curr) => {
    //                             if (!acc[curr.username]) {
    //                                 acc[curr.username] = curr;
    //                             }
    //                             return acc;
    //                         }, {})
    //                     );

    //                     setOther_people_story(uniqueData)
    //                 } else {
    //                     console.log('hello')
    //                 }
    //             })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }, [my_profile_data])

    useEffect(() => {
        try {
          const fetchData = async () => {
            const currentTime = new Date().getTime();
            const last24Hours = currentTime - (24 * 60 * 60 * 1000);
      
            const querySnapshot = await firestore()
              .collection('user_status')
              .where('username', 'in', my_profile_data.followings)
              .get();
      
            if (querySnapshot && !querySnapshot.empty) {
              const data = querySnapshot.docs.map((documentSnapshot) => {
                const Data = documentSnapshot.data();
                const id = documentSnapshot.id;
                return { ...Data, id, finish: 0 };
              });
      
              const uniqueData = Object.values(
                data.reduce((acc, curr) => {
                  if (!acc[curr.username]) {
                    acc[curr.username] = curr;
                  }
                  return acc;
                }, {})
              );
      
              setOther_people_story(uniqueData);
            } else {
              console.log('No data found');
            }
          };
      
          fetchData();
        } catch (error) {
          console.log(error);
        }
      }, [my_profile_data]);
      





    // const keyExtractor = (item) => item.username.toString();

    return (
        <View style={{
            flexDirection: 'row',
            width: window.width * 1,
            height: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',

        }}>

            {myStatus && my_profile_data && <View style={styles.containers}>
                <TouchableOpacity
                    onPress={() => {
                        dispatch(addStoryUser(myStatus))
                        navigation.navigate('DisplayStory')
                    }}
                    style={{
                        width: 70,
                        height: 70,
                        margin: 5,
                        alignItems: 'center',
                        borderColor: 'yellow',
                        borderWidth: 1,
                        borderRadius: 35,
                        padding: 2,
                        borderStyle: 'dashed'
                    }}>
                    <ImageBackground
                        source={{ uri: my_profile_data.profile_picture }}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 35,
                            position: 'relative',
                            overflow: 'hidden',
                            zIndex: -1,
                        }}>

                    </ImageBackground>
                </TouchableOpacity>
                <Text style={{ color: 'white' }}>Your story</Text>
            </View>}
            {my_profile_data && !myStatus && <View style={styles.containers}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('StoryPost') }}
                    style={{ width: 70, height: 70, margin: 5, alignItems: 'center' }}>
                    <ImageBackground
                        source={{ uri: my_profile_data.profile_picture }}
                        style={{
                            borderRadius: 10,
                            width: '100%',
                            height: '100%',
                            borderRadius: 35,
                            position: 'relative',
                            overflow: 'hidden',
                            zIndex: -1,
                        }}>

                    </ImageBackground>
                    <View style={{
                        position: 'absolute',
                        bottom: 3,
                        right: 3,
                        backgroundColor: 'blue',
                        borderRadius: 10,
                        padding: 5,
                        zIndex: 100
                    }}>
                        <AntDesign name='plus' size={10} color={'white'} />
                    </View>
                    <Text style={{ color: 'white' }}>Your story</Text>
                </TouchableOpacity>

            </View>}
            <View style={{ alignItems: 'center', justifyContent: 'center', height: 100 }}>
                <FlatList
                    data={other_people_story}
                    horizontal={true}
                    // keyExtractor={keyExtractor}
                    renderItem={({ item, index }) => (
                        <Status item={item} index={index} />
                    )
                    }
                />
            </View>

        </View>
    )
}
export default StatusHeader;


const Status = ({ item, index, navigation }) => {
    return (
        <View style={{
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 8
        }}>
            <TouchableOpacity style={{
                borderWidth: 1,
                borderColor: 'yellow',
                borderStyle: 'dashed',
                width: 70,
                height: 70,
                borderRadius: 35,
                padding: 2,
                marginBottom: 5
            }}>
                <Image
                    source={{ uri: item.profile_picture }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 35,

                    }}

                />
            </TouchableOpacity>
            <Text style={{ color: 'white' }}>{item.username.slice(0, 8)}</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    containers: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        paddingBottom: 15,
        alignItems: 'center'

    }
})

