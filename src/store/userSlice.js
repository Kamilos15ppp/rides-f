import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
    email: null,
    token: null,
    isAdmin: false,
    isHint: false,
    activeUsers: null,
    activeUsersNames: null,
  },
  reducers: {
    saveUserInfo: (state, action) => {
      const { payload } = action;
      state.isLogged = true;
      state.token = payload.token;
      state.email = payload.user.email;
      state.isAdmin = payload.user.is_admin;
      state.isHint = payload.user.is_hint;
      state.activeUsers = payload.active_users;
      state.activeUsersNames = payload.users_names;
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
    updateActiveUsers: (state, action) => {
      state.activeUsers = action.payload.active_users;
    },
    updateActiveUsersNames: (state, action) => {
      state.activeUsersNames = action.payload.users_names;
    },
    clearUserInfo: (state) => {
      state.isLogged = false;
      state.email = null;
      state.token = null;
      state.isAdmin = false;
      state.isHint = false;
      state.acticeUsers = null;
      state.acticeUsersNames = null;
    },
  },
});

export const {
  saveUserInfo,
  updateUserInfo,
  updateUserToken,
  updateActiveUsers,
  updateActiveUsersNames,
  clearUserInfo,
} = userSlice.actions;

export default userSlice.reducer;
