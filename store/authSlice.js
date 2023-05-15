import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        login: false
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogined(state, action){
            state.login = action.payload;
        }
    }
})


export const {setLogined} = authSlice.actions;

export default authSlice.reducer;