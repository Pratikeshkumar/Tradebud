import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import BottomNav from "./BottomNav"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Payment from './Payment'
import Settings  from './Settings';
import ChatDashboard from '../Chat/ChatDashboard'
import UserChat from '../Chat/UserChat'
import WatchUserProfile from './WatchUserProfile';
import SearchScreen from './SearchScreen';
import Post from './Post';
import AddMoney from './AddMoney';
import WithdrawMoney from './WithdrawMoney';
import MyPostComment from '../Comment/MyPostComment';
import StoryPost from '../Status/StoryPost';
import DisplayStory from '../Status/DisplayStory';
import WatchUserProfileFromFeed from './WatchUserProfileFromFeed';
import EditProfile from './EditProfile';
import Followers from './Followers';
import Followings from './Followings';
import Notification from './Notification';
import VideoPlayerScreen from './VideoPlayerScreen';
import PhotoScreen from './PhotoScreen';
import ViewSharedPostScreen from './ViewSharedPostScreen'
import Other_UserStory from "../Status/Other_UserStory"

const HomeStack = () => {
    const Stack = createNativeStackNavigator();

    const window = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }

    return (
        <Stack.Navigator initialRouteName="BottomNav" screenOptions={{ headerShown: false }}  >
            <Stack.Screen name="BottomNav" component={BottomNav} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="ChatDashboard" component={ChatDashboard} />
            <Stack.Screen name="UserChat" component={UserChat} />
            <Stack.Screen name="WatchUserProfile" component={WatchUserProfile} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen name="AddMoney" component={AddMoney} />
            <Stack.Screen name="WithdrawMoney" component={WithdrawMoney} />
            <Stack.Screen name="MyPostComment" component={MyPostComment} />
            <Stack.Screen name="StoryPost" component={StoryPost} />
            <Stack.Screen name="DisplayStory" component={DisplayStory} />
            <Stack.Screen name="WatchUserProfileFromFeed" component={WatchUserProfileFromFeed} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Followers" component={Followers} />
            <Stack.Screen name="Followings" component={Followings} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="VideoPlayerScreen" component={VideoPlayerScreen} />
            <Stack.Screen name="PhotoScreen" component={PhotoScreen} />
            <Stack.Screen name="ViewSharedPostScreen" component={ViewSharedPostScreen} />
            <Stack.Screen name='Other_UserStory' component={Other_UserStory} />

        </Stack.Navigator>

    )
}

export default HomeStack