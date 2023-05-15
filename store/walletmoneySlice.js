import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const walletmoneySlice = createSlice({
    name: 'walletmoney',
    initialState,
    reducers: {
        addWalletMoney(state, action){
            state.money = action.payload;
        }
    }
})

export const {addWalletMoney} = walletmoneySlice.actions;
export default walletmoneySlice.reducer;