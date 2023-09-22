import { createSlice } from '@reduxjs/toolkit';

import blogService from '../services/blogs';

const initialState = [];

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => state.concat(action.payload),
    modifyBlog: (state, action) =>
      state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog,
      ),
    deleteBlog: (state, action) =>
      state.filter((blog) => blog.id !== action.payload.id),
  },
});

export const { setBlogs, addBlog, modifyBlog, deleteBlog } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export default blogsSlice.reducer;
