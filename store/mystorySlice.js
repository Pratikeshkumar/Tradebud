import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const mystorySlice = createSlice({
    name: 'mystory',
    initialState,
    reducers: {
        addMystory(state, action){
            state.status = action.payload;
        }
    }
})

export const {addMystory} = mystorySlice.actions;
export default mystorySlice.reducer;