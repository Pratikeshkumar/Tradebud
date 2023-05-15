import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search_result: {},
    selected_user: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserUsername(state, action){
            state.username = action.payload;
        },
        searchResult(state, action){
            state.search_result = action.payload;
        },
        selectedUser(state, action){
            state.selected_user[0] = action.payload;
        },
    }
})


export const {addUserUsername, searchResult, selectedUser} = userSlice.actions;
export default userSlice.reducer;