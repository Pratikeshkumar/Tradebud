import { createSlice } from "@reduxjs/toolkit";

const initialState = {
}

const messageSlice = createSlice({
    name: 'messageuser',
    initialState,
    reducers: {
        addmessageUser(state, action){
            state.message_user = action.payload;
        }
    }
})

export const {addmessageUser} = messageSlice.actions;
export default messageSlice.reducer;