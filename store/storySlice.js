import { createSlice } from "@reduxjs/toolkit";

let initialState = {}

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        addStoryUser(state, action){
            state.user = action.payload;
        }
    }
})
export const {addStoryUser} = storySlice.actions;
export default storySlice.reducer;