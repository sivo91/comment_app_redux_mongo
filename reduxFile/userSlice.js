
import { createSlice } from "@reduxjs/toolkit";

let userState


if (typeof window !== "undefined") {
  userState = JSON.parse(window.localStorage.getItem('auth'))
} else {
  userState = null // {}
}

//console.log(userState) 


const initialState = {
  user: userState,
  userImg : '/mush.jpg',
  isLoading: false
}


const userSlice = createSlice({
   name: 'userAuth',
   initialState,
   reducers: {
    userInside: (state, action) => {
      state.user = action.payload
    },
    userLogOut: (state) => {
      state.user = null
    },
    userImage: (state, action) => {
      state.userImg = action.payload
    }
   }
})

export const {userInside, userLogOut, userImage} = userSlice.actions
export default userSlice.reducer