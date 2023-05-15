import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        add(state, action) {
            state.push(action.payload)

        },
        remove(state, action){
           state.pop(action.payload)
        }
    }
})
export const {add, remove } = loginSlice.actions;
export default loginSlice.reducer;