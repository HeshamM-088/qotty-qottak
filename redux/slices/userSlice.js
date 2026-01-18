import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  status: "logged out",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.userInfo = null;
      state.status = "logged out";
    },
    setUser(state, { payload: { id, name, email, role, image } }) {
      state.userInfo = { id, name, email, role, image };
      state.status = "logged in";
    },
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
