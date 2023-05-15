import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './loginSlice'
import signupReducer from './signupSlice'
import authReducer from './authSlice'
import userReducer from './userSlice'
import userdataReducer from "./userdataSlice";
import messageuserReducer from './messageSlice'
import postingReducer from './postingSlice'
import commentReducer from './commentSlice'
import tabReducer from "./tabSlice";
import storyReducer from './storySlice'
import mystoryReducer from './mystorySlice'
import totalstoryReducer from './totalstorySlice'
import watchuserReducer from './watchuserSlice'
import walletmoneyReducer from "./walletmoneySlice";
import postReducer from './postSlice'


const store = configureStore({
    reducer: {
        login: loginReducer,
        signup: signupReducer,
        auth: authReducer,
        user: userReducer,
        userdata: userdataReducer,
        messageuser: messageuserReducer,
        posting: postingReducer,
        comment: commentReducer,
        tab: tabReducer,
        story: storyReducer,
        mystory: mystoryReducer,
        totalstory: totalstoryReducer,
        watchuser: watchuserReducer,
        walletmoney: walletmoneyReducer,
        post: postReducer,
    }
})
export default store;