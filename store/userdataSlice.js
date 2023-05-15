import { createSlice } from "@reduxjs/toolkit";

const initialState = {}
const userdataSlice = createSlice({
    name: 'userdata',
    initialState,
    reducers: {
        myProfileData(state, action){
            state.my_profile_data = action.payload;
        }
    }
})

export const {myProfileData} = userdataSlice.actions;
export default userdataSlice.reducer;