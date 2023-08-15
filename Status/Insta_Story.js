import { FlatList, SafeAreaView, StyleSheet, Text, View, useWindowDimensions, Image, Pressable, Animated } from 'react-native'
import React, { useState, useRef } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'














const Insta_Story = () => {
    const { width, height } = useWindowDimensions()
    const flatlistRef = useRef(null)
    const styles = StyleSheet.create({
        main_conatiner: {
            flex: 1,
            // position: 'absolute',
            // top: 0,
            // bottom: 0,
            // left: 0,
            // right: 0,

        },
        story_page: {
            // position: 'absolute',
            // top: 0,
            // bottom: 0,
            // left: 0,
            // right: 0,
            backgroundColor: '#1b1b1b',
            width: width,
            height: height
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            alignItems: 'center',
            paddingVertical: 10,
            position: 'absolute',
            width: width,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2
        },
        image_view: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        next_view: {
            width: width * 0.4,
            height: height,
            backgroundColor: '#bcc4be',
            position: 'absolute',
            top: 0,
            bottom: 0,
        }
    })

    const RenderStory = ({ stories }) => {
        const type = stories?.content_type;

        switch (type) {
            case 'text':
                return (
                    <View style={{
                        marginTop: 100,
                        backgroundColor: 'red',

                    }}>
                        <Text style={{ color: '#fff' }}>{stories?.content}</Text>
                    </View>
                )
            case 'image':
                return (
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{ color: '#fff' }}>{stories?.content}</Text>
                    </View>
                )
            case 'video':
                return (
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{ color: '#fff' }}>{stories?.content}</Text>
                    </View>
                )

        }
    }





    const data = [
        {
            id: 1,
            username: 'shubham',
            name: 'shubham ghanghotia',
            profile_pic: 'https://media.licdn.com/dms/image/D4D03AQFe9vksJNnGiA/profile-displayphoto-shrink_800_800/0/1683797622677?e=2147483647&v=beta&t=jbVEvQ5xMGlW_wzNSt8AiT0Td6C5brUNrdsRAIGfKW4',
            stories: [
                {
                    id: 1,
                    username: 'shubham',
                    content_type: 'text',
                    content: 'Hello everyone welcome to my story',
                    view: 1,
                    likes: 10,
                    timestamp: '1691488876202'
                },
                {
                    id: 2,
                    username: 'shubham',
                    content_type: 'video',
                    content: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    view: 31,
                    likes: 43,
                    timestamp: '1691488876202',
                    caption: 'how about the video'
                },
                {
                    id: 1,
                    username: 'shubham',
                    content_type: 'image',
                    content: 'https://media.licdn.com/dms/image/D4D03AQFe9vksJNnGiA/profile-displayphoto-shrink_800_800/0/1683797622677?e=2147483647&v=beta&t=jbVEvQ5xMGlW_wzNSt8AiT0Td6C5brUNrdsRAIGfKW4',
                    view: 12,
                    likes: 12,
                    timestamp: '1691488876202',
                    caption: 'hello guys'
                }
            ]
        },
        {
            id: 2,
            username: 'ram ala',
            name: 'Pratikesh Kumar',
            profile_pic: 'https://media.licdn.com/dms/image/D4D03AQFe9vksJNnGiA/profile-displayphoto-shrink_800_800/0/1683797622677?e=2147483647&v=beta&t=jbVEvQ5xMGlW_wzNSt8AiT0Td6C5brUNrdsRAIGfKW4',
            stories: [
                {
                    id: 1,
                    username: 'shubham',
                    content_type: 'text',
                    content: 'Hello everyone welcome to my story',
                    view: 1,
                    likes: 10,
                    timestamp: '1691488876202'
                },
                {
                    id: 2,
                    username: 'shubham',
                    content_type: 'video',
                    content: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    view: 31,
                    likes: 43,
                    timestamp: '1691488876202',
                    caption: 'how about the video'
                },
                {
                    id: 1,
                    username: 'shubham',
                    content_type: 'image',
                    content: 'https://media.licdn.com/dms/image/D4D03AQFe9vksJNnGiA/profile-displayphoto-shrink_800_800/0/1683797622677?e=2147483647&v=beta&t=jbVEvQ5xMGlW_wzNSt8AiT0Td6C5brUNrdsRAIGfKW4',
                    view: 12,
                    likes: 12,
                    timestamp: '1691489257294',
                    caption: 'hello guys'
                }
            ]
        }
    ]






    const RenderItem = ({ item, index }) => {
        const [current_story_index, setCurrent_story_index] = useState(0)
        const [stories_length, setStories_length] = useState(item?.stories?.length)

        const movetoNext = () => {
            if (flatlistRef.current) {
                flatlistRef.current.scrollToIndex({ index: index + 1 })
            }
        }
       
        const handleNextStory = () => {
            if(current_story_index <= stories_length){
                setCurrent_story_index(p => p + 1)
            }else{
                flatlistRef.current.scrollToIndex({ index: index + 1 })
            }
           
        }






        const handlePrevoiusStory = () => {
            if(current_story_index >= stories_length){
                setCurrent_story_index(p => p - 1)
            }else{
                flatlistRef.current.scrollToIndex({ index: index  })
            }
        }



        return (
            <View style={styles.story_page}>

                <View style={styles.header}>
                    <View style={styles.image_view}>
                        <Image
                            source={{ uri: item?.profile_pic }}
                            style={{ width: 40, height: 40, borderRadius: 100 }}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: '#fff' }}>{item?.username}</Text>
                            <Text style={{ color: '#fff' }}>time</Text>
                        </View>
                    </View>
                    <Pressable onPress={movetoNext}>
                        <Entypo name='cross' size={30} color={'#fff'} />
                    </Pressable>
                </View>


                <RenderStory stories={item?.stories[current_story_index]} />

                <Pressable style={[styles.next_view, { right: 0 }]} onPress={handleNextStory} />
                <Pressable style={[styles.next_view, { left: 0 }]} onPress={handlePrevoiusStory} />




            </View>
        )
    }
















    return (
        <SafeAreaView style={styles.main_conatiner}>
            <FlatList
                data={data}
                horizontal={true}
                pagingEnabled={true}
                ref={flatlistRef}
                renderItem={({ item, index }) => {
                    return (
                        <RenderItem item={item} index={index} />
                    )
                }}

            />
        </SafeAreaView>
    )
}

export default Insta_Story;