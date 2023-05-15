import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    profile_picture: '',
    image: '',
    code: '',
    error: '',
    username: '',
    profile_picture_link: 'https://firebasestorage.googleapis.com/v0/b/tradebud1-729f7.appspot.com/o/Blank-Profile-Picture-1.png?alt=media&token=2320994b-f5fe-4796-b179-ac91376d7e25'
    
}

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        addFirstName(state, action){
            state.firstName = action.payload;
        },
        addLastName(state, action){
            state.lastName = action.payload;
        },
        addEmail(state, action){
            state.email = action.payload;
        },
        addPhoneNo(state, action){
            state.phoneNo = action.payload;
        },
        addProfilePictureName(state, action){
            state.profile_picture = action.payload;
        },
        addImage(state, action){
            state.image = action.payload;
        },
        addOtp(state, action){
            state.code = action.payload;
        },
        addConfirmation(state, action){
            state.confirm = action.payload
        },
        addError(state, action){
            state.error = action.error
        },
        addUsername(state, action){
            state.username = action.payload
        },
        addProfilePictureNameLink(state, action){
            state.profile_picture_link = action.payload;
        }
    }
})


export const {
    addFirstName,
     addLastName,
      addEmail, 
      addPhoneNo, 
      addProfilePictureName, 
      addImage,
      addConfirmation,
      addOtp,
      addError,
      addUsername,
      addProfilePictureNameLink

    } = signupSlice.actions;
export default signupSlice.reducer;