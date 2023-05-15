import { createSlice } from "@reduxjs/toolkit";
const initialState = {}

const postingSlice = createSlice({
    name: 'posting',
    initialState,
    reducers: {
        addImagePath(state, action){
            state.image = action.payload;
        }
    }
})
export const {addImagePath} = postingSlice.actions;
export default postingSlice.reducer;