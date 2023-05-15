import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const watchuserSlice = createSlice({
    name: 'watchuser',
    initialState,
    reducers: {
        addWatchUserName(state, action){
            state.username = action.payload;
        }
    }
})


export const {addWatchUserName} = watchuserSlice.actions;
export default watchuserSlice.reducer;
