import { createSlice, current } from '@reduxjs/toolkit';

import usersService from '../services/users';

const initialState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (_, action) => action.payload,
    modifyUser: (state, action) =>
      state.map((user) =>
        user.id === action.payload.id ? action.payload : user,
      ),
  },
});

export const { setUsers, modifyUser } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const allUsers = await usersService.getAll();
    dispatch(setUsers(allUsers));
  };
};

export const addBlogToUser = (users, newBlog) => {
  return async (dispatch) => {
    const user = users.find((user) => user.id === newBlog.author.id);
    const updatedUser = {
      ...user,
      blogs: user.blogs.concat(newBlog),
    };
    dispatch(modifyUser(updatedUser));
  };
};

export const deleteBlogFromUser = (users, blogToDelete) => {
  return async (dispatch) => {
    const user = users.find((user) => user.id === blogToDelete.author.id);
    const updatedUser = {
      ...user,
      blogs: user.blogs.filter((blog) => blog.id !== blogToDelete.id),
    };
    dispatch(modifyUser(updatedUser));
  };
};

export default usersSlice.reducer;
