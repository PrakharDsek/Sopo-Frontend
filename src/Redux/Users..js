import { createSlice } from "@reduxjs/toolkit";

const Users = createSlice({
  name: "Users",
  initialState: {
    UserData:{},
    IsAuth: false,

  },
  reducers: {
    setAuthStatusAndData: (state ,payload) => {
        console.log(payload)
        state.IsAuth =payload.payload.IsAuth 
        state.UserData=payload.payload.data
    }
  },
});

export const { setAuthStatusAndData} = Users.actions;
export default Users.reducer;
