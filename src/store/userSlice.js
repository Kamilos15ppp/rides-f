import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
    email: null,
    token: null,
    isAdmin: false,
    isHint: false,
  },
  reducers: {
    saveUserInfo: (state, action) => {
      const { payload } = action;
      state.isLogged = true;
      state.token = payload.token;
      state.email = payload.user.email;
      state.isAdmin = payload.user.is_admin;
      state.isHint = payload.user.is_hint;
    },
    updateUserInfo: (state, action) => {
      const { payload } = action;
      state.email = payload.email;
      state.isAdmin = payload.is_admin;
      state.isHint = payload.is_hint;
    },
    updateUserToken: (state, action) => {
      state.token = action.payload.token;
      state.isLogged = true;
    },
    clearUserInfo: (state) => {
      state.isLogged = false;
      state.email = null;
      state.token = null;
      state.isAdmin = false;
      state.isHint = false;
    },
  },
});

export const { saveUserInfo, updateUserInfo, updateUserToken, clearUserInfo } =
  userSlice.actions;

export default userSlice.reducer;
