import { createSlice } from "@reduxjs/toolkit";


const initialState = {}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        addCommentChecking(state, action){
            state.comment_person = action.payload
        }
    }
})

export const {addCommentChecking} = commentSlice.actions;
export default commentSlice.reducer;