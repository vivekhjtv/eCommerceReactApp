import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  _id: "",
  name: "",
  email: "",
  token: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLogout: (state, action) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.token = "";
    },
  },
});
export const { setUser, setToken, setLogout } = userSlice.actions;

export default userSlice.reducer;
