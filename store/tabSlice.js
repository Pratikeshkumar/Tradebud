import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    isVisible: true,
}

const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers: {
        addTabDisplay(state, action){
            state.isVisible = action.payload;
        }
    }
})

export const {addTabDisplay} = tabSlice.actions;
export default tabSlice.reducer;
