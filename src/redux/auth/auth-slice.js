import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  signup: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  signin: [{ email: "", password: "" }],
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    signupForm(state, action) {
      state.signup = action.payload;
    },
    signinForm(state, action) {
      state.signin = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
