import { createSlice } from '@reduxjs/toolkit';

import loginService from '../services/login';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action) => action.payload,
    unsetUser: () => null,
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export const retrieveUser = () => {
  return async (dispatch) => {
    const storedUser = JSON.parse(window.localStorage.getItem('user'));
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  };
};

export const login = ({ username, password }) => {
  return async (dispatch) => {
    let receivedUser = await loginService.login({ username, password });
    dispatch(setUser(receivedUser));
    window.localStorage.setItem('user', JSON.stringify(receivedUser));
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(unsetUser());
    window.localStorage.removeItem('user', null);
  };
};

export default userSlice.reducer;
