import { createSlice } from "@reduxjs/toolkit";


const initialState = {};

const totalstorySlice = createSlice({
    name: 'totalstory',
    initialState,
    reducers: {
        addTotalStory(state, action){
            state.total_story = action.payload;
        }
    }
})

export const {addTotalStory} = totalstorySlice.actions;
export default totalstorySlice.reducer;