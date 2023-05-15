import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

const photoSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addPhotoPost(state, action){
            state.photo_post = action.payload;
        },
        addVideoPost(state, action){
            state.video_post = action.payload;
        }
    }
})

export const {addPhotoPost, addVideoPost} = photoSlice.actions;
export default photoSlice.reducer;